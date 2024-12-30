import  { useState } from "react";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import { useLocation } from "react-router-dom";

const Authentication = () => {
  const location = useLocation(); 
  const showSignUp = location.state?.showSignUp || false;
  const [login, setLogin] = useState(!showSignUp); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {login ? (
        <LoginPage onToggle={() => setLogin(false)} />
      ) : (
        <RegisterPage onToggle={() => setLogin(true)} />
      )}
     ,</div>
  );
};

export default Authentication;