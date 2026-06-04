import mongoose, { Schema, Types } from 'mongoose'

export interface IAlert {
  user: Types.ObjectId
  portfolio?: Types.ObjectId
  coinId: string
  symbol: string
  condition: 'ABOVE' | 'BELOW'
  targetPrice: number
  enabled: boolean
  triggeredAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

const alertSchema = new Schema<IAlert>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio', index: true },
    coinId: { type: String, required: true, lowercase: true },
    symbol: { type: String, required: true, uppercase: true },
    condition: { type: String, enum: ['ABOVE', 'BELOW'], required: true },
    targetPrice: { type: Number, required: true, min: 0 },
    enabled: { type: Boolean, default: true },
    triggeredAt: { type: Date }
  },
  { timestamps: true }
)

alertSchema.index({ user: 1, enabled: 1 })

const Alert = mongoose.model<IAlert>('Alert', alertSchema)
export default Alert
