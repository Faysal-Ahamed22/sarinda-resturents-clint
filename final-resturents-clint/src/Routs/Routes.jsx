import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import HomePage from "../Pages/Home/HomePage";
import MainMenu from "../Pages/MenuPage/MainMenu";
import Order from "../Pages/OrderPage/Order";
import Cart from "../Pages/CartPage/Cart";
import Dashboard from "../Pages/DashboardPage/Dashboard";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SighUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Shared/Secret";
import { Navigate } from "react-router-dom";


 export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element:<HomePage></HomePage>,
                
            },
            {
                path: 'menu',
               element: <MainMenu></MainMenu>

            },
            {
                path:'order',
                element: <Order></Order>
            },
            {
                path: 'dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: 'cart',
                element: <Navigate to="/dashboard" replace />
            },
            {
                path: 'login',
                element:<Login></Login>
            },
            {
                path: 'signup',
                element:<SignUp></SignUp>
            },
            {
                path: 'secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            }
        ]
    },
]);