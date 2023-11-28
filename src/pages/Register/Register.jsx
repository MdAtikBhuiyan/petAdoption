import bannerImg from '../../../public/images/login.png'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const img_hosting_key = '6a80da543bb68bd15c9684b27eb2988d';
const img_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_key}`

const Register = () => {

    const { signUp, googleSignIn, updateUserProfile } = useAuth()
    const axiosPublic = useAxiosPublic()

    // const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    // handle registration form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        // image hosting
        const photo = {
            image: data?.photo[0]
        }
        const res = await axiosPublic.post(img_hosting_api, photo, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })

        const photoUrl = res.data?.data?.display_url;
        // console.log(res.data, photoUrl);

        // create an account at firebase and send user to database
        if (res.data?.success) {

            signUp(data.email, data.password)
                .then(res => {
                    // console.log(res);
                    // add name and phot
                    updateUserProfile(data.name, photoUrl)
                        .then(() => {
                            // console.log("user updated succesfully");

                            // create user entry for database
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                role: 'user'
                            }
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    console.log(res.data);
                                    if (res.data?.insertedId) {
                                        navigate('/')
                                        toast.success("Login successfully !", {
                                            position: toast.POSITION.TOP_RIGHT
                                        });
                                    }
                                })
                                .catch(err => {
                                    toast.error(`Oppss...${err.message}`, {
                                        position: toast.POSITION.TOP_RIGHT
                                    });
                                })

                        })
                        .catch(err => {
                            toast.error(`Oppss...${err.message}`, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        })
                })
                .catch(err => {
                    toast.error(`Oppss...${err.message}`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })


        }
        // reset()
    }


    return (
        <section className="relative py-20 2xl:py-10 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-1/2 px-4 order-last lg:order-first">
                            <div className="relative max-w-lg mx-auto lg:mx-0 lg:max-w-2xl h-full">
                                <img className="block w-full md:h-142 object-cover rounded-5xl" src={bannerImg} alt="" />
                                <div className="absolute bottom-0 w-full left-0 h-full flex items-center justify-center p-10">
                                    <div className="max-w-md mx-auto">
                                        <h4 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white font-bold mb-8">Create an new account</h4>
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
                            <div className="max-w-lg lg:pt-2 2xl:pt-4 lg:pb-8 mx-auto 2xl:mr-0">
                                <h3 className="text-5xl sm:text-6xl text-title-optioanl font-bold mb-10">SIgn Up</h3>

                                <SocialLogin />

                                <div className="flex mb-6 items-center">
                                    <div className="w-full h-px bg-gray-300"></div>
                                    <span className="mx-4 text-sm font-semibold text-gray-500">Or</span>
                                    <div className="w-full h-px bg-gray-300"></div>
                                </div>

                                {/* form */}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-6">
                                        <label className="block mb-1.5 text-sm font-semibold text-title-optioanl" >Name</label>
                                        <input
                                            name='name'
                                            {...register("name", { required: true })}
                                            className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded-lg "
                                            type="text"
                                            placeholder="Enter email" />
                                        {errors.name && <span className="text-red-600">Name is required</span>}
                                    </div>
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
                                            {...register('password', {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 20,
                                                pattern: /^(?=.*[A-Z])(?=.*[\W_])(?=.*[a-z])/

                                            })}
                                            className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded-lg "
                                            type="password"
                                            placeholder="Enter password" />
                                        {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                        {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 character</span>}
                                        {errors.password?.type === 'maxLength' && <span className="text-red-600">Password less than or equal 20 character</span>}
                                        {errors.password?.type === 'pattern' && <span className="text-red-600">Password must be 1 uppercase, lowercase and special character</span>}
                                    </div>


                                    <div className="w-full mb-8">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-2 pb-4">
                                                <svg className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload photo</span></p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or JPEG </p>
                                            </div>
                                            <input
                                                {...register("photo", { required: true })}
                                                id="dropzone-file" type="file" className="max-w-[220px] pb-2" />
                                        </label>
                                        {errors.photo && <span className="text-red-600">Photo selecting is required</span>}
                                    </div>


                                    <button
                                        className="relative group block w-full py-3 px-5 text-center text-base font-semibold font-title text-orange-50 bg-secondary-bg rounded-full overflow-hidden hover:bg-primary-bg transition-all"
                                        type="submit">
                                        Sign Up
                                    </button>

                                </form>

                                <div className="text-center mt-8">
                                    <span className="text-sm font-semibold text-title-optioanl">
                                        <span>Already have an account?</span>
                                        <Link to='/login'>
                                            <span className='inline-block ml-1 text-title-secondary italic text-base hover:underline'>Sign in</span>
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

export default Register;