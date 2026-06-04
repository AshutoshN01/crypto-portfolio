import mongoose, { Schema, Types } from 'mongoose'

export interface IWatchlist {
  user: Types.ObjectId
  name: string
  coins: Array<{ coinId: string; symbol: string; name: string }>
  createdAt?: Date
  updatedAt?: Date
}

const watchlistSchema = new Schema<IWatchlist>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 80, default: 'Default' },
    coins: [
      {
        coinId: { type: String, required: true, lowercase: true },
        symbol: { type: String, required: true, uppercase: true },
        name: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
)

watchlistSchema.index({ user: 1, name: 1 }, { unique: true })

const Watchlist = mongoose.model<IWatchlist>('Watchlist', watchlistSchema)
export default Watchlist
