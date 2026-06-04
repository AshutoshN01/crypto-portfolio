import { userRepository } from '../repositories/user.repository'
import { refreshTokenRepository } from '../repositories/refreshToken.repository'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt'
import { hashToken, refreshTokenExpiryDate } from '../utils/token'

export class AppError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message)
  }
}

function publicUser(user: { _id: unknown; email: string; username: string; roles: string[] }) {
  return {
    id: String(user._id),
    email: user.email,
    username: user.username,
    roles: user.roles
  }
}

async function issueTokens(user: { _id: unknown; roles: string[] }) {
  const payload = { sub: String(user._id), roles: user.roles }
  const accessToken = signAccessToken(payload)
  const refreshToken = signRefreshToken(payload)
  await refreshTokenRepository.create(String(user._id), hashToken(refreshToken), refreshTokenExpiryDate())
  return { accessToken, refreshToken }
}

export const authService = {
  async register(input: { email: string; username: string; password: string }) {
    const existingEmail = await userRepository.findByEmailOrUsername(input.email)
    const existingUsername = await userRepository.findByEmailOrUsername(input.username)
    if (existingEmail || existingUsername) throw new AppError(409, 'CONFLICT', 'User already exists')

    const user = await userRepository.create(input)
    const tokens = await issueTokens(user)
    return { user: publicUser(user), ...tokens }
  },

  async login(input: { identifier: string; password: string }) {
    const user = await userRepository.findByEmailOrUsername(input.identifier)
    if (!user) throw new AppError(401, 'UNAUTHORIZED', 'Invalid credentials')

    const valid = await user.comparePassword(input.password)
    if (!valid) throw new AppError(401, 'UNAUTHORIZED', 'Invalid credentials')

    const tokens = await issueTokens(user)
    return { user: publicUser(user), ...tokens }
  },

  async refresh(refreshToken?: string) {
    if (!refreshToken) throw new AppError(401, 'UNAUTHORIZED', 'No refresh token')

    const payload = verifyRefreshToken(refreshToken)
    const oldHash = hashToken(refreshToken)
    const storedToken = await refreshTokenRepository.findActive(oldHash)
    if (!storedToken) throw new AppError(401, 'UNAUTHORIZED', 'Invalid refresh token')

    const user = await userRepository.findById(payload.sub)
    if (!user) throw new AppError(401, 'UNAUTHORIZED', 'Invalid refresh token')

    const tokens = await issueTokens(user)
    await refreshTokenRepository.revoke(oldHash, hashToken(tokens.refreshToken))
    return { user: publicUser(user), ...tokens }
  },

  async logout(refreshToken?: string, userId?: string) {
    if (refreshToken) {
      await refreshTokenRepository.revoke(hashToken(refreshToken))
      return
    }

    if (userId) await refreshTokenRepository.revokeAllForUser(userId)
  },

  async me(userId: string) {
    const user = await userRepository.findById(userId)
    if (!user) throw new AppError(404, 'NOT_FOUND', 'User not found')
    return publicUser(user)
  }
}
