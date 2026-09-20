import React from "react";
import { Outlet } from "react-router-dom";
import Home from "../../components/userComponents/Home";
import Header from "../../components/publicComponents/Header";
import Footer from "../../components/publicComponents/Footer";

function UserLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default UserLayout;
