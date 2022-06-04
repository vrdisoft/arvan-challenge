import { useNavigate } from "react-router-dom";
import * as paths from "../../../config/paths";

function Footer({ isLoginPage }: { isLoginPage: boolean }) {
  const navigate = useNavigate();
  return (
    <>
      <span className="dont-have-account text-Style">
        {isLoginPage ? "Don’t have account?" : "Already Registered?"}
      </span>
      <span
        className="register-Now"
        onClick={() => {
          if (isLoginPage) {
            navigate(paths.REGISTER, { replace: true });
          } else {
            navigate(paths.LOGIN, { replace: true });
          }
        }}
      >
        {isLoginPage ? "Register Now" : "Login"}
      </span>
    </>
  );
}

export default Footer;
