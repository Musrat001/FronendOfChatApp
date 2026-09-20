import React from "react";
import Header from "../../components/publicComponents/Header";
import Footer from "../../components/publicComponents/Footer";
import Register from "../../components/publicComponents/Register";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AuthLayout;
