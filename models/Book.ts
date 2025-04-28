import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  image: string;
  page: number;
  category: string;
}

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  page: { type: Number, required: true },
  category: { type: String, required: true }
});

export const Book = mongoose.model<IBook>('Book', BookSchema, 'kitaplar');
