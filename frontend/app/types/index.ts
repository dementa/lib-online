export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: Category;
  subcategory?: string;
  rating: number;
  downloads: number;
  pages: number;
  language: string;
  publishedYear: number;
  description: string;
  isFeatured?: boolean;
  isNew?: boolean;
  tags?: string[];
  color: string; // dominant cover color for skeleton/glow
}

export type Category =
  | "Primary"
  | "Secondary"
  | "High School"
  | "University"
  | "Kids"
  | "Story Books"
  | "Past Papers"
  | "Novels"
  | "Programming"
  | "Business"
  | "Science"
  | "History"
  | "Languages"
  | "Others";

export interface Shelf {
  id: string;
  title: string;
  subtitle?: string;
  books: Book[];
}

export interface ContinueReading {
  book: Book;
  progress: number; // 0-100
  lastReadPage: number;
  lastReadAt: Date;
}
