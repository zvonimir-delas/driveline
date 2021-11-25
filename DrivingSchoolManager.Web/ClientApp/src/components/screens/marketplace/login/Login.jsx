import React from "react";
import "../../../../styles/screens/marketplace/_login.scss";

import MarketplaceLayout from "../../../layouts/MarketplaceLayout";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <>
      <MarketplaceLayout />
      <main className="login">
        <div className="login__overlay" />
        <LoginForm />
      </main>
    </>
  );
};

export default Login;
