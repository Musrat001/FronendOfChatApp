
import Header from "../../components/publicComponents/Header";
import Footer from "../../components/publicComponents/Footer";

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
