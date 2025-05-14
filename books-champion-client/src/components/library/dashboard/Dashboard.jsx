import React, { useEffect } from "react";

import Books from "../books/Books";
import initialBooks from "../../../data/books";
import BookForm from "../bookForm/BookForm";
import BookDetails from "../bookDetails/BookDetails";
import fetchBooks from "./dashboard.services";

import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../ui/toast/NotificationToast";

const Dashboard = ({ onLogOut }) => {
  //Usamos el useState porque eventualemente este arreglo de libros va a cambiar
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  //CÓDIGO EN DESUSO CUANDO CREAMOS DASHBOARD.SERVICES.JS
  //arreglo vacío
  // useEffect(callback(función arrow), dependencias(ej.: []))
  // useEffect(() => {
  //fetch: función asíncrona que me permite realizar requests al servidor
  //parámetros: endpoint y el método (get -> default, post, put, delete)
  //            headers requeridos de la request y el body (no son necesarios en GET)
  // fetch("http://localhost:3000/books", {
  //   headers: {"Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`}
  // })
  // .then(res => res.json())
  //Agregamos el spread operator (...) para aclarar que data es un arreglo
  // .then(data => setBooks([...data]))
  // .catch(err => console.log(err))
  // }, []);

  useEffect(() => {
    if (location.pathname === "/libros") {
      const token = localStorage.getItem("book-champions-token");
      fetchBooks(token)
        .then((data) => {
          setBooks([...data]);
        })
        .catch((error) => errorToast(error));
    }
  }, [location.pathname]);

  const handleBookAdded = (enteredBook) => {
    fetch("http://localhost:3000/books", {
      // aclaramos que el contenido que enviamos es de tipo json
      headers: {
        //El contenido que vamos a enviar es de tipo json
        "Content-type": "application/json",
      },
      method: "POST",
      //cuerpo de la request: un json en forma de string con la info del libro ingresado
      body: JSON.stringify(enteredBook),
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks((prevBooks) => [data, ...prevBooks]);
        successToast(`Libro ${data.title} agregado correctamente.`);
      })
      .catch((err) => console.log(err));
  };
  //CÓDIGO EN DESUSO AL EMPEZAR A UTILIZAR LA API
  // const bookData = {
  //   ...enteredBook,
  //   id: Math.random.toString(),
  //   bookRating: Array(enteredBook.rating).fill("*"),
  // };
  //prevBooks: Callback que trae el último valor modificado de books
  // setBooks((prevBooks) => {
  // return [bookData, ...prevBooks];
  //});

  const handleDeleteBook = (bookTitleToDelete) => {
    const updatedBooks = books.map((book) =>
      book.bookTitle === bookTitleToDelete ? { ...book, available: 0 } : book
    );
    setBooks(updatedBooks);
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <Row className="mb-3">
        <Col className="d-flex justify-content-end gap-3">
          <Button
            onClick={onLogOut}
            variant="primary"
            className="rounded-3 px-4"
          >
            Cerrar sesión
          </Button>
        </Col>
      </Row>
      <h2>Book champions app</h2>
      <p>¡Quiero leer libros!</p>
      <Routes>
        {/* index: componente principal */}
        <Route
          index
          element={<Books books={books} onDeleteBook={handleDeleteBook} />}
        />
        <Route path="/:id" element={<BookDetails />} />
        <Route
          path="add-book"
          element={
            <BookForm
              book={null}
              onBookAdded={handleBookAdded}
              isEditing={false}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
