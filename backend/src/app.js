import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { mainAppRouter } from './routes/mainApp.js'
import { categoryRouter } from './routes/category.js'
import { logRouter } from './routes/log.js'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const app = express()

const PORT = process.env.PORT ?? 5000

app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:5173',
            'https://fortress-vault-project.netlify.app/'
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
app.use('/log', logRouter)

app.listen(PORT, () => {
    console.log(`App running on: http://localhost:${PORT}`)
})