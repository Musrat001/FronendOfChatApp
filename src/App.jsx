
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./layouts/auth/AuthLayout";
import Home from "./components/publicComponents/Home";
import Register from "./components/publicComponents/Register";
import Login from "./components/publicComponents/Login";

import Profile from "./components/userComponents/Profile";
import UserLayout from "./layouts/user/UserLayout";
import Dashboard from "./components/userComponents/Dashboard";
import UserHome from "./components/userComponents/UserHome";
import ForgetPassowrd from "./pages/ForgetPassowrd";
import SelectedUserProfile from "./components/userComponents/SelectedUserProfile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgetPassowrd />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/selectedUserProfile/:id" element={<SelectedUserProfile />} />
        </Route>
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
