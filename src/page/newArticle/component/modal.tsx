import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ErrorModal({
  show,
  onHide,
  message,
}: {
  show: boolean;
  onHide: () => void;
  message: string;
}) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="light"
          onClick={onHide}
          style={{
            borderColor: "#ddd",
            width: "71px",
          }}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
