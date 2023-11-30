import React from 'react';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import useAllPet from '../../../../hooks/useAllPet';
import Swal from 'sweetalert2';
import { Tooltip } from 'flowbite-react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const TableCard = ({ pet, serial }) => {
    const { petName, petCategory, petImg, adoptStatus, _id } = pet || {};

    const [allPets, , refetch] = useAllPet()

    const axiosSecure = useAxiosSecure()
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

                const res = await axiosSecure.delete(`/allPets/${_id}`)
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


    const handleAdoptStatus = () => {

        Swal.fire({
            title: `${adoptStatus ? 'Is this now free?' : 'Is this now adopted?'}`,
            text: "Adopt status will be update ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const data = {
                    id: _id,
                    status: !adoptStatus,
                }

                const res = await axiosSecure.patch('/allPets', data)
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.success('Pet status has been updated.')
                    // update pet data
                    refetch()
                }

            }
        });

    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                {serial+1}
            </td>
            <td className="px-6 py-4">
                {petName}
            </td>
            <td className="px-6 py-4">
                {petCategory?.value}
            </td>
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-14 h-14 rounded-full" src={petImg} alt="Jese image" />
            </th>

            <td className="px-6 py-4 ">
                <span className={`w-fit p-2 ${adoptStatus ? 'text-green-600' : 'text-title-secondary'}`}>
                    {adoptStatus ? 'Adopted' : "Not Adopted"}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className='flex gap-2 w-full'>

                    <Link to='/dashboard/updatePet' state={{ signlePet: pet }}>
                        <FaRegEdit className='text-xl font-bold text-title-primary' />
                    </Link>
                    <RiDeleteBin5Fill
                        onClick={handleDelete}
                        className='text-xl font-bold cursor-pointer text-red-600' />

                    <IoPersonAddSharp
                        onClick={handleAdoptStatus}
                        className='text-xl font-bold cursor-pointer text-green-600' />



                </div>
            </td>
        </tr>
    );
};

export default TableCard;