/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

const BYPASS_ROUTES = [
  '/info',
  '/healthcheck',
];

export function LoggerMiddleware(customLogger: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (BYPASS_ROUTES.includes(req.url)) {
      return next();
    }
    const format = ':method :url :status :response-time ms :res[content-length] b de :remote-addr, trackId=:track-id';
    morgan.token('track-id', () => req.__trackId__);
    morgan(format, {
      stream: {
        write: (message) => customLogger.info(message, req.__trackId__),
      },
    })(req, res, console.error);

    next();
  };
}
