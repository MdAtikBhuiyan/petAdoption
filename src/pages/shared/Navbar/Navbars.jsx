
import Container from '../../../components/Container/Container';
import useAuth from '../../../hooks/useAuth';
import Theme from '../../../theme/Theme';
import headerBg from '/images/header_shape.png'
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar, Dropdown } from 'flowbite-react';
import { HiLogout, HiViewGrid } from 'react-icons/hi';
import useAdmin from '../../../hooks/useAdmin';

import logo from '../../../../public/images/logo.png'

const Navbars = () => {

    const { user, isLoading, logOut } = useAuth();
    const [isAdmin] = useAdmin()

    const navLinks = <>

        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/petLists'>Pet Listing</NavLink>
        </li>
        <li>
            <NavLink to='/donationCamp'> Donation
                Campaigns</NavLink>
        </li>
        <li>
            <NavLink to='/about'>About Us</NavLink>
        </li>
        {
            <>
                {
                    user && !isAdmin && <li>
                        <NavLink to='/dashboard/userHome'>Dashboard</NavLink>
                    </li>
                }
                {
                    user && isAdmin && <li>
                        <NavLink to='/dashboard/adminHome'>Dashboard</NavLink>
                    </li>
                }

            </>
        }

    </>

    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success("Logout successfully !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(err => {
                toast.error(`Oppss...${err.message}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    }

    // console.log(!isLoading);
    return (
        <div className='sticky top-0 z-50'>

            <div className='relative z-20 shadow-2xl'>

                <nav className="bg-[#fff] overflow-hidden pt-6 pb-4">
                    <Container>
                        <div className="flex flex-wrap items-center justify-between">


                            <Link to='/'>
                                <div className='flex gap-1 items-center'>
                                    <img src={logo} className='max-h-10' alt="" />
                                    <span className="self-center  font-extrabold font-title text-title-secondary text-base sm:text-2xl">
                                        Pet Adoption</span>
                                </div>
                            </Link>

                            <div className="flex items-center gap-2 lg:order-2 md:space-x-0 rtl:space-x-reverse">

                                {

                                    user ?
                                        <Dropdown
                                            arrowIcon={false}
                                            inline
                                            label={
                                                <Avatar alt="User settings" img={user?.photoURL} rounded />
                                            }
                                        >
                                            <Dropdown.Header className='text-center'>
                                                <span className="block text-base text-title-primary font-bold font-title capitalize">{user?.displayName}</span>
                                                <span className="block text-sm  text-gray-600 truncate dark:text-gray-400">{user?.email}</span>
                                            </Dropdown.Header>


                                            <Dropdown.Item icon={HiViewGrid}>
                                                <>
                                                    {
                                                        user && !isAdmin && <li>
                                                            <NavLink to='/dashboard/userHome'>Dashboard</NavLink>
                                                        </li>
                                                    }
                                                    {
                                                        user && isAdmin && <li>
                                                            <NavLink to='/dashboard/adminHome'>Dashboard</NavLink>
                                                        </li>
                                                    }

                                                </>
                                            </Dropdown.Item>


                                            <Dropdown.Item
                                                onClick={handleSignOut}
                                                icon={HiLogout}
                                            >
                                                Sign out
                                            </Dropdown.Item>
                                        </Dropdown>
                                        :
                                        <Link to='/login'>
                                            <button className="sign-in-btn text-white bg-secondary-bg font-title hover:bg-primary-bg focus:shadow-none font-medium rounded text-base px-3 py-1.5 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2">Sign in </button>
                                        </Link>
                                }


                                <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                </button>
                                <Theme />

                            </div>
                            <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="navbar-user">
                                <ul className="navItem flex flex-col text-base md:text-center text-right py-6 font-medium lg:p-0 mt-6 border border-gray-100 rounded-lg bg-gray-50 space-y-6 lg:space-x-2 lg:space-y-0 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 md:bg-white">
                                    {
                                        navLinks
                                    }
                                </ul>
                            </div>

                        </div>
                    </Container>
                </nav>


                <div className='absolute left-0 -bottom-2 md:-bottom-4 -z-10'>
                    <img className='w-full' src={headerBg} alt="" />
                </div>
            </div>


        </div>
    );
};

export default Navbars;