import validator from "validator";
import bcrypt from "bcryptjs";
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
//   comparePassword: (canditatePassword: string) => Promise<boolean>;

}

const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    validate: {
        validator: (name: string) => validator.isLength(name, { min: 2, max: 50 }),
        message: 'Name must be between 2 and 50 characters',
      },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    validate: 
        {
            validator: (password: string) => validator.isStrongPassword(password, {
                minLength: 6,
                minNumbers: 1,
                minUppercase: 1,
                minSymbols: 1
            }),
            message: 'Password must contain at least 6 characters, including 1 uppercase letter, 1 number, and 1 special character',
        },
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
