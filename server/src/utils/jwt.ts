import jwt, { SignOptions } from 'jsonwebtoken'
import { env } from '../config/env'

export interface TokenPayload {
  sub: string
  roles?: string[]
}

export function signAccessToken(payload: TokenPayload) {
  const options: SignOptions = { expiresIn: env.ACCESS_TOKEN_TTL as SignOptions['expiresIn'] }
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, options)
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as TokenPayload
}

export function signRefreshToken(payload: TokenPayload) {
  const options: SignOptions = { expiresIn: env.REFRESH_TOKEN_TTL as SignOptions['expiresIn'] }
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, options)
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as TokenPayload
}

export default { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken }
