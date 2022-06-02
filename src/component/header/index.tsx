import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style/header.sass";
import { useToken } from "../../context/tokenContext";

function Header() {
  const { username } = useToken();
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate("/login", { replace: true });
  };

  return (
    <Row>
      <div className="header-continer">
        <div className="baner">Arvan Challenge</div>
        <div className="username">{`Welcome ${username}`}</div>
        <div className="logout-button" onClick={handleOnclick}>
          Logout
        </div>
      </div>
    </Row>
  );
}

export default Header;
