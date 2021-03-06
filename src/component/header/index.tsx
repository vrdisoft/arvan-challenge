import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import "./style/header.scss";
import { useToken } from "../../context/tokenContext";
import * as paths from "../../config/paths";

function Header() {
  const { username } = useToken();
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate(paths.LOGIN, { replace: true });
  };

  return (
    <Row style={{ margin: "0" }}>
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
