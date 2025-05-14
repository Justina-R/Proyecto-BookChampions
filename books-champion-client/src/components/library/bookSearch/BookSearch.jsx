import React from 'react'
import { Form } from 'react-bootstrap'

const BookSearch = ({ search, onSearch }) => {

  return (
    <div>
        <Form.Group className='mb-3 form-search' controlId='searchBook'>
            <Form.Label>Buscador de Libros</Form.Label>
            <Form.Control
            type='text'
            placeholder='Ingresa título'
            onChange={(e) => onSearch(e.target.value)}
            value={search}
            />
        </Form.Group>
    </div>
  )
}

export default BookSearch