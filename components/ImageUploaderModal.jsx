import { Modal } from "react-bootstrap";

const ImageUploaderModal = ({ show, handleClose, children }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-sm btn-outlined-secondary"
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageUploaderModal;
