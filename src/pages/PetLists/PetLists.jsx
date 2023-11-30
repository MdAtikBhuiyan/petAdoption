import { useLocation } from "react-router-dom";
import CommonBanner from "../../components/CommonBanner/CommonBanner";
import useAllPet from "../../hooks/useAllPet";
import Container from "../../components/Container/Container";
import { useEffect, useState } from "react";
import Select from 'react-select';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PetListCard from "./PetListCard";
import SectionTitle from "../../components/sectionTitle/sectionTitle";

const PetLists = () => {

    const location = useLocation()
    const axiosPublic = useAxiosPublic()

    console.log("pet list", location);

    // for common banner title 
    const path = location.pathname.replace(/^\/+/, '');
    const title = path.replace(/([A-Z])/g, ' $1').trim()

    const pathName = location.pathname.replace(/\//g, 'Home | ')


    const [selectedOption, setSelectedOption] = useState(null);


    // select category
    const options = [
        { value: '', label: 'All' },
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'rabbit', label: 'Rabbit' },
        { value: 'bird', label: 'Bird' },
        { value: 'fish', label: 'Fish' },
    ];


    // data fetching with their query


    // search text wise data render
    const handleSearch = (e) => {
        e.preventDefault();
        // setSearchText(e.target?.search?.value)
        const searchText = e.target?.search?.value
        axiosPublic.get(`/petLists?search=${searchText}`,)
            .then(res => {
                // console.log(res.data);
                setPetListShow(res.data)
                e.target.search.value = ''
            })
    }


    // all pets fetch
    // const [allPets, isLoading, refetch] = useAllPet();
    // differnt key wise data 
    const [petListShow, setPetListShow] = useState(
        location.state ? location.state.petsData : []
    )

    // category select wise data render
    useEffect(() => {

        const keyValue = selectedOption?.value || '';

        // if(keyValue){
        //     ''
        // }

        let url = `/petLists?petKey=${location.state?.category || keyValue}`;

        if (selectedOption?.label) {
            url = `/petLists?petKey=${keyValue}`
        }

        axiosPublic.get(url)
            .then(res => {
                // console.log(res.data);
                setPetListShow(res.data)

            })


    }, [selectedOption?.value, axiosPublic, location.state?.category, selectedOption?.label])



    console.log("all pets lists shoow", petListShow);


    return (
        <div>
            <CommonBanner path={pathName} title={title} />

            <div className="text-center mt-12">
                <SectionTitle subHeading={'Pet list'} heading={"available all pet lists"} darkMode={true} />
            </div>

            <Container>

                <div className="my-14">


                    <div className="w-full flex flex-wrap justify-between gap-4 mb-20">
                        <form
                            onSubmit={handleSearch}
                            className="min-w-[300px] mx-auto md:w-2/5 md:max-w-lg">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    name="search"
                                    type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-secondary-bg hover:bg-primary-bg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>

                        <div className="min-w-[300px] mx-auto md:w-2/5 md:max-w-lg">
                            <Select
                                id='petCategory'
                                name="petCategory"
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                isClearable={true}
                                isSearchable={false}

                            />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        {
                            petListShow.length ?
                                petListShow?.map(pet => (
                                    <PetListCard key={pet._id} pet={pet} />
                                ))
                                :

                                <div className="flex items-center">

                                    <h3 className="text-title-secondary text-lg font-bold">
                                        This category is not available,  Coming Soon...
                                    </h3>
                                </div>
                        }
                    </div>

                </div>


            </Container>


        </div>
    );
};

export default PetLists;