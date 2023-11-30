import React from 'react';
import useDonationCamp from '../../../../hooks/useDonationCamp';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaUsers } from 'react-icons/fa';
import { MdOutlineMotionPhotosPause } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllDonationTable = ({ serial, donationCamp }) => {
    const { petName, maxDonation, lastDate, dCampShortDes, dCampLongDes, dCampImg, pauseStatus, _id } = donationCamp || {};

    const axiosSecure = useAxiosSecure()
    const [, , refetch] = useDonationCamp()

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

    const handleDelete = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/donationCamps/${_id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    // update pet data
                    refetch();

                }

            }
        });


    }



    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                {serial + 1}
            </td>
            <td className="px-6 py-4">
                {petName}
            </td>
            <td className="px-6 py-4">
                {maxDonation}
            </td>

            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-14 h-14 rounded-full" src={dCampImg} alt="Jese image" />
            </th>
            <td className="px-6 py-4">
                progess will be added
            </td>
            <td className="px-6 py-4 text-xs">


                {
                    pauseStatus ? <span className='text-white bg-red-500 rounded p-2 py-1'>
                        Pause
                    </span> : <span className='text-white bg-green-500 rounded p-2 py-1'>
                        Running
                    </span>
                }
            </td>
            {/* <td className="px-6 py-4 ">
            <span className={`w-fit p-2 ${adoptStatus ? 'text-green-600' : 'text-title-secondary'}`}>
                {adoptStatus ? 'Adopted' : "Not Adopted"}
            </span>
        </td> */}
            <td className="px-6 py-4">
                <div className='flex gap-2 w-full'>

                    <Link to='/dashboard/updateDonationCamp' state={{ signleCamp: donationCamp }}>
                        <FaRegEdit className='text-xl font-bold text-title-primary' />
                    </Link>
                    <MdOutlineMotionPhotosPause
                        onClick={handlePauseStatus}
                        className='text-2xl font-bold text-title-primary' />
                    <RiDeleteBin5Fill
                        onClick={handleDelete}
                        className='text-xl font-bold cursor-pointer text-red-600' />

                </div>
            </td>
        </tr>
    );
};

export default AllDonationTable;