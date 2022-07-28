import { v4 } from "uuid"
import path from 'path'
import { Device, DeviceInfo } from '../models/models'
import ApiError from "../error/ApiError"
import { unlinkSync } from 'fs';


class DeviceController {
    async cerate(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 6
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, limit, offset } })
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId, limit, offset } })
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId, brandId, limit, offset } })
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const { id } = req.params
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            }
        )
        return res.json(device)
    }

    async deleteOne(req, res, next) {
        const { name } = req.body
        const device = await Device.findOne(
            {
                where: { name }
            }
        )
        if (!device) {
            return next(ApiError.badRequest('товар с таким именем не найден'))
        }
        if (device) {
            const { img } = device
            await device.destroy(
                {
                    where: { name }
                }
            )
            try {
                unlinkSync(path.resolve(__dirname, '..', 'static', img))
                console.log(`successfully deleted ${img }`);
            }
            catch (err) {
                console.log(`ERROR deleted ${img }`);
            }
        }
        return res.json({ message: 'товар удален' })
    }
}

export default new DeviceController()