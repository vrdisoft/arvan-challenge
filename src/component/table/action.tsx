import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deletArticles } from "../../api/articles";
import { useDispatch } from "../../context/articleDispatcherContext";
import { deleteArticles } from "../../stateManager/actionCreator";

function DeleteModal({
  show,
  onHide,
  row,
}: {
  show: boolean;
  onHide: () => void;
  row: any;
}) {
  const dispatch = useDispatch();

  const handleDelete = (event: any) => {
    deletArticles(row.item.slug).then(() => {
      dispatch(deleteArticles());
      onHide();
      event.stopPropagation();
    });
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Article
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure to delete Article?</p>
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
          No
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          style={{
            width: "71px",
          }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Action(item: any) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const handleEdit = (row: any, event: any) => {
    navigate(
      {
        pathname: "/articles/edit",
        search: createSearchParams({
          slug: row.item.slug,
        }).toString(),
      },
      { replace: true }
    );
    event.stopPropagation();
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          style={{ backgroundColor: "#5bc0de", border: "1px solid #5bc0de" }}
        >
          {` ... `}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(event) => {
              handleEdit(item, event);
            }}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setModalShow(true)}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <DeleteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        row={item}
      />
    </>
  );
}

export default Action;
