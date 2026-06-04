import mongoose, { Schema, Types } from 'mongoose'

export type TransactionType = 'BUY' | 'SELL' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'FEE'

export interface ITransaction {
  user: Types.ObjectId
  portfolio: Types.ObjectId
  holding?: Types.ObjectId
  type: TransactionType
  coinId: string
  symbol: string
  quantity: number
  price: number
  fee: number
  note?: string
  executedAt: Date
  createdAt?: Date
  updatedAt?: Date
}

const transactionSchema = new Schema<ITransaction>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio', required: true, index: true },
    holding: { type: Schema.Types.ObjectId, ref: 'Holding', index: true },
    type: { type: String, enum: ['BUY', 'SELL', 'TRANSFER_IN', 'TRANSFER_OUT', 'FEE'], required: true, index: true },
    coinId: { type: String, required: true, trim: true, lowercase: true },
    symbol: { type: String, required: true, trim: true, uppercase: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    fee: { type: Number, required: true, min: 0, default: 0 },
    note: { type: String, trim: true, maxlength: 500 },
    executedAt: { type: Date, required: true, default: Date.now }
  },
  { timestamps: true }
)

transactionSchema.index({ user: 1, portfolio: 1, executedAt: -1 })

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema)
export default Transaction
