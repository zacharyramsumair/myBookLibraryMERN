
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IToken extends Document {
  refreshToken: string;
  ip: string;
  userAgent: string;
  isValid: boolean;
  user: mongoose.Types.ObjectId;
}

const TokenSchema: Schema<IToken> = new mongoose.Schema<IToken>({
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    isValid: { type: Boolean, default: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
},{ timestamps: true });



const Token: Model<IToken> = mongoose.model<IToken>('Token', TokenSchema);

export default Token;
