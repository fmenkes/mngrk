import mongoose, { Schema, Document } from 'mongoose';

export interface AuthorInterface extends Document {
  name: string;
}

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Convert _id to id field when returning doc in JSON format
AuthorSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<AuthorInterface>('Author', AuthorSchema);
