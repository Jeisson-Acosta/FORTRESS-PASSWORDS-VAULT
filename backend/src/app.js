import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { mainAppRouter } from './routes/mainApp.js'

// import dotenv from 'dotenv'

// dotenv.config({ path: '../.env' })

const app = express()

app.use(cors())
app.use(express.json())


app.use('/auth', authRouter)
app.use('/main', mainAppRouter)

app.listen(5000, () => {
    // console.log(process.env)
    console.log(`App running on: http://localhost:5000`)
})