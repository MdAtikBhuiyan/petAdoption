
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useDonationCamp = () => {
    const axiosPublic = useAxiosPublic()

    const { data: donationCamps = [], isPending: isLoading, refetch } = useQuery({
        queryKey: ['dontion-camp'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donationCamps')
            return res.data;
        }
    })

    return [donationCamps, isLoading, refetch]
};

export default useDonationCamp;