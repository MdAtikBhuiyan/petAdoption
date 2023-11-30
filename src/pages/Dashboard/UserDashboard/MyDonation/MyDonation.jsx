
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyDonation = () => {

    const { user, isLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: myDonations = [], isPending, refetch } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            console.log("object", user, user?.email, isLoading);
            if (!isLoading) {
                const res = await axiosSecure.get(`/myDonations?email=${user ? user?.email : ''}`)
                return res.data;
            }
        }
    })


    console.log("my donations", myDonations);

    const handleRefundDonation = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "Refund the donated amount",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Refund"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/userDonations?id=${id}`)
                console.log(res);
                if (res.data?.deletedCount > 0) {
                    // reload my donation data
                    refetch()
                    toast.success("Donation refund successfully...")
                }

            }
        });



    }


    return (
        <div>
            <div className="text-center">
                <SectionTitle subHeading={'Donation'} heading={"My All Donations"} darkMode={true} />
            </div>


            {
                myDonations.length ?

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Pet Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Pet Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Donated Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ask For Refund
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                    myDonations?.map(donation => (
                                        <tr
                                            key={donation._id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                            <td className="px-6 py-4">
                                                <img className="w-14 h-14 rounded-full" src={donation?.donationCamps?.dCampImg} alt="Jese image" />
                                            </td>
                                            <td className="px-6 py-4">
                                                {donation?.donationCamps?.petName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {donation?.donatedAmount}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleRefundDonation(donation?._id)}
                                                    className="flex gap-2 items-center text-title-primary text-sm font-bold">
                                                    Refund  <HiMiniReceiptRefund className="text-title-secondary text-xl" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="text-center">
                        <h3 className="text-title-secondary text-4xl font-extrabold font-title">Have not any Donation</h3>
                        <p className="text-lg text-title-secondary">You are not donating in any donations campaigns......</p>
                    </div>
            }




        </div>
    );
};

export default MyDonation;