import { Response } from 'express'

export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'VALIDATION_ERROR'
  | 'INTERNAL_ERROR'

export function sendSuccess<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({ status: 'success', data })
}

export function sendError(res: Response, status = 500, message = 'Server error', code: ApiErrorCode = 'INTERNAL_ERROR') {
  return res.status(status).json({ status: 'error', error: { code, message } })
}
