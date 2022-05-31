import { NavLink } from "react-router-dom";
import Col from "react-bootstrap/Col";
import "./style/sideBar.sass";

function Sidebar() {
  return (
    <Col md={3} lg={2} sm={1} style={{ paddingRight: 0 }}>
      <div className="sidebar-continer">
        <div className="sidebar-title">Post</div>
        <div className="link-continer active-link">
          <NavLink to="/articles" className="link">
            All Articles
          </NavLink>
        </div>
        <div className="link-continer">
          <NavLink to="/articles/create" className="link">
            New Article
          </NavLink>
        </div>
      </div>
    </Col>
  );
}

export default Sidebar;
