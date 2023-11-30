import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = (enabled = true) => {

    const { user, isLoading } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        // enabled: enabled,
        enabled: !isLoading && !!user?.email,
        queryFn: async () => {
            console.log('asking or checking is admin', user)
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            return res?.data?.isAdmin;
        }
    })

    return [isAdmin, isAdminLoading]

};

export default useAdmin;