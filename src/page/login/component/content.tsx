import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function Content({ isLoginPage }: { isLoginPage: boolean }) {
  const [validated, setValidated] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const emailInputRef = useRef() as any;
  const emailRegex = useRef(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i).current;

  const validateEmail = () => {
    if (!emailRegex.test(emailInputRef.current.value.replace(/\s/g, ""))) {
      setIsInvalidEmail(true);
      return false;
    } else {
      setIsInvalidEmail(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    validateEmail();
    event.preventDefault();
  };

  const handleEmailOnChange = () => {
    validateEmail();
  };

  return (
    <>
      <Row className="content-row">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {!isLoginPage && (
            <Form.Group className="mb-3" controlId="formBasicUser">
              <Form.Label type="invalid" className="text-Style">
                User
              </Form.Label>
              <Form.Control type="text" required />
              <Form.Control.Feedback
                type="invalid"
                className="text-feedback-style"
              >
                Required field
              </Form.Control.Feedback>
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-Style">Email</Form.Label>
            <Form.Control
              type="email"
              required
              isInvalid={isInvalidEmail}
              ref={emailInputRef}
              onChange={handleEmailOnChange}
            />
            <Form.Control.Feedback
              type="invalid"
              className="text-feedback-style"
            >
              {isInvalidEmail &&
                !!emailInputRef?.current?.value &&
                "Email isn’t valid"}
              {!emailInputRef?.current?.value && "Required field"}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label type="invalid" className="text-Style">
              Password
            </Form.Label>
            <Form.Control type="password" required />
            <Form.Control.Feedback
              type="invalid"
              className="text-feedback-style"
            >
              Required field
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="login-button">
            {isLoginPage ? "Login" : "Register"}
          </Button>
        </Form>
      </Row>
    </>
  );
}

export default Content;
