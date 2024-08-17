import { model, Schema, type Document } from 'mongoose';
import { hash } from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) this.password = await hash(this.password, 10);

  next();
});

export const User = model<IUser>('user', userSchema);
