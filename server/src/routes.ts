import express from "express";
import {
  addBook,
  addMagazine,
  getAuthors,
  getBooks,
  getItemsByAuthor,
  getItemsByIsbn,
  getMagazines,
  getSortedItems,
} from "./controller";

const router = express.Router();

router.post("/add-item/book", addBook);
router.post("/add-item/magazine", addMagazine);
router.get("/books", getBooks);
router.get("/authors", getAuthors);
router.get("/magazines", getMagazines);
router.get("/items/sorted", getSortedItems);
router.get("/items/:isbn", getItemsByIsbn);
router.get("/items/author/:email", getItemsByAuthor);

export default router;
