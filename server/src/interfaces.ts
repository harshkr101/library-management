export interface Author {
  email: string;
  firstName: string;
  lastName: string;
}

export interface Book {
  title: string;
  isbn: string;
  description:string;
  authors: string[];
}

export interface Magazine {
  title: string;
  isbn: string;
  authors: string[];
  publishedAt: string;
}