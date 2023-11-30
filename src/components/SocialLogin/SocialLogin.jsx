import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {

    const { googleSignIn, githubSignIn } = useAuth()
    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate();
    const location = useLocation()
    const path = location.state?.from || '/';

    // google
    const handleGoogleSignIn = () => {
        // clear error message before click
        // setErrorMessage('');

        googleSignIn()
            .then(res => {

                // create user entry for database
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    img: res.user?.photoURL,
                    role: 'user'
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data?.insertedId) {
                            console.log("data insert done");
                        }
                        toast.success("Login successfully !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        navigate(path, { replace: true })
                    })
                    .catch(err => {
                        toast.error(`Oppss...${err.message}`, {
                            // position: toast.POSITION.TOP_RIGHT
                        });
                    })


            })
            .catch(err => {
                toast.error(`Oppss...${err.message}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    }


    // github
    const handleGithubSignIn = () => {
        // clear error message before click
        // setErrorMessage('');

        githubSignIn()
            .then(res => {

                console.log("gitgub", res);
                // create user entry for database
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    img: res.user?.photoURL,
                    role: 'user'
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data?.insertedId) {
                            console.log("data insert done");
                        }
                        toast.success("Login successfully !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        navigate(path, { replace: true })
                    })
                    .catch(err => {
                        toast.error(`Oppss...${err.message}`, {
                            // position: toast.POSITION.TOP_RIGHT
                        });
                    })

            })
            .catch(err => {
                toast.error(`Oppss...${err.message}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    }

    return (
        <div className="flex flex-wrap mb-8 items-center -mx-2">
            <div
                onClick={handleGoogleSignIn}
                className="w-full md:w-1/2 px-2 mb-3 md:mb-0">
                <a className="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-all duration-100 hover:bg-secondary-bg group" href="#">
                    <FcGoogle className='text-3xl' />
                    <span className="ml-4 text-sm font-semibold text-gray-500 group-hover:text-white">Login with Google</span>
                </a>
            </div>
            <div
                onClick={handleGithubSignIn}
                className="w-full md:w-1/2 px-2">
                <a className="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-all duration-100 hover:bg-secondary-bg group" href="#">
                    <FaGithub className='text-3xl' />
                    <span className="ml-4 text-sm font-semibold text-gray-500 group-hover:text-white">Login with GitHub</span>
                </a>
            </div>
        </div>
    );
};

export default SocialLogin;