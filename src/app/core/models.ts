export type CoverTone = 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6';

export interface Book {
  id: number;
  title: string;
  author: string;
  category: 'libros' | 'biblias' | 'ninos' | 'mujeres' | 'jovenes' | 'familia';
  price: number;
  oldPrice?: number;
  format: string;
  tone: CoverTone;
  description: string;
  pages: number;
  publisher: string;
  isbn: string;
  /** Solo para Biblias: código de la versión (ver BIBLE_VERSIONS). */
  version?: string;
  /** Colección editorial, p. ej. 'thompson'. */
  collection?: string;
}

export interface Author {
  slug: string;
  name: string;
  initials: string;
  role: string;
  count: number;
}

export interface BibleVersion {
  code: string;
  name: string;
  summary: string;
  bestFor: string;
  count: number;
}

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  body: string[];
  /** Ruta interna a la que invita la nota (p. ej. '/thompson'). */
  link?: string;
  date: string;
  category: string;
  tone: CoverTone;
}

export interface CartItem {
  book: Book;
  qty: number;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
}

export interface BookFilter {
  q?: string;
  category?: string;
  author?: string;
  version?: string;
  collection?: string;
}
