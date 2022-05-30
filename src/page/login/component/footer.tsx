import { useNavigate } from "react-router-dom";

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
            navigate("../register", { replace: true });
          } else {
            navigate("../login", { replace: true });
          }
        }}
      >
        {isLoginPage ? "Register Now" : "Login"}
      </span>
    </>
  );
}

export default Footer;
