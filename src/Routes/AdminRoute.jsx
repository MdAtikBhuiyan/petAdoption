import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {

    const { user, isLoading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    // console.log(isAdmin);

    if (isLoading || isAdminLoading) {
        return <span className="loading loading-spinner loading-lg text-center mx-auto mt-40"></span>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to={'/login'} state={{ from: location?.pathname }} replace />
};

export default AdminRoute;