import React from 'react';
import { createRoot } from 'react-dom/client';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BasicDetails from './components/BasicDetails/BasicDetails.jsx';
import "./baseStyle.css";
import HomePage from './components/HomePage/HomePage.jsx';

const router = createBrowserRouter([
  {
    path: "/signup",
    element : <Signup />,
  },
  {
    path: "/login",
    element : <Login />,
  },
  {
    path : "/landing",
    element : <LandingPage />,
  },
  {
    path : "/details",
    element : <BasicDetails />
  },
  {
    path : "/",
    element : <HomePage />,
    errorElement : <NotFoundPage />,
  }
]);

createRoot(document.getElementById('root')).render(
  //using RouterProvider we have deffered the rending to this Component so as to use th routings
  // we have defined above
    <RouterProvider router={router}/>
);

