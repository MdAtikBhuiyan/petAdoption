
import img1 from '../../../../public/images/about-1.jpeg';
import img2 from '../../../../public/images/about-2.jpeg';
import img3 from '../../../../public/images/about-3.jpeg';
import img4 from '../../../../public/images/about-4.jpeg';

import Container from '../../../components/Container/Container';
import pawImg from '../../../../public/images/pawprint.png'

const AboutUs = () => {
    return (
        <div className='my-16'>
            <Container>
                <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
                    <div className="md:w-1/2 mx-auto">
                        <div className="md:mr-0">
                            <div className="flex flex-wrap md:w-3/5 mx-auto justify-center -m-4">
                                <div className="w-1/2 p-4">
                                    <div className="flex flex-wrap">
                                        <div className="mb-8 w-full">
                                            <img className="w-full rounded-2xl" src={img1} alt="" />
                                        </div>
                                        <div className="w-full">
                                            <img className="w-full rounded-2xl" src={img2} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/2 p-4">
                                    <div className="flex flex-wrap mt-24">
                                        <div className="mb-8 w-full">
                                            <img className="w-full rounded-2xl" src={img3} alt="" />
                                        </div>
                                        <div className="w-full">
                                            <img className="w-full rounded-2xl" src={img4} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <p className="text-title-secondary font-bold text-lg mb-4">About Us</p>
                        <h3 className="text-title-optioanl text-2xl md:text-4xl font-extrabold font-title capitalize">
                            What we do to  <span className="text-title-secondary">Protect</span> <br /> animals
                        </h3>
                        <p className="text-secondary-text mt-4">captures the harmonious essence of welcoming a new furry friend into your life. It's a celebration of the heartwarming moments that unfold when compassion meets companionship. From the initial connection at the shelter to the shared joy of discovering each others quirks, this title paints a vivid picture of the transformative journey of pet adoption.</p>

                        <ul className='mt-8 space-y-3'>
                            <li className='flex items-center gap-2'>
                                <img src={pawImg} alt="" className='w-6' />
                                <span className='text-secondary-text'>The domestic dog is a domesticated</span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <img src={pawImg} alt="" className='w-6' />
                                <span className='text-secondary-text'>Empowering Responsible Pet Ownership</span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <img src={pawImg} alt="" className='w-6' />
                                <span className='text-secondary-text'>Transparency in Adoption Process</span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <img src={pawImg} alt="" className='w-6' />
                                <span className='text-secondary-text'>Building Lifelong Connections</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </Container>

        </div>
    );
};

export default AboutUs;