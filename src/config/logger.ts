import winston from 'winston'
import config from 'config'

export const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'order-service' },
    transports: [
        new winston.transports.File({
            level: 'info',
            dirname: 'logs',
            filename: 'combined.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            silent: config.get('server.NODE_ENV') === 'test',
        }),
        new winston.transports.File({
            level: 'error',
            dirname: 'logs',
            filename: 'error.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            silent: config.get('server.NODE_ENV') === 'test',
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            silent: config.get('server.NODE_ENV') === 'test',
        }),
    ],
})
