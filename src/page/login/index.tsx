import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./style/login.sass";
import Header from "./component/header";
import Content from "./component/content";
import Footer from "./component/footer";
import { useToken } from "../../context/tokenContext";
import { useDispatch } from "../../context/articleDispatcherContext";
import { clearAlertMessage } from "../../stateManager/actionCreator";

function Login() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const { logoutContext } = useToken();
  const dispatch = useDispatch();
  useEffect(() => {
    const isLogin = location.pathname === "/login" ? true : false;
    if (isLogin) {
      logoutContext();
    }
    setIsLoginPage(isLogin);
    dispatch(clearAlertMessage({ alertMessage: "" }));
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
