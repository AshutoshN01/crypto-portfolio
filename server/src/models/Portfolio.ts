import mongoose, { Schema, Types } from 'mongoose'

export interface IPortfolio {
  user: Types.ObjectId
  name: string
  baseCurrency: string
  description?: string
  isDefault: boolean
  createdAt?: Date
  updatedAt?: Date
}

const portfolioSchema = new Schema<IPortfolio>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, minlength: 1, maxlength: 80 },
    baseCurrency: { type: String, required: true, uppercase: true, minlength: 3, maxlength: 6, default: 'USD' },
    description: { type: String, trim: true, maxlength: 500 },
    isDefault: { type: Boolean, default: false }
  },
  { timestamps: true }
)

portfolioSchema.index({ user: 1, name: 1 }, { unique: true })

const Portfolio = mongoose.model<IPortfolio>('Portfolio', portfolioSchema)
export default Portfolio
