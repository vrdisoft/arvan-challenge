import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Col from "react-bootstrap/Col";
import "./style/sideBar.scss";
import routes from "../../config/routes";
import * as paths from "../../config/paths";

type MenuType = {
  title: string;
  path: string;
  isActive: boolean;
};

function Sidebar() {
  const location = useLocation();
  const [menu, setMenu] = useState<MenuType[]>([]);
  const configMnue = (configRoutes: any[]): MenuType[] => {
    const menuArr = configRoutes
      .filter((item) => {
        return item.side === true;
      })
      .map((menuItem) => {
        return {
          title: menuItem.sideTitle || "",
          path: menuItem.path,
          isActive: menuItem.path === paths.ARTICLES ? true : false,
        };
      });
    setMenu([...menuArr]);
    return menuArr;
  };

  const convertPathName = (path: string): string => {
    switch (path) {
      case paths.ARTICLES:
      case paths.ARTICLES_PAGE:
        return paths.ARTICLES;
        break;
      case paths.ARTICLES_CREATE:
      case paths.ARTICLES_EDIT:
        return paths.ARTICLES_CREATE;
        break;
      default:
        return paths.ARTICLES;
    }
  };

  useEffect(() => {
    let newMenu: MenuType[] = [];
    if (menu.length === 0) {
      newMenu = [...configMnue(routes)];
    }
    const pathName = convertPathName(location.pathname);
    if (newMenu.length === 0) {
      newMenu = [...menu];
    }
    const index = newMenu.findIndex((item) => {
      return item.path === pathName;
    });
    if (index > -1) {
      for (let i = 0; i < newMenu.length; i++) {
        newMenu[i].isActive = false;
      }
      newMenu[index].isActive = true;
    }
    setMenu([...newMenu]);
  }, [location.pathname]);

  return (
    <Col md={12} lg={2} sm={12} style={{ paddingRight: "0" }}>
      <div className="sidebar-continer">
        <div className="sidebar-title">Post</div>
        {menu.map((item) => {
          return (
            <div
              className={
                item.isActive ? "link-continer active-link " : "link-continer"
              }
            >
              <NavLink to={item.path} className="link">
                {item.title}
              </NavLink>
            </div>
          );
        })}
      </div>
    </Col>
  );
}

export default Sidebar;
