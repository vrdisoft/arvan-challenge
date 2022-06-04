import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Col from "react-bootstrap/Col";
import "./style/sideBar.scss";

function Sidebar() {
  const location = useLocation();
  const [articlesClassName, setArticlesClassName] = useState<string>("");
  const [newArticlesClassName, setNewArticlesClassName] = useState<string>("");
  useEffect(() => {
    if (
      location.pathname === "/articles" ||
      location.pathname === "/articles/page"
    ) {
      setArticlesClassName("link-continer active-link");
      setNewArticlesClassName("link-continer");
    } else {
      setArticlesClassName("link-continer");
      setNewArticlesClassName("link-continer  active-link");
    }
  }, [location.pathname]);

  return (
    <Col md={12} lg={2} sm={12} style={{ paddingRight: "0" }}>
      <div className="sidebar-continer">
        <div className="sidebar-title">Post</div>
        <div className={articlesClassName}>
          <NavLink to="/articles" className="link">
            All Articles
          </NavLink>
        </div>
        <div className={newArticlesClassName}>
          <NavLink to="/articles/create" className="link">
            New Article
          </NavLink>
        </div>
      </div>
    </Col>
  );
}

export default Sidebar;
