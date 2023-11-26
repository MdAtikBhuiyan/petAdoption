
import Container from '../../../components/Container/Container';
import Theme from '../../../theme/Theme';
import headerBg from '/images/header_shape.png'
import { NavLink } from 'react-router-dom';

const Navbars = () => {

    const navLinks = <>

        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/petList'>Pet Listing</NavLink>
        </li>
        <li>
            <NavLink to='/donationCamp'> Donation
                Campaigns</NavLink>
        </li>
        <li>
            <NavLink to='/about'>About Us</NavLink>
        </li>
        <li>
            <NavLink to='/contact'>Contact</NavLink>
        </li>

    </>

    return (
        <div className='sticky top-0 z-50'>

            <div className='relative z-20 shadow-2xl'>

                <nav className="bg-[#fff] overflow-hidden py-6">
                    <Container>
                        <div className="flex flex-wrap items-center justify-between">
                            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                            </a>
                            <div className="flex items-center gap-1 lg:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                                </button>
                                {/* <!-- Dropdown menu --> */}
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                                <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                </button>
                                <Theme />
                            </div>
                            <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="navbar-user">
                                <ul className="flex flex-col md:text-center text-right md:py-2 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 space-y-6 lg:space-x-4 lg:space-y-0 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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