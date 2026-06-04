import crypto from 'crypto'

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export function refreshTokenExpiryDate() {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)
  return expiresAt
}
