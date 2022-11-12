import { timeStamp } from 'console';
import mongoose, { model } from 'mongoose';
import { boolean } from 'webidl-conversions';

//===================create model

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    cell: {
      type: Number,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

//====================================crate model
export const userModel = mongoose.model('registration', userSchema);
