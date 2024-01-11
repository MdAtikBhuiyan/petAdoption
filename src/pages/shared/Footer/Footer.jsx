import Container from "../../../components/Container/Container";
import bgImg from '../../../../public/images/testimonial_bg.jpg'
import { Link } from "react-router-dom";
import logo from '/images/logo.png'

const Footer = () => {
    return (


        <footer className="bg-secondary-bg pt-10 pb-6">
            <Container>
                <div>
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <Link to='/'>
                            <div className='flex gap-1 items-center'>
                                <img src={logo} className='max-h-10' alt="" />
                                <span className="self-center  font-extrabold font-title text-white text-base sm:text-2xl">
                                    Pet Adoption</span>
                            </div>
                        </Link>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-white sm:text-center dark:text-gray-400">© 2024 Md. Atik Bhuiyan All Rights Reserved.</span>
                </div>
            </Container>
        </footer>


    );
};

export default Footer;