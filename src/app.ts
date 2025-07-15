import express, { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import { logger } from './config/logger'
import cookieParser from 'cookie-parser'
import customerRouter from './customers/customer-router'

const app = express()

app.use(cookieParser())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'hello' })
})

app.use('/customers', customerRouter)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message)
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        errors: [
            {
                message: err.message,
                type: err.name,
                path: '',
                location: '',
            },
        ],
    })
})

export default app
