import React from "react";
import SignUP from "./components/SignUpForm";
import LogIn from "./components/LogIn";
import { BrowserRouter, createBrowserRouter,RouterProvider } from 'react-router-dom';

function App(){
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><SignUP/></>
    },
    {
      path:"/Login",
      element:<><LogIn/></>
    },
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
