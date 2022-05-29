import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./style/login.sass";
import Header from "./component/header";
import Content from "./component/content";
import Footer from "./component/footer";

function Login() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(true);
  useEffect(() => {
    const isLogin = location.pathname === "/login" ? true : false;
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
