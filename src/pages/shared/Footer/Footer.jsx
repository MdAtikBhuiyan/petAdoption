import Container from "../../../components/Container/Container";
import bgImg from '../../../../public/images/testimonial_bg.jpg'

const Footer = () => {
    return (


        <footer className="bg-secondary-bg pt-10 pb-6">
            <Container>
                <div>
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Flowbite</span>
                        </a>
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
                    <span className="block text-sm text-white sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
                </div>
            </Container>
        </footer>


    );
};

export default Footer;