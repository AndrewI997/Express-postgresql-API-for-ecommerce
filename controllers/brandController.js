import{ Brand } from '../models/models'

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brand = await Brand.findAll()
        return res.json(brand)
    }

    async deleteOne(req, res, next) {
        const { name } = req.body
        const brand = await Brand.findOne({ where: { name } })
        if (!brand) {
            return next(ApiError.badRequest('такого бренда не существует'))
        }
        if (brand) {
            await brand.destroy(
                {
                    where: { name }
                }
            )
        }
        return res.json({ message: 'бренд удален' })
    }
}

export default new BrandController()