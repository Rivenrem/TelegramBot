import { NextFunction, Request, Response } from 'express';

export function clientErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
}
