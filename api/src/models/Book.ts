import mongoose, { Schema, Document } from 'mongoose';
import { AuthorInterface } from './Author';

export interface BookInterface extends Document {
  title: string;
  genre?: string;
  publicationYear?: number;
  pages: number;
  author: string | AuthorInterface;
}

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    genre: String,
    publicationYear: Number,
    pages: Number,
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
  },
  {
    timestamps: true,
  },
);

// Convert _id to id field when returning doc in JSON form
BookSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<BookInterface>('Book', BookSchema);
