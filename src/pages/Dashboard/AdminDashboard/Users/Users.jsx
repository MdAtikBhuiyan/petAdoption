import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const Users = () => {

    const axiosSecure = useAxiosSecure()

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    // console.log(users);

    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be admin",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make admin"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.patch('/users', { id: id, roleStatus: 'admin' })
                console.log(res.data);
                if (res.data.modifiedCount > 0) {

                    Swal.fire({
                        title: "Admin",
                        text: "user make admin successfully",
                        icon: "success"
                    });
                    // update user data
                    refetch();
                }

            }
        });
    }

    return (
        <div>
            <div className="text-center">
                <SectionTitle subHeading={'user'} heading={"All Users"} darkMode={true} />
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-8">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                Serial
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, idx) => (
                                <tr
                                    key={idx}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        {idx + 1}
                                    </td>
                                    <td className="w-4 p-4">
                                        {user?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.role}
                                    </td>
                                    <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-14 h-14 rounded-full" src={user?.img} alt="Jese image" />
                                    </th>

                                    <td className="px-6 py-4">
                                        <div className='flex gap-2 w-full'>

                                            <button
                                                onClick={() => handleMakeAdmin(user?._id)}
                                                className="text-white bg-secondary-bg font-title hover:bg-primary-bg focus:shadow-none font-medium rounded text-base px-3 py-1.5 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2">
                                                Make Admin
                                                <GrUserAdmin
                                                    className='text-xl font-bold cursor-pointer text-white'
                                                />
                                            </button>
                                            <button className="text-white bg-secondary-bg font-title hover:bg-primary-bg focus:shadow-none font-medium rounded text-base px-3 py-1.5 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2">
                                                Ban User
                                                <RiAdminLine
                                                    className='text-xl font-bold cursor-pointer text-white'
                                                />
                                            </button>
                                            {/* <RiDeleteBin5Fill
                                                onClick={handleDelete}
                                                className='text-xl font-bold cursor-pointer text-red-600' />

                                            <IoPersonAddSharp
                                                onClick={handleAdoptStatus}
                                                className='text-xl font-bold cursor-pointer text-green-600' /> */}



                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Users;