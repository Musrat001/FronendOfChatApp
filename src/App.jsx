import "./App.css";
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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
