import { config } from 'dotenv'

config({ path: '.env' })

const { NODE_ENV, PORT } = process.env

export const server = {
    port: PORT || 3000,
    env: NODE_ENV || 'development',
}
