import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import pages
import App from "./App.jsx";
import Error from "./pages/Error/Error.jsx";
import Home from "./pages/Home/Home.jsx";
import LoginSignup from "./pages/LoginSignup/LoginSignup.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Launch from "./pages/Launch/Launch.jsx";
import SavedLaunches from "./pages/SavedLaunches/SavedLaunches.jsx";
import SingleLaunch from "./pages/SingleLaunch/SingleLaunch.jsx";
import UpdateProfileForm from "./pages/UpdateProfileForm/UpdateProfileForm.jsx";
import NasaDailyPic from "./pages/NasaDailyPic/NasaDailyPic.jsx";
import Donate from "./pages/Donate/Donate.jsx";
import Apis from "./pages/Apis/Apis.jsx";

// Setup routes to each page
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
      },
      {
        path: "/apis",
        element: <Apis />
      }
    ],
  },
]);

// Enable document to be rendered in the HTML document
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
