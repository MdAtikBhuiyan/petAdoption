import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllPet = (query) => {

    // console.log('all pet hook', query);

    // const email = query.email ? query.email : '';
    // const adoptStatus = query.adoptStatus ? '' : query.adoptStatus;
    // const category = query.category ? query.category : '';
    // const searchText = query.searchText ? query.searchText : ''
    // console.log("all", email, adoptStatus, category, searchText);

    // let url = `/allPets?email=${email}`
    // if (!adoptStatus && category && searchText) {
    //     url = `/allPets?email=${email}&adoptStatus=${adoptStatus}&category=${category}&searchText=${searchText}`
    // }
    // else if (!adoptStatus && category) {
    //     url = `/allPets?adoptStatus=${adoptStatus}&category=${category}`
    // }
    // else if (!adoptStatus && searchText) {
    //     url = `/allPets?adoptStatus=${adoptStatus}&searchText=${searchText}`
    // }
    // else if (!adoptStatus) {
    //     url = `/allPets?adoptStatus=${adoptStatus}`
    // }


    const axiosSecure = useAxiosSecure();
    const email = query?.email ? query.email : '';

    const { data: allPets = [], isPending: isLoading, refetch } = useQuery({
        queryKey: ['a'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allPets?email=${email}`)
            return res.data;
        }
    })

    return [allPets, isLoading, refetch]

};

export default useAllPet;