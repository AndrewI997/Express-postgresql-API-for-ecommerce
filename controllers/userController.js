import ApiError from "../error/ApiError"
import { User, Basket } from '../models/models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('некорректный Email или пароль'))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('пользователь с таким Email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest('пользователь с таким логином не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }

    async deleteOne(req, res, next) {
        const { email } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest('пользователь с таким логином не найден'))
        }
        if (user) {
            await user.destroy(
                {
                    where: { email }
                }
            )
        }
        return res.json({ message: 'пользователь удален' })
    }
}

export default new UserController()