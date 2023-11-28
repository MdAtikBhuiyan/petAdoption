
import banner from '../../../public/images/homeBanner-1.jpg'

const CommonBanner = ({ title, path }) => {


    return (

        <div className="relative w-full before:absolute before:left-0 before:right-0 before:top-0 before:z-5 before:h-full before:w-full before:bg-[#121213] before:opacity-30">
            <img src={banner} alt="" className="h-[60vh] w-full object-cover" />

            <div className="absolute top-[50%] -translate-y-1/2 p-[10%]">

                <h3
                style={{clipPath: 'polygon(0 0, 100% 0, 91% 100%, 0% 100%)', padding: '13px 40px 13px 20px', borderRadius:'15px 15px 40px 15px'}}  
                className='font-title text-2xl md:text-4xl text-white font-extrabold bg-primary-bg w-fit capitalize'>
                    {title}
                </h3>
                <p className='text-white mt-4 font-semibold capitalize'>{path}</p>

            </div>

        </div>

    );
};

export default CommonBanner;