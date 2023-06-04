import mongoose, { Document, Model, Schema } from "mongoose";



interface Comment extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  replies: Comment[];
}



export const CommentSchema: Schema<Comment> = new mongoose.Schema<Comment>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);



const CommentModel: Model<Comment> = mongoose.model<Comment>("Comment", CommentSchema);

export default CommentModel;
