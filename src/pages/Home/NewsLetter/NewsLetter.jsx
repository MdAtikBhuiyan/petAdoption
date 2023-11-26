import Container from "../../../components/Container/Container";
import bgImg from '../../../../public/images/newsletter_bg.jpg'

const NewsLetter = () => {
    return (
        <div className="mt-16">
            <Container>

                <div style={{ backgroundImage: `url(${bgImg})` }} className="bg-no-repeat bg-cover bg-center py-20 w-full rounded-xl">
                    <div className="flex flex-wrap gap-8 px-10 md:px-20 items-center">
                        <div>
                            <h3 className="text-2xl md:text-4xl font-title font-extrabold text-white">Newsletter For</h3>
                            <p className="text-white mt-2">* Do Not Show Your Email.</p>
                        </div>
                        <div className="flex-1 flex gap-2">
                            <input
                                type="text"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0% 100%)', borderRadius: '10px 10px 35px 10px' }}
                                className="block w-full p-4 h-14 text-gray-900 border border-gray-300 bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" />
                            <button
                                className="text-title-secondary bg-white font-title hover:bg-secondary-bg hover:text-white focus:shadow-none text-xl p-4 h-14 min-w-[200px] font-extrabold me-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
                                style={{ clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)', borderRadius: '35px 10px 10px 10px' }}
                            >Subscribe</button>
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default NewsLetter;