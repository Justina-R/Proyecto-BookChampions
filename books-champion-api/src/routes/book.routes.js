import { Router } from "express";

import {
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    updateBook,
  } from "../services/book.services.js";
import {verifyToken} from "../services/auth.services.js"

// Rutas para hacer consultas sobre libros

const router = Router();

router.get("/books",verifyToken, getAllBooks);

router.get("/books/:id", verifyToken, getBookById);

router.post("/books",verifyToken, createBook);

router.put("/books/:id",verifyToken, updateBook);

router.delete("/books/:id", deleteBook);

export default router; // importar en index.js y app.use()