import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import User from "../pages/User/User";
import Files from "../pages/Files/Files";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><RootLayout /></PrivateRoute>,
        children: [
            {
                path: "/",
                element: <Files />,
            },
            {
                path: "/files",
                element: <Files />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/user",
                element: <AdminRoutes><User /></AdminRoutes>,
            },
            {
                path: "*",
                element: <div>Not Found</div>,
            }
        ]
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/signin",
        element: <Signin />,
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
    },
    {
        path: "*",
        element: <div>Not Found</div>,
    }
])
