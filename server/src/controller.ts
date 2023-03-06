import { FileHandler } from "./fileHandler";
import { Book, Author, Magazine } from "./interfaces";
import { Request, Response } from "express";
import path from "path";

// root path
const PATH = path.resolve();

// file handlers for different files
const authorFileHandler = new FileHandler(`${PATH}/public/data/authors.csv`);
const bookFileHandler = new FileHandler(`${PATH}/public/data/books.csv`);
const magazineFileHandler = new FileHandler(
  `${PATH}/public/data/magazines.csv`
);

// get all books data from csv file
export const getBooks = async (req: Request, res: Response) => {
  // read data using book handler
  const books: Book[] | null = await bookFileHandler.read();
  if (books) {
    if (books.length > 0) {
      res.status(200).json(books);
    } else {
      res.status(404).end();
    }
  } else {
    res.status(500).end();
  }
};

// get all authors data from csv file
export const getAuthors = async (req: Request, res: Response) => {
  // read data using author handler
  const authors: Author[] | null = await authorFileHandler.read();
  if (authors) {
    if (authors.length > 0) {
      res.status(200).json(authors);
    } else {
      res.status(404).end();
    }
  } else {
    res.status(500).end();
  }
};

// get all magazines data from csv file
export const getMagazines = async (req: Request, res: Response) => {
  // read data using magazine handler
  const magazines: Magazine[] | null = await magazineFileHandler.read();
  if (magazines) {
    if (magazines.length > 0) {
      res.status(200).json(magazines);
    } else {
      res.status(404).end();
    }
  } else {
    res.status(500).end();
  }
};

// get all data by isbn from csv file
export const getItemsByIsbn = async (req: Request, res: Response) => {
  try {
    const { isbn } = req.params;
    if (!isbn) {
      res.send(400).end();
    }
    const books = await bookFileHandler.read();
    const magazines = await magazineFileHandler.read();
    const item = [...books, ...magazines].find((item) => item.isbn === isbn);
    if (item) {
      res.send(item);
    } else {
      res.status(404).send("Item not found.");
    }
  } catch (error) {
    res.status(500).end();
  }
};

// get all data by author from csv file
export const getItemsByAuthor = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    if (!email) {
      res.send(400).end();
    }
    const books = await bookFileHandler.read();
    const magazines = await magazineFileHandler.read();
    const items = [...books, ...magazines].filter((item) =>
      item.authors.includes(email)
    );
    if (items.length > 0) {
      res.send(items);
    } else {
      res.status(404).send("No items found.");
    }
  } catch (error) {
    res.status(500).end();
  }
};

// Endpoint to get all items sorted by title
export const getSortedItems = async (req: Request, res: Response) => {
  try {
    const books = (await bookFileHandler.read()) as Book[];
    const magazines = (await magazineFileHandler.read()) as Magazine[];
    const sortedItems = [...books, ...magazines].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    if (sortedItems.length > 0) {
      res.send(sortedItems);
    } else {
      res.status(404).send("No items found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

// add a new book to existing data
export const addBook = async (req: Request, res: Response) => {
  try {
    const newBook: Book = { ...req.body };
    if (!newBook) {
      res.status(400).end();
    }
    // Read existing book data from the CSV file
    const existingData = await bookFileHandler.read();
    // Append the new book to the existing data
    existingData.push(newBook);
    // Write the updated data back to the CSV file
    await bookFileHandler.write(existingData);
    // Send a success response
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// add a new magazine to existing data
export const addMagazine = async (req: Request, res: Response) => {
  try {
    const newMagazine: Magazine = { ...req.body };
    if (!newMagazine) {
      res.status(400).end();
    }
    // Read existing book data from the CSV file
    const existingData = await magazineFileHandler.read();
    // Append the new book to the existing data
    existingData.push(newMagazine);
    // Write the updated data back to the CSV file
    await magazineFileHandler.write(existingData);
    // Send a success response
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
