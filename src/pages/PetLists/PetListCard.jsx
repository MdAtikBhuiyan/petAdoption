import { Link } from "react-router-dom";
import { IoMdTimer } from "react-icons/io";
import { IoLocation } from "react-icons/io5";

const PetListCard = ({ pet }) => {

    const { petImg, petName, petAge, petLocation, petShortDes, _id } = pet || {};

    console.log("imgggggg", petImg)

    return (
        <div className="max-w-lg mx-auto rounded-3xl shadow-md shadow-slate-300 px-10 py-4">
            <a href="#">
                <img className="rounded-full w-[300px] h-[300px] pt-2 mx-auto object-fill" src={petImg} alt="" />
            </a>
            <div className="p-5 w-full flex flex-col items-center text-center">

                <h5 className="mb-3 text-2xl md:text-3xl tracking-tight text-title-optioanl font-title font-extrabold capitalize">{petName}</h5>

                <p className="mb-2 text-sm font-bold text-title-optioanl capitalize flex justify-center items-center">
                    <span className="text-lg mr-1"><IoMdTimer /></span>
                    Age:
                    <span className="text-secondary-text font-semibold ml-2">{petAge}</span>
                </p>
                <p className="mb-2 text-sm font-bold text-title-optioanl capitalize flex justify-center items-center">
                    <span className="text-lg mr-1"><IoLocation /></span>
                    Location:
                    <span className="text-secondary-text font-semibold ml-2">{petLocation}</span>
                </p>
                {/* <p className="font-normal text-secondary-text text-sm">{petShortDes}</p> */}

                <Link to={`/petLists/${_id}`}>
                    <button
                        className="sign-in-btn mt-4 text-white bg-secondary-bg font-title hover:bg-primary-bg focus:shadow-none font-medium rounded text-base px-3 py-1.5 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2">
                        View Details
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </Link>

            </div>
        </div>

    );
};

export default PetListCard;