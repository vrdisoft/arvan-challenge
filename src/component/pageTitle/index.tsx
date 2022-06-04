import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import routes from "../../config/routes";
import "./style/pageTitle.scss";

function PageTitle() {
  const location = useLocation();
  const [title, setTitle] = useState<string>("");
  const getTitle = (path: string): string => {
    return routes.filter((item) => item.path === path)[0]?.title ?? "";
  };

  useEffect(() => {
    setTitle(getTitle(location.pathname));
  }, [location.pathname]);

  return <div className="page-title">{title}</div>;
}

export default PageTitle;
