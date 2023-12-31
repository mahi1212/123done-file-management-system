import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Signup from "../src/pages/Signup/Signup";
import Signin from "../src/pages/Signin/Signin";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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

export default routes;