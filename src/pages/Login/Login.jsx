
import bannerImg from '../../../public/images/login.png'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Login = () => {


    const { googleSignIn, logIn } = useAuth()

    const navigate = useNavigate();
    const location = useLocation()
    // console.log("login", location);
    const path = location.state?.from || '/';

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

        logIn(data?.email, data?.password)
            .then(res => {
                navigate('/')
                toast.success("Login successfully !", {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate(path, { replace: true })
            })

    }



    return (
        <section className="relative py-20 2xl:py-10 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-1/2 px-4 order-last lg:order-first">
                            <div className="relative max-w-lg mx-auto lg:mx-0 lg:max-w-2xl h-full">
                                <img className="block w-full h-142 sm:h-full object-cover rounded-5xl" src={bannerImg} alt="" />
                                <div className="absolute bottom-0 w-full left-0 h-full flex items-center justify-center p-10">
                                    <div className="max-w-md mx-auto">
                                        <h4 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white font-bold mb-8">Sign in to your account</h4>
                                        <div className="md:flex mb-20">
                                            <div className="mb-6 md:mb-0 md:mr-8 pt-3 text-gray-600">
                                                <svg width="84" height="10" viewBox="0 0 84 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75L1 4.25ZM84 5.00001L76.5 0.669879L76.5 9.33013L84 5.00001ZM1 5.75L77.25 5.75001L77.25 4.25001L1 4.25L1 5.75Z" fill="#FAFBFC"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-200">Greetings on your return! We kindly request you to enter your details.</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                            <div className="max-w-lg lg:pt-8 2xl:pt-24 lg:pb-8 mx-auto 2xl:mr-0">
                                <h3 className="text-5xl sm:text-6xl text-title-optioanl font-bold mb-12">Welcome Back</h3>

                                {/* <div className="flex flex-wrap mb-8 items-center -mx-2">
                                    <div
                                        onClick={handleGoogleSignIn}
                                        className="w-full md:w-1/2 px-2 mb-3 md:mb-0">
                                        <a className="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-all duration-100 hover:bg-secondary-bg group" href="#">
                                            <FcGoogle className='text-3xl' />
                                            <span className="ml-4 text-sm font-semibold text-gray-500 group-hover:text-white">Login with Google</span>
                                        </a>
                                    </div>
                                    <div className="w-full md:w-1/2 px-2">
                                        <a className="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-all duration-100 hover:bg-secondary-bg group" href="#">
                                            <FaGithub className='text-3xl' />
                                            <span className="ml-4 text-sm font-semibold text-gray-500 group-hover:text-white">Login with GitHub</span>
                                        </a>
                                    </div>
                                </div> */}

                                <SocialLogin />

                                <div className="flex mb-8 items-center">
                                    <div className="w-full h-px bg-gray-300"></div>
                                    <span className="mx-4 text-sm font-semibold text-gray-500">Or</span>
                                    <div className="w-full h-px bg-gray-300"></div>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-6">
                                        <label className="block mb-1.5 text-sm font-semibold text-title-optioanl" >Email</label>
                                        <input
                                            name='email'
                                            {...register("email", { required: true })}
                                            className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded-lg "
                                            type="email"
                                            placeholder="Enter email" />
                                        {errors.email && <span className="text-red-600">Email is required</span>}
                                    </div>
                                    <div className="mb-7">
                                        <label className="block mb-1.5 text-sm font-semibold text-title-optioanl" >Password</label>
                                        <input
                                            name='password'
                                            {...register("password", { required: true })}
                                            className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded-lg "
                                            type="password"
                                            placeholder="Enter password" />
                                        {errors.password && <span className="text-red-600">Password is required</span>}
                                    </div>

                                    <button
                                        className="relative group block w-full py-3 px-5 text-center text-base font-semibold font-title text-orange-50 bg-secondary-bg rounded-full overflow-hidden hover:bg-primary-bg transition-all"
                                        type="submit">
                                        Sign In
                                    </button>

                                </form>

                                <div className="text-center mt-8">
                                    <span className="text-sm font-semibold text-title-optioanl">
                                        <span>Don’t have an account?</span>
                                        <Link to='/register'>
                                            <span className='inline-block ml-1 text-title-secondary italic text-base hover:underline'>Sign Up</span>
                                        </Link>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;