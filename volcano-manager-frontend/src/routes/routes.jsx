import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import Profile from "../pages/Profile/Profile";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ]
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/signin",
        element: <Signin />,
    }
])
