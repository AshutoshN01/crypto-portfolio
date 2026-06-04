import mongoose, { Schema, Types } from 'mongoose'

export interface INotification {
  user: Types.ObjectId
  type: 'ALERT' | 'SYSTEM' | 'PORTFOLIO'
  title: string
  message: string
  readAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['ALERT', 'SYSTEM', 'PORTFOLIO'], required: true },
    title: { type: String, required: true, maxlength: 120 },
    message: { type: String, required: true, maxlength: 1000 },
    readAt: { type: Date }
  },
  { timestamps: true }
)

notificationSchema.index({ user: 1, createdAt: -1 })

const Notification = mongoose.model<INotification>('Notification', notificationSchema)
export default Notification
