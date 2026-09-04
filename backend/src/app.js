import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { mainAppRouter } from './routes/mainApp.js'
import { categoryRouter } from './routes/category.js'
import crypto from 'node:crypto'

const app = express()

app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:5173'
        ]

        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    },
    credentials: true
}))
app.use(express.json())


app.use('/auth', authRouter)
app.use('/main', mainAppRouter)
app.use('/category', categoryRouter)

app.listen(5000, () => {
    console.log(`App running on: http://localhost:5000`)
})