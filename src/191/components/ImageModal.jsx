// 이미지 미리보기 팝업 모달

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ImageModal({ /*  🔷TODO  */ }) {
  return (
    <Modal show={ "🔷TODO" } onHide={() => { /* 🔷TODO */ }} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{/*  🔷TODO  */}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center bg-light">
        { /* 🔷TODO */ }
          <img 
            src={ "🔷TODO" } 
            alt={ "🔷TODO" } 
            style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }} 
            className="rounded shadow-sm"
          />
        { /* 🔷TODO */ }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { /* 🔷TODO */ }}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModal;