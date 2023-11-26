import { Outlet } from "react-router-dom";
import Navbars from "../pages/shared/Navbar/Navbars";
import Footer from "../pages/shared/Footer/Footer";

const Main = () => {
    return (
        <div>
            <Navbars />

            <Outlet />

            <Footer />
        </div>
    );
};

export default Main;