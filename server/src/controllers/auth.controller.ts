import { Request, Response, NextFunction } from 'express'
import { authService } from '../services/auth.service'
import { sendSuccess } from '../utils/response'

const refreshCookieName = 'refreshToken'

function setRefreshCookie(res: Response, token: string) {
  res.cookie(refreshCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/v1/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body)
    setRefreshCookie(res, result.refreshToken)
    return sendSuccess(res, { accessToken: result.accessToken, user: result.user }, 201)
  } catch (err) {
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.login(req.body)
    setRefreshCookie(res, result.refreshToken)
    return sendSuccess(res, { accessToken: result.accessToken, user: result.user })
  } catch (err) {
    next(err)
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.refresh(req.cookies[refreshCookieName])
    setRefreshCookie(res, result.refreshToken)
    return sendSuccess(res, { accessToken: result.accessToken, user: result.user })
  } catch (err) {
    next(err)
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.logout(req.cookies[refreshCookieName], req.user?.id)
    res.clearCookie(refreshCookieName, { path: '/api/v1/auth' })
    return sendSuccess(res, { message: 'Logged out' })
  } catch (err) {
    next(err)
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.me(req.user!.id)
    return sendSuccess(res, { user })
  } catch (err) {
    next(err)
  }
}
