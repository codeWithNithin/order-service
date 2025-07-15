import { NextFunction, RequestHandler, Request, Response } from 'express'
import createHttpError from 'http-errors'

const asyncWrapper = (requestHandler: RequestHandler) => {
    // return (req: Request, res: Response, next: NextFunction) => {
    //     Promise.resolve(requestHandler(req, res, next)).catch((err) => {
    //         if(err instanceof Error) {
    //             return next(createHttpError(500, err.message))
    //         }
    //         return next(createHttpError(500, 'Internal server err'))
    //     })
    // },

    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            if (err instanceof Error) {
                return next(createHttpError(500, err.message))
            }
            console.log('err in asyncWrapper', err)
            return next(createHttpError(500, 'Internal server error'))
        })
    }
}

export default asyncWrapper
