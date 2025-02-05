import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthLayout, Login } from "./components/index.js";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Setting from "./pages/Setting.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AllList from "./pages/AllList.jsx";
import Player from "./pages/Player.jsx";
import { AudioProvider } from "./pages/AudioProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      { path: "/contact", element: <Contact /> },
      { path: "/setting", element: <Setting /> },
      { path: "/about", element: <About /> },
      {
        path: "/alllist",
        element: (
          <AuthLayout authentication>
            <AllList />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/player",
        element: (
          <AuthLayout authentication>
            <Player />
          </AuthLayout>
        ),
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AudioProvider>
        <RouterProvider router={router} />
      </AudioProvider>
    </Provider>
  </React.StrictMode>
);
