import { IBook } from '../models/Book';

export interface Book {
  _id: string;
  title: string;
  author: string;
  image: string;
  page: number;
  category: string;
  publisher: string;
  rating: number;
}
