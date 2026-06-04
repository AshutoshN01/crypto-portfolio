import mongoose, { Schema, Types } from 'mongoose'

export interface ISettings {
  user: Types.ObjectId
  baseCurrency: string
  theme: 'dark' | 'system'
  notifications: { email: boolean; push: boolean; priceAlerts: boolean }
  createdAt?: Date
  updatedAt?: Date
}

const settingsSchema = new Schema<ISettings>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    baseCurrency: { type: String, required: true, uppercase: true, default: 'USD' },
    theme: { type: String, enum: ['dark', 'system'], default: 'dark' },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false },
      priceAlerts: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
)

const Settings = mongoose.model<ISettings>('Settings', settingsSchema)
export default Settings
