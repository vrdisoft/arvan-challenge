import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./style/login.sass";
import Header from "./component/header";
import Content from "./component/content";
import Footer from "./component/footer";
import { useToken } from "../../context/tokenContext";

function Login() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const { logoutContext } = useToken();
  useEffect(() => {
    const isLogin = location.pathname === "/login" ? true : false;
    if (isLogin) {
      logoutContext();
    }
    setIsLoginPage(isLogin);
  }, [location.pathname]);

  return (
    <div className="continer">
      <div className="login-continer">
        <Header isLoginPage={isLoginPage} />
        <Content isLoginPage={isLoginPage} />
        <Footer isLoginPage={isLoginPage} />
      </div>
    </div>
  );
}

export default Login;
