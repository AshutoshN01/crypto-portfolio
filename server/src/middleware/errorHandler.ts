import { Request, Response, NextFunction } from 'express'
import { sendError } from '../utils/response'

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err)
  const status = err.status || 500
  const message = err.message || 'Internal server error'
  const code = err.code || (status >= 500 ? 'INTERNAL_ERROR' : 'BAD_REQUEST')
  return sendError(res, status, message, code)
}
