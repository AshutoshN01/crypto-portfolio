import RefreshToken from '../models/RefreshToken'

export const refreshTokenRepository = {
  create(userId: string, tokenHash: string, expiresAt: Date) {
    return RefreshToken.create({ user: userId, tokenHash, expiresAt })
  },

  findActive(tokenHash: string) {
    return RefreshToken.findOne({ tokenHash, revokedAt: { $exists: false }, expiresAt: { $gt: new Date() } })
  },

  revoke(tokenHash: string, replacedByTokenHash?: string) {
    return RefreshToken.findOneAndUpdate(
      { tokenHash },
      { revokedAt: new Date(), replacedByTokenHash },
      { new: true }
    )
  },

  revokeAllForUser(userId: string) {
    return RefreshToken.updateMany({ user: userId, revokedAt: { $exists: false } }, { revokedAt: new Date() })
  }
}
