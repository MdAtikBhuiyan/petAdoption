
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineMotionPhotosPause } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useDonationCamp from '../../../../hooks/useDonationCamp';
import { Line, Circle } from 'rc-progress';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const CampTableCard = ({ serial, donationCamp }) => {

    const { petName, maxDonation, lastDate, dCampShortDes, dCampLongDes, dCampImg, donatedAmount, pauseStatus, _id } = donationCamp || {};

    const [openModal, setOpenModal] = useState(false);

    const axiosSecure = useAxiosSecure()
    const [, , refetch] = useDonationCamp()

    const [progressPercent, setProgressPercent] = useState(0)

    useEffect(() => {
        const completionPercentage = (donatedAmount / maxDonation) * 100;
        setProgressPercent(completionPercentage)
    }, [maxDonation, donatedAmount])

    const handlePauseStatus = () => {

        Swal.fire({
            title: `${pauseStatus ? 'Do you unpause this camp?' : 'Do you pause this camp?'}`,
            text: "pause status will be update ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const data = {
                    id: _id,
                    status: !pauseStatus,
                }

                const res = await axiosSecure.patch('/donationCamps', data)
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.success('pause status has been updated.')
                    // update pet data
                    refetch()
                }

            }
        });

    }


    const [allDonators, setDonators] = useState([])
    const [totalDonatedAmount, setTotalDonatedAmount] = useState(null)

    const handleViewDonators = async () => {
        const res = await axiosSecure.get(`/userDonations?campId=${_id}`)
        console.log("res", res);
        if (res) {
            setOpenModal(true)
            setDonators(res.data?.result)
            setTotalDonatedAmount(res.data.totalDonatedAmount)
        }
    }



    return (
        <>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    {serial + 1}
                </td>
                <td className="px-6 py-4">
                    {petName}
                </td>
                <td className="px-6 py-4">
                    ${maxDonation}
                </td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <Line percent={progressPercent} strokeWidth={4} strokeColor="#0a303a" trailWidth={3} />
                </th>

                {/* <td className="px-6 py-4 ">
                <span className={`w-fit p-2 ${adoptStatus ? 'text-green-600' : 'text-title-secondary'}`}>
                    {adoptStatus ? 'Adopted' : "Not Adopted"}
                </span>
            </td> */}

                <td className="px-6 py-4 text-xs">


                    {
                        pauseStatus ? <span className='text-white bg-red-500 rounded p-2 py-1'>
                            Pause
                        </span> : <span className='text-white bg-green-500 rounded p-2 py-1'>
                            Running
                        </span>
                    }
                </td>

                <td className="px-6 py-4">
                    <div className='flex gap-2 w-full'>

                        <Link to='/dashboard/updateDonationCamp' state={{ signleCamp: donationCamp }}>
                            <FaRegEdit className='text-xl font-bold text-title-primary' />
                        </Link>
                        <MdOutlineMotionPhotosPause
                            onClick={handlePauseStatus}
                            className='text-2xl font-bold text-title-primary' />
                        <FaUsers
                            onClick={handleViewDonators}
                            className='text-2xl font-bold text-title-primary' />
                    </div>
                </td>
            </tr>

            <Modal dismissible size={'5xl'} show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    Total Donations: ${totalDonatedAmount ? totalDonatedAmount : 0}
                </Modal.Header>
                <Modal.Body>


                    {
                        allDonators.length ?
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Transaction ID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Donation amount
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            allDonators?.map(donator => (
                                                <tr
                                                    key={donator._id}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                                    <td className="px-6 py-4">
                                                        {donator.name}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {donator.email}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {donator.transactionId}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        ${donator.donatedAmount}
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                            :

                            <div className="text-center">
                                <h3 className="text-title-secondary text-4xl font-extrabold font-title">Have not any Donators</h3>
                                <p className="text-lg text-title-secondary">This campaign is not get any donator till now...</p>
                            </div>
                    }

                </Modal.Body>
                <Modal.Footer>

                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>



        </>


    );
};

export default CampTableCard;