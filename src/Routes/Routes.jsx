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
import UpdatePets from "../pages/Dashboard/UserDashboard/UpdatePets/UpdatePets";
import CreateDonationCampaign from "../pages/Dashboard/UserDashboard/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaign from "../pages/Dashboard/UserDashboard/MyDonationCampaign/MyDonationCampaign";
import UpdateDonationCampaign from "../pages/Dashboard/UserDashboard/UpdateDonationCampaign/UpdateDonationCampaign";
import AdminHome from "../pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import Users from "../pages/Dashboard/AdminDashboard/Users/Users";
import AllPets from "../pages/Dashboard/AdminDashboard/AllPets/AllPets";
import AllDonations from "../pages/Dashboard/AdminDashboard/AllDonations/AllDonations";
import PetDetails from "../pages/PetDetails/PetDetails";
import DonationCampaign from "../pages/DonationCampaign/DonationCampaign";
import DonationCampaignDetails from "../pages/DonationCampaignDetails/DonationCampaignDetails";
import RecommendedDonations from "../pages/RecommendedDonations/RecommendedDonations";
import MyDonation from "../pages/Dashboard/UserDashboard/MyDonation/MyDonation";
import AdoptionRequest from "../pages/Dashboard/UserDashboard/AdoptionRequest/AdoptionRequest";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AboutUs from "../pages/Home/AboutUs/AboutUs";

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
                path: '/about',
                element: <AboutUs />
            },
            {
                path: '/petLists',
                element: <PetLists />
            },
            {
                path: '/petLists/:id',
                element: <PrivateRoute>
                    <PetDetails />
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://pet-adoption-server-bice.vercel.app/singlePet/${params.id}`)
            },
            {
                path: '/donationCamp',
                element: <DonationCampaign />,
            },
            {
                path: '/donationCamp/:id',
                element: <PrivateRoute>
                    <DonationCampaignDetails />
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://pet-adoption-server-bice.vercel.app/singleDonationCamp/${params.id}`)
            },
            {
                path: '/recommendedDonations',
                element: <RecommendedDonations />,
            },
        ]
    },

    // dashboard
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
        errorElement: 'hello error',
        children: [

            // user
            {
                path: 'userHome',
                element: <PrivateRoute>
                    <UserHome />
                </PrivateRoute>
            },
            {
                path: 'addPet',
                element: <PrivateRoute>
                    <AddPets />
                </PrivateRoute>
            },
            {
                path: 'MyAddedPet',
                element: <PrivateRoute>
                    <MyAddedPet />
                </PrivateRoute>
            },
            {
                path: 'updatePet',
                element: <PrivateRoute>
                    <UpdatePets />
                </PrivateRoute>
            },
            {
                path: 'createDonationCamp',
                element: <PrivateRoute>
                    <CreateDonationCampaign />
                </PrivateRoute>
            },
            {
                path: 'myDonationCamp',
                element: <PrivateRoute>
                    <MyDonationCampaign />
                </PrivateRoute>
            },
            {
                path: 'updateDonationCamp',
                element: <PrivateRoute>
                    <UpdateDonationCampaign />
                </PrivateRoute>
            },
            {
                path: 'myDonation',
                element: <PrivateRoute>
                    <MyDonation />
                </PrivateRoute>
            },
            {
                path: 'adoptRequest',
                element: <PrivateRoute>
                    <AdoptionRequest />
                </PrivateRoute>
            },

            // admin

            {
                path: 'adminHome',
                element: <AdminRoute>
                    <AdminHome />
                </AdminRoute>
            },
            {
                path: 'users',
                element: <AdminRoute>
                    <Users />
                </AdminRoute>
            },
            {
                path: 'allPets',
                element: <AdminRoute>
                    <AllPets />
                </AdminRoute>
            },
            {
                path: 'allDonations',
                element: <AdminRoute>
                    <AllDonations />
                </AdminRoute>

            },


        ]
    }
]);


export default router;