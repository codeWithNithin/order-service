import app from './app'
import config from 'config'
import { logger } from './config/logger'
import connectDB from './config/db'

const startServer = async () => {
    try {
        await connectDB()
        const PORT = config.get('server.port')
        app.listen(PORT, () => {
            logger.info('server running at PORT', { port: PORT })
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

void startServer()
