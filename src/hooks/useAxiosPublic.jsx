import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-adoption-server-bice.vercel.app',
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;