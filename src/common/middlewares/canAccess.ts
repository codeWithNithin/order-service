import { NextFunction, Response } from 'express'
import createHttpError from 'http-errors'
import { AuthRequest } from '../types'
import { Request } from 'express-jwt'

export const canAccess = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const _req = req.auth as AuthRequest
        const roleFromToken = _req.role
        if (!roles.includes(roleFromToken)) {
            const error = createHttpError(
                403,
                'you dont have enough permissions',
            )

            next(error)
            return
        }

        next(0)
    }
}
