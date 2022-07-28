import {} from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import sequelize from './database'
import './models/models'

const PORT = process.env.PORT || 3001
  
const app = express()
app.use(cors())
app.use(express.json())

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log(`Server running on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start() 
