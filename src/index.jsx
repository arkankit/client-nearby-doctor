import React from "react";
import { createRoot } from "react-dom/client";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BasicDetails from "./components/BasicDetails/BasicDetails.jsx";
import "./baseStyle.css";
import HomePage from "./components/HomePage/HomePage.jsx";
import AboutSection from "./components/LandingPage/UserAppDrawer/AboutSection/AboutSection.jsx";
import HelpSection from "./components/LandingPage/UserAppDrawer/HelpSection/HelpSection.jsx";
import UserProfile from "./components/LandingPage/UserAppDrawer/UserProfile/UserProfile.jsx";
import AccountSection from "./components/LandingPage/UserAppDrawer/AccountSection/AccountSection.jsx";
import { UserDetailsProvider } from "./Contexts/UserDetailsContext.jsx"; // importing here to wrap whole app with this context

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/details",
    element: <BasicDetails />,
  },
  {
    path: "/about",
    element: <AboutSection />,
  },
  {
    path: "/help",
    element: <HelpSection />,
  },
  {
    path: "/account",
    element: <AccountSection />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
]);

createRoot(document.getElementById("root")).render(
  //using RouterProvider we have deffered the rending to this Component so as to use the routings
  // we have defined above
  /* wrapping the whole app with th context provider so that any component has the access to the context data */
  <UserDetailsProvider>
    <RouterProvider router={router} />
  </UserDetailsProvider>
);
