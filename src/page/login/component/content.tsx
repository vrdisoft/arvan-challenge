import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { login, register } from "../../../api/login";
type ResponsType = {
  data: {
    user: {
      token: string;
    };
  };
};

import { useToken } from "../../../context/tokenContext";

function Content({ isLoginPage }: { isLoginPage: boolean }) {
  const [validated, setValidated] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const emailInputRef = useRef() as any;
  const userInputRef = useRef() as any;
  const passwordInputRef = useRef() as any;
  const emailRegex = useRef(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i).current;
  const { token, loginContext } = useToken();
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!emailRegex.test(emailInputRef.current.value.replace(/\s/g, ""))) {
      setIsInvalidEmail(true);
      return false;
    } else {
      setIsInvalidEmail(false);
      return true;
    }
  };

  const handleLogin = () => {
    if (isLoginPage) {
      const user = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      };
      login({ user })
        .then((res) => {
          loginContext((res as ResponsType)?.data?.user?.token);
          navigate("../articles", { replace: true });
        })
        .catch((err) => {
          console.log(err.data.errors);
        });
    } else {
      const user = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        username: userInputRef.current.value,
      };
      register({ user }).then((res) => {
        loginContext((res as ResponsType)?.data?.user?.token);
        navigate("../articles", { replace: true });
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (validateEmail()) {
      handleLogin();
    }
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
              <Form.Control type="text" required ref={userInputRef} />
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
            <Form.Control type="password" required ref={passwordInputRef} />
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
