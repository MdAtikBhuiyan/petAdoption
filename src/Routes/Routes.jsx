import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PetLists from "../pages/PetLists/PetLists";
import Dashboard from "../layout/Dashboard";
import UserHome from "../pages/Dashboard/UserDashboard/UserHome/UserHome";
import AddPets from "../pages/Dashboard/UserDashboard/AddPets/AddPets";
import MyAddedPet from "../pages/Dashboard/UserDashboard/MyAddedPet/MyAddedPet";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: "hello eror",
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/petLists',
                element: <PetLists />
            },
        ]
    },

    // dashboard
    {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: 'hello error',
        children: [
            {
                path: 'userHome',
                element: <UserHome />
            },
            {
                path: 'addPet',
                element: <AddPets />
            },
            {
                path: 'MyAddedPet',
                element: <MyAddedPet />
            },
        ]
    }
]);


export default router;