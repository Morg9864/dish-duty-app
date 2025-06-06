import mongoose, { Schema, models } from 'mongoose'

const SubscriptionSchema = new Schema({
  endpoint: { type: String, required: true, unique: true },
  expirationTime: { type: Schema.Types.Mixed, default: null },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default models.Subscription || mongoose.model('Subscription', SubscriptionSchema) 