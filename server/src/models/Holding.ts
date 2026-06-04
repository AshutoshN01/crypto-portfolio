import mongoose, { Schema, Types } from 'mongoose'

export interface IHolding {
  user: Types.ObjectId
  portfolio: Types.ObjectId
  coinId: string
  symbol: string
  name: string
  quantity: number
  averageBuyPrice: number
  currentPrice: number
  totalInvested: number
  createdAt?: Date
  updatedAt?: Date
}

const holdingSchema = new Schema<IHolding>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio', required: true, index: true },
    coinId: { type: String, required: true, trim: true, lowercase: true },
    symbol: { type: String, required: true, trim: true, uppercase: true },
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    averageBuyPrice: { type: Number, required: true, min: 0 },
    currentPrice: { type: Number, required: true, min: 0, default: 0 },
    totalInvested: { type: Number, required: true, min: 0, default: 0 }
  },
  { timestamps: true }
)

holdingSchema.index({ user: 1, portfolio: 1, coinId: 1 }, { unique: true })

const Holding = mongoose.model<IHolding>('Holding', holdingSchema)
export default Holding
