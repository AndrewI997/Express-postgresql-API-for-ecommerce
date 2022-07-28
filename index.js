import { } from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import sequelize from './database'
import './models/models'
import fileUpload from 'express-fileupload'
import router from './routes/index'
import path from 'path'
import errorHandler from './middlewares/ErrorHandlingMiddleware'

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler) //обработка ошибок последний мидлвар

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start() 
