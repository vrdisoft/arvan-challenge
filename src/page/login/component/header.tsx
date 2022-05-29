import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header({ isLoginPage }: { isLoginPage: boolean }) {
  return (
    <Row>
      <Col className="login-title">{isLoginPage ? "LOGIN" : "Register"}</Col>
    </Row>
  );
}

export default Header;
