import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style/header.sass";

function Header({ username }: { username: string }) {
  return (
    <Row>
      <div className="header-continer">
        <div className="baner">Arvan Challenge</div>
        <div className="username">{`Welcome ${username}`}</div>
        <div className="logout-button">Logout</div>
      </div>
    </Row>
  );
}

export default Header;
