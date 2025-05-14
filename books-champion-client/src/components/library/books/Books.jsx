import React, { use, useState } from "react";
import BookItem from "../bookItem/BookItem";
import BookSearch from "../bookSearch/BookSearch";

function Books({ books, onDeleteBook }) {
  const [search, setSearch] = useState("");
  const handleSearch = (value) => setSearch(value);

  const filteredBooks = books
    .filter((book) =>
      search
        ? book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
        : book
    )
    .map((book, index) => (
      book.available ? <BookItem
      key={index}
      id={book.id}
      title={book.title}
      author={book.author}
      rating={book.rating}
      pageCount={book.pageCount}
      imageUrl={book.imageUrl}
      available={book.available}
      summary={book.summary}
      handleDeleteBook={onDeleteBook}
    /> : ""
    ));

  return (
    <>
      <BookSearch onSearch={handleSearch} search={search} />

      {/* Ejercicio de clase (Manejo de state) */}
      {/* Quedó en desuso */}
      {/* {selectedBook && (
        <p>
          El libro seleccionado es:{" "}
          <span className="fw-bold">{selectedBook}</span>
        </p>
      )} */}

      <div className="d-flex justify-content-center flex-wrap">
        {filteredBooks.length ? (
          filteredBooks
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </div>
    </>
  );
}

export default Books;
