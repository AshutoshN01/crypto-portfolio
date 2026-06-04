import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import { verifyAccessToken } from '../utils/jwt'
import { sendError } from '../utils/response'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined

  if (!token) return sendError(res, 401, 'Authentication required', 'UNAUTHORIZED')

  try {
    const payload = verifyAccessToken(token)
    req.user = {
      id: payload.sub,
      roles: payload.roles ?? ['user'],
      mongoId: new Types.ObjectId(payload.sub)
    }
    return next()
  } catch {
    return sendError(res, 401, 'Invalid or expired token', 'UNAUTHORIZED')
  }
}

export function requireRoles(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return sendError(res, 401, 'Authentication required', 'UNAUTHORIZED')
    if (!roles.some((role) => req.user!.roles.includes(role))) {
      return sendError(res, 403, 'Insufficient permissions', 'FORBIDDEN')
    }
    return next()
  }
}
