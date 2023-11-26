
import { Link } from 'react-router-dom';
import banner1 from '/public/images/homeBanner-1.jpg'
import banner from '/public/images/home-banner.jpg'
import paImg from '../../../../public/images/w_pawprint.png'

// const homeBannerInfo = [
//     {
//         id: 1,
//         img: '',
//         title: 'Best friend with happy time',
//         description: 'Human Shampoo on Dogs After six days of delirat, the jury found Hernandez guilty of first-degree murder',
//     }
// ]

const Banner = () => {
    return (

        <div>
            <div className="relative w-full before:absolute before:left-0 before:right-0 before:top-0 before:z-5 before:h-full before:w-full before:bg-[#121213] before:opacity-30">
                <img src={banner} alt="" className="h-[75vh] w-full object-cover" />

                <div className="absolute top-[50%] -translate-y-1/2 p-[10%]">

                    <h3 className='font-title text-3xl md:text-6xl text-white font-extrabold'>
                        Best friend <span className='text-shape'>with</span> <br /> happy time
                    </h3>
                    <p className='text-white my-6'>Human Shampoo on Dogs After six days of delirat, the jury found <br /> Hernandez guilty of first-degree murder</p>
                    <button className="text-white bg-primary-bg font-title hover:bg-secondary-bg focus:shadow-none font-medium rounded text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2">
                        View more <img src={paImg} className='w-6' alt="" />
                    </button>

                </div>

            </div>
        </div>

    );
};

export default Banner;