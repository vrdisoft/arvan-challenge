import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import "./style/login.scss";
import Header from "./component/header";
import Content from "./component/content";
import Footer from "./component/footer";
import { useToken } from "../../context/tokenContext";
import { useDispatch } from "../../context/articleDispatcherContext";
import { clearAlertMessage } from "../../stateManager/actionCreator";

function Login() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const { logoutContext } = useToken();
  const dispatch = useDispatch();
  useEffect(() => {
    const isLogin = location.pathname === "/login" ? true : false;
    if (isLogin) {
      logoutContext();
    }
    setIsLoginPage(isLogin);
    dispatch(clearAlertMessage());
  }, [location.pathname]);

  const showInvalidAlert = () => {
    setShowAlert(true);
  };

  return (
    <div className="continer">
      <div className="login-continer">
        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
            className="login-alert"
          >
            <span className="login-Failed-User-name-andor-Password-is-invalid">
              <span className="text-style">Login Failed!</span>
              User name and/or Password is invalid
            </span>
          </Alert>
        )}
        <Header isLoginPage={isLoginPage} />
        <Content
          isLoginPage={isLoginPage}
          showInvalidAlert={showInvalidAlert}
        />
        <Footer isLoginPage={isLoginPage} />
      </div>
    </div>
  );
}

export default Login;
