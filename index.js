import {} from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import sequelize from './database'


const PORT = process.env.PORT || 3000;
  
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
