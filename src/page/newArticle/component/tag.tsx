import { useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export type TagType = {
  name: string;
  isChecked: boolean;
};

function Tags({
  tagList,
  onChange,
  addTag,
}: {
  tagList: TagType[];
  onChange: (item: TagType, index: number) => void;
  addTag: (name: string) => void;
}) {
  const nameInputRef = useRef() as any;

  const handleOnChange = (
    event: React.MouseEvent<HTMLInputElement>,
    item: TagType,
    index: number
  ) => {
    onChange({ name: item.name, isChecked: item.isChecked }, index);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      addTag(nameInputRef.current.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <Col md={4} lg={3}>
      <Form
        noValidate
        style={{ height: "calc(100% - 42px)" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicTags">
          <Form.Label type="invalid" className="text-Style">
            Tags
          </Form.Label>
          <Form.Control
            type="text"
            required
            onKeyDown={handleOnKeyDown}
            ref={nameInputRef}
          />
          <Form.Control.Feedback type="invalid" className="text-feedback-style">
            Required field
          </Form.Control.Feedback>
        </Form.Group>
        <div
          style={{
            border: "1px solid #ced4da",
            borderRadius: "0.25rem",
            paddingLeft: "15px",
            paddingTop: "15px",
            height: "calc(100% - 100px)",
            overflowY: "auto",
          }}
        >
          {tagList.map((item, index) => {
            return (
              <Form.Group
                className="mb-3"
                controlId={`formBasicCheckbox${index}`}
              >
                <Form.Check
                  type="checkbox"
                  key={index}
                  label={item.name}
                  checked={item.isChecked}
                  onClick={(e) => {
                    handleOnChange(e, item, index);
                  }}
                />
              </Form.Group>
            );
          })}
        </div>
      </Form>
    </Col>
  );
}

export default Tags;
