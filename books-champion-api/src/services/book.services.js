import { Books } from "../models/Books.js";

//       req -> request  /  res -> response
// GET -> todos los libros
export const getAllBooks = async (req, res) => {
  const books = await Books.findAll();

  res.json(books);
};

// GET -> devuelve libro especifico
export const getBookById = async (req, res) => {
  // recibe el id por medio del request,
  // desestructura id de req.params;
  const { id } = req.params;
  const book = await Books.findByPk(id);

  if (!book) {
    return res.status(404).send({ message: "Libro no encontrado." });
  }

  res.json(book);
};

// POST -> crea un nuevo libro
export const createBook = async (req, res) => {
  const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;

  if (!title || !author) {
    return res.status(400).send({ message: "Titulo y Autor son requeridos." });
  }

  const newBook = await Books.create({
    title,
    author,
    rating,
    pageCount,
    summary,
    imageUrl,
    available,
  });

  res.send(newBook);
};

// PUT -> Modificar datos de un libro especifico
export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;

  const book = await Books.findByPk(id);

  if (!book) {
    return res.status(404).send({ message: "Libro no encontrado." });
  }

  await book.update({
    title,
    author,
    rating,
    pageCount,
    summary,
    imageUrl,
    available,
  });

  res.send(book);
};

// DELETE -> Borra un libro de la bbdd
// No se suele utilizar ya que es permanente
export const deleteBook = async (req, res) => {
  const { id } = req.params;

  const book = await Books.findByPk(id);

  if (!book) {
    return res.status(404).send({ message: "Libro no encontrado." });
  }

  await book.destroy();

  res.send("Libro destruido forever ever.");
};