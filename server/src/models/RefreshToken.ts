import mongoose, { Schema, Types } from 'mongoose'

export interface IRefreshToken {
  user: Types.ObjectId
  tokenHash: string
  expiresAt: Date
  revokedAt?: Date
  replacedByTokenHash?: string
  createdAt?: Date
  updatedAt?: Date
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenHash: { type: String, required: true, unique: true, index: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date },
    replacedByTokenHash: { type: String }
  },
  { timestamps: true }
)

const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema)
export default RefreshToken
