import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import TableCard from "./TableCard";
import useAllPet from "../../../../hooks/useAllPet";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";




// const columnHelper = createColumnHelper()
const columnHelper = createColumnHelper()

const columns = [
    columnHelper.accessor('id', {
        cell: info => info.getValue(),
    }),

    // you can use different aproach here
    columnHelper.accessor(row => row.petName, {
        id: 'petName',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Pet Name</span>,
    }),
    columnHelper.accessor('petAge', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('petCategory', {
        cell: info => info.getValue().value,
    }),
    columnHelper.accessor('petImg', {
        cell: info => console.log(info.getValue().url),
    }),
    columnHelper.accessor('adoptStatus', {
        cell: info => console.log(info.renderValue()),
    }),
    columnHelper.accessor('PetName', {
        header: () => 'test',
        cell: info => info.renderValue(),
    })
]



const MyAddedPet = () => {


    const { user, isLoading } = useAuth()
    const [myPets, setMyPets] = useState([])

    const [allPets, , refetch] = useAllPet()

    console.log(myPets);
    useEffect(() => {
        if (user) {
            const mine = allPets?.filter(pet => pet.ownerEmail == user?.email)
            setMyPets(mine)
            refetch()
        }

    }, [allPets, user, refetch])




    return (
        <div>
            <div className="text-center">
                <SectionTitle subHeading={'My Pets'} heading={"All Added Pets"} darkMode={true} />
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
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Adoption Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myPets?.map((pet, idx) => <TableCard key={pet._id} pet={pet} serial={idx} />)
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MyAddedPet;