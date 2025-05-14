import React from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import ModalDelete from "../../ui/modalDelete/ModalDelete";
import { Star, StarFill } from "react-bootstrap-icons";
import { Navigate, useNavigate } from "react-router-dom";

function BookItem({
  id,
  title,
  author,
  rating,
  pageCount,
  imageUrl,
  available,
  summary,
  handleDeleteBook,
}) {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSelectBook = () => {
    //ruta
    navigate(`${id}`, {
      //state: estado opcional con info extra que podemos pasar por la navegación (por la url)
      state: {
        book: {
          title,
          author,
          rating,
          pageCount,
          summary,
          imageUrl,
          available,
        },
      },
    });
  };

  const handleDelete = () => {
    handleModal();
    handleDeleteBook(title);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  // Ejercicio de clase de Listas dinámicas
  //Primero se crea un arreglo de long 5 que se va a llenar con estrellas llenas de acuerdo
  //a la longitud del array "rating". El sobrante del arreglo se llena con estrellas vacías
  const arrayStars = Array.from({ length: 5 }).map((_, i) =>
    //Compara el índice del arreglo (de 1 a 5) con el Rating para ver que estrella poner
    i < rating ? <StarFill key={i} /> : <Star key={i} />
  );

  //Nueva función para convertir el rating en estrellitas

  return (
    <div>
      <ModalDelete
        handleDelete={handleDelete}
        handleModal={handleModal}
        show={showModal}
      />
      <Card style={{ width: "22rem" }} className="mx-3">
        <Card.Img
          height={400}
          variant="top"
          className="book-image"
          src={imageUrl !== "" ? imageUrl : "https://bit.ly/47NylZk"}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{author}</Card.Subtitle>
          <div>{arrayStars}</div>
          <p>{pageCount} páginas</p>
          <Button onClick={handleSelectBook}>Ver detalles</Button>
          <br />
          <Button variant="danger" onClick={handleModal}>
            Eliminar Título
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookItem;
