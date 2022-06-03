import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { login, register } from "../../../api/login";
type ResponsType = {
  data: {
    user: {
      token: string;
      username: string;
    };
  };
};

import { useToken } from "../../../context/tokenContext";

function Content({
  isLoginPage,
  showInvalidAlert,
}: {
  isLoginPage: boolean;
  showInvalidAlert: () => void;
}) {
  const navigate = useNavigate();
  const emailInputRef = useRef() as any;
  const userInputRef = useRef() as any;
  const passwordInputRef = useRef() as any;
  const { token, loginContext } = useToken();
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const emailRegex = useRef(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i).current;

  const validateEmail = (email: string) => {
    if (!emailRegex.test(email.replace(/\s/g, ""))) {
      setIsInvalidEmail(true);
      return false;
    } else {
      setIsInvalidEmail(false);
      return true;
    }
  };

  const submitLogin = async () => {
    const user = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    try {
      const response = await login({ user });
      const currentUser = (response as ResponsType)?.data?.user;
      loginContext(currentUser?.token, currentUser?.username);
      setLoading(false);
      navigate("/articles", { replace: true });
    } catch (e) {
      if ((e as any).status === 403) {
        showInvalidAlert();
      }
    }
  };

  const submitRegister = async () => {
    const user = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      username: userInputRef.current.value,
    };
    try {
      const response = await register({ user });
      const currentUser = (response as ResponsType)?.data?.user;
      loginContext(currentUser?.token, currentUser?.username);
      setLoading(false);
      navigate("/articles", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = () => {
    setLoading(true);
    if (isLoginPage) {
      submitLogin();
    } else {
      submitRegister();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (validateEmail(emailInputRef.current.value)) {
      handleLogin();
    }
    event.preventDefault();
  };

  const handleEmailOnChange = () => {
    validateEmail(emailInputRef.current.value);
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
          <Button
            variant="primary"
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {isLoginPage ? "Login" : "Register"}
          </Button>
        </Form>
      </Row>
    </>
  );
}

export default Content;
