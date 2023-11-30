import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import useAuth from "../../../../hooks/useAuth";
import { MdOutlineAdsClick } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdoptionRequest = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    const { data: adoptRequestPets = [], isPending: isLoading, refetch } = useQuery({
        queryKey: ['a'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adoptionRequests?email=${user?.email}`)
            return res.data;
        }
    })

    console.log("request pet", adoptRequestPets);

    const handleAdoptStatus = (id, status, petId) => {
        Swal.fire({
            title: `Are you sure`,
            text: "Accept the adopt request ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const data = {
                    id: id,
                    changeRequest: (status.toLowerCase() == 'reject') || (status.toLowerCase() == 'pending') ? 'accept' : 'reject',
                    petId: petId
                }
                console.log("dataaaa", data);
                const res = await axiosSecure.patch('/adoptionRequests', data)
                console.log(res.data);
                if (res.data.adoptResult.modifiedCount > 0) {
                    toast.success('Request status has been updated.')
                    // update data
                    refetch()
                }

            }
        });
    }

    return (
        <div>
            <div className="text-center">
                <SectionTitle subHeading={'adoption request'} heading={"My All requests"} darkMode={true} />
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-8">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                Serial
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Pet Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pet Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pet Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Requestor Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adoptRequestPets?.map((pet, idx) => (
                                <tr
                                    key={pet?._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        {idx + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        {pet?.requestedPet?.petName}
                                    </td>
                                    <td className="px-4 py-3">
                                        {pet?.requestedPet?.petCategory?.value}
                                    </td>

                                    <td className="px-4 py-3 ">
                                        <span className={`w-fit p-2 ${pet?.requestStatus != 'pending' ? 'text-green-600' : 'text-title-secondary'}`}>
                                            {/* {pet?.requestStatus == 'confirmed' ? 'Accepted' : "Reject"} */}
                                            {pet?.requestStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {pet?.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        {pet?.email}
                                    </td>
                                    <td className="px-4 py-3">
                                        {pet?.phone}
                                    </td>
                                    <td className="px-4 py-3">
                                        {pet?.address}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className='flex gap-2 w-full'>

                                            {/* <IoPersonAddSharp
                                                onClick={handleAdoptStatus}
                                                className='text-xl font-bold cursor-pointer text-green-600' /> */}
                                            <button
                                                onClick={() => handleAdoptStatus(pet?._id, pet?.requestStatus, pet?.petId)}
                                                className="flex gap-2 text-sm font-bold text-title-primary capitalize">
                                                {pet?.requestStatus} <MdOutlineAdsClick className="text-xl" />
                                            </button>


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

export default AdoptionRequest;