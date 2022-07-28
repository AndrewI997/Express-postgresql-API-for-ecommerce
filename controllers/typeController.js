import { Type } from "../models/models"
import ApiError from "../error/ApiError"

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async deleteOne(req, res, next) {
        const { name } = req.body
        const type = await Type.findOne({ where: { name } })
        if (!type) {
            return next(ApiError.badRequest('такой тип не найден'))
        }
        if (type) {
            await type.destroy(
                {
                    where: { name }
                }
            )
        }
        return res.json({ message: 'тип удален из списка' })
    }
}

export default new TypeController()