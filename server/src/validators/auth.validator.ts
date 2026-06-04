import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { sendError } from '../utils/response'

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8)
})

const loginSchema = z.object({ identifier: z.string().min(3), password: z.string().min(8) })

export function validateRegister(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = registerSchema.parse(req.body)
    next()
  } catch (e: any) {
    return sendError(res, 400, e.errors?.[0]?.message || 'Invalid request', 'VALIDATION_ERROR')
  }
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = loginSchema.parse(req.body)
    next()
  } catch (e: any) {
    return sendError(res, 400, e.errors?.[0]?.message || 'Invalid request', 'VALIDATION_ERROR')
  }
}
