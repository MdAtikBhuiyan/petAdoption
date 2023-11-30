import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import useAllPet from "../../../../hooks/useAllPet";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import TableCard from "../../UserDashboard/MyAddedPet/TableCard";


const AllPets = () => {


    const axiosPublic = useAxiosPublic()


    // const { data = [], error, isPending: isLoading, refetch } = useQuery({
    //     queryKey: ['a'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/allPets')
    //         return res.data;
    //     }
    // })

    const [allPets, refetch] = useAllPet()

    console.log(allPets);



    return (
        <div>

            <div className="text-center">
                <SectionTitle subHeading={'Pets'} heading={"All Pets"} darkMode={true} />
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
                            allPets?.map((pet, idx) => <TableCard key={pet._id} pet={pet} serial={idx} />)
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllPets;