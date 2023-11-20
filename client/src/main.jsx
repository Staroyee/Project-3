import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Profile from "./pages/Profile";
import Launch from "./pages/Launch";
import SavedLaunches from "./pages/SavedLaunches.jsx";
import SingleLaunch from "./pages/SingleLaunch.jsx";
import UpdateProfileForm from "./pages/UpdateProfileForm.jsx";
import NasaDailyPic from "./pages/NasaDailyPic.jsx";
import Donate from "./pages/Donate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login-signup",
        element: <LoginSignup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfileForm />,
      },
      {
        path: "/launches",
        element: <Launch />,
      },
      {
        path: "/saved-launches",
        element: <SavedLaunches />,
      },
      {
        path: "/launch/:launchId",
        element: <SingleLaunch />,
      },
      {
        path: "/picture-of-the-day",
        element: <NasaDailyPic />
      },
      {
        path: "/donate",
        element: <Donate />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
