// 이미지 미리보기 팝업 모달
import { Modal, Button } from 'react-bootstrap';

function ImageModal({ showModal, setShowModal, currentImgUrl, modalTitle }) {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center bg-light">
        {currentImgUrl && (
          <img
            src={currentImgUrl}
            alt={modalTitle}
            style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
            className="rounded shadow-sm"
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModal;