import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookForm = ({ book, onBookAdded, onBookSaved, isEditing }) => {
  const navigate = useNavigate();

  //Utilizamos el operador ? en caso de que book sea nulo (cuando queremos agregar un nuevo libro)
  const [title, setTitle] = useState(book?.title);
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const [author, setAuthor] = useState(book?.author);
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const [rating, setRating] = useState(book?.rating);
  const handleChangeRating = (event) => {
    setRating(event.target.value);
  };

  const [pageCount, setPageCount] = useState(book?.pageCount);
  const handleChangePageCount = (event) => {
    setPageCount(event.target.value);
  };

  const [imageUrl, setImageUrl] = useState(book?.imageUrl);
  const handleChangeImageUrl = (event) => {
    setImageUrl(event.target.value);
  };

  const [summary, setSummary] = useState(book?.summary);
  const handleChangeSummary = (event) => {
    setSummary(event.target.value);
  };

  const [available, setAvailable] = useState(book?.available);
  const handleChangeAvailable = (event) => {
    setAvailable(event.target.value);
  };

  const handleAddBook = async (event) => {
    //evitamos que el formulario se recargue por algun motivo
    event.preventDefault();
    const bookData = {
      title,
      author,
      rating: parseInt(rating, 10),
      pageCount: parseInt(pageCount, 10),
      summary: "",
      imageUrl,
      available,
    };
    try {
      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`,
        },
        body: JSON.stringify(bookData),
      });
      if (!res.ok) throw new Error("Error al crear el nuevo libro");

      const newBook = await res.json();

      //función que viene como prop de App
      onBookAdded(newBook);

      //limpiamos las variables para cuando ingresemos otro libro
      setTitle("");
      setAuthor("");
      setRating("");
      setPageCount("");
      setImageUrl("");
      setAvailable(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = (event) => {
    event.preventDefault();
    const bookData = {
      title,
      author,
      rating: parseInt(rating, 10),
      pageCount: parseInt(pageCount, 10),
      summary,
      imageUrl,
      available,
    };
    fetch(`http://localhost:3000/books/${book.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`,
      },
      method: "PUT",
      body: JSON.stringify(bookData),
    })
      .then((res) => res.json())
      .then(() => {
        onBookSaved(bookData);
        navigate("/libros");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="m-4 w-100" bg="success">
      <Card.Body>
        <Form
          className="text-white"
          onSubmit={isEditing ? handleSaveBook : handleAddBook}
        >
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  placeholder="Ingresar título"
                  onChange={handleChangeTitle}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  value={author}
                  placeholder="Ingresar autor"
                  onChange={handleChangeAuthor}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Puntuación</Form.Label>
                <Form.Control
                  type="number"
                  value={rating}
                  placeholder="Ingresar cantidad de estrellas"
                  max={5}
                  min={0}
                  onChange={handleChangeRating}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="pageCount">
                <Form.Label>Cantidad de páginas</Form.Label>
                <Form.Control
                  type="number"
                  value={pageCount}
                  placeholder="Ingresar cantidad de páginas"
                  min={1}
                  onChange={handleChangePageCount}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-between">
            <Form.Group className="mb-3" controlId="imageUrl">
              <Form.Label>URL de imagen</Form.Label>
              <Form.Control
                type="text"
                value={imageUrl}
                placeholder="Ingresar url de imagen"
                onChange={handleChangeImageUrl}
              />
            </Form.Group>
          </Row>
          <Row className="justify-content-between">
            <Form.Group className="mb-3" controlId="summary">
              <Form.Label>Resumen</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={summary}
                placeholder="Ingresar resumen del libro"
                onChange={handleChangeSummary}
              />
            </Form.Group>
          </Row>
          <Row className="justify-content-end">
            <Col
              md={3}
              className="d-flex flex-column justify-content-end align-items-end"
            >
              <Form.Check
                type="switch"
                id="available"
                className="mb-3"
                label="¿Disponible?"
                checked={available}
                onChange={handleChangeAvailable}
              />
              <Row className="justify-content-end">
                <Col md={6} className="d-flex justify-content-end gap-2">
                  <Button variant="light" onClick={() => navigate("/libros")}>
                    Volver
                  </Button>
                  <Button variant="primary" type="submit">
                    {isEditing ? "Editar lectura" : "Agregar lectura"}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BookForm;
