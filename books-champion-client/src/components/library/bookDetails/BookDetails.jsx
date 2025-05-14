import { useLocation, useNavigate, useParams } from "react-router";

import { Badge, Button, Card, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import BookForm from "../bookForm/BookForm";

const BookDetails = () => {
  const [showEditForm, setshowEditForm] = useState(false);
  const [book, setBook] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // const { title, author, pageCount, summary, imageUrl, rating, available } =
  //   location.state.book;

  //useEffect con dependencias. Solo debe cambiar cuando el path cambie (el state.book o el id)
  //el libro que antes obteníamos directamente de location.state, ahora lo seteamos en un estado para su
  //supervisión durante el ciclo de vida del componente.
  useEffect(() => {
    const bookState = {
      ...location.state.book,
      id: parseInt(id, 10),
    };
    setBook(bookState);
  }, [location.state.book, id]);

  const clickHandler = () => {
    navigate("/libros");
  };

  const ratingStars = Array.from({ length: 5 }, (_, index) =>
    index < book?.rating ? <StarFill key={index} /> : <Star key={index} />
  );

  const handleShowEditForm = () => {
    setshowEditForm(!showEditForm);
  };

  const handleBookUpdated = (book) => {
    setBook(book);
  }

  return (
    <Card className="my-3 w-50">
      <Card.Img
        height={500}
        variant="top"
        src={book?.imageUrl !== "" ? book?.imageUrl : "https://bit.ly/47NylZk"}
      />
      <Card.Body>
        <div className="mb-2">
          {book?.available ? (
            <Badge bg="success">Disponible</Badge>
          ) : (
            <Badge bg="danger">Reservado</Badge>
          )}
        </div>
        <Card.Title>{book?.title}</Card.Title>
        <Card.Subtitle>{book?.author}</Card.Subtitle>
        {ratingStars}
        <p>{book?.pageCount} páginas</p>
        <p className="my-3">
          <b>Sinopsis</b>: {book?.summary}
        </p>
        <Row>
          <Button
            className="mb-2 me-2"
            variant="secondary"
            onClick={handleShowEditForm}
          >
            {showEditForm ? "Ocultar formulario" : "Editar libro"}
          </Button>
          <Button className="me-2" onClick={clickHandler}>
            Volver a la página principal
          </Button>
        </Row>
        {showEditForm ? (
          <BookForm book={book} onBookAdded={""} onBookSaved={handleBookUpdated} isEditing={true} />
        ) : (
          ""
        )}
      </Card.Body>
    </Card>
  );
};

export default BookDetails;
