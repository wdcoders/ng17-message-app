import mongoose, { Schema } from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = mongoose.model('Message', MessageSchema);
