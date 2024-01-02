import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoutes";
import Test from "../pages/Test/Test";
import AdminRoutes from "./AdminRoutes";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><RootLayout /></PrivateRoute>,
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
            {
                path: "/test",
                element: <AdminRoutes><Test /></AdminRoutes>,
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
    }
])
