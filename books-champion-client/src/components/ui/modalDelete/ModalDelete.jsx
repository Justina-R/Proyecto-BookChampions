import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete({ handleDelete, handleModal, show }) {

  return (
      <Modal show={show} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>¿De verdad querés eliminar el libro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Va a desaparecer para siempre</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            ¡No lo elimines!
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            ¡Que se muera!
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalDelete;