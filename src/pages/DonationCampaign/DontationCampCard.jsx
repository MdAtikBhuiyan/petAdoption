import { Link } from "react-router-dom";


const DontationCampCard = ({ camp }) => {
    const { dCampImg, petName, maxDonation, donatedAmount, _id } = camp || {};

    return (
        <div className="max-w-lg rounded-xl shadow-md shadow-slate-300">

            <img className="rounded-xl h-[300px] object-fill w-full pt-2" src={dCampImg} alt="" />

            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl text-title-secondary font-title font-extrabold capitalize">{petName}</h5>
                </a>
                <p className="mb-2 text-sm font-bold text-title-optioanl capitalize">
                    Max Donation:
                    <span className="text-secondary-text font-semibold ml-2">${maxDonation}</span>
                </p>
                <p className="mb-6 text-sm font-bold text-title-optioanl capitalize">
                    Donated Amount:
                    <span className="text-secondary-text font-semibold ml-2">${donatedAmount}</span>
                </p>

                <Link to={`/donationCamp/${_id}`}>
                    <button
                        className="sign-in-btn text-white bg-secondary-bg font-title hover:bg-primary-bg focus:shadow-none font-medium rounded text-base px-3 py-1.5 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2">
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

export default DontationCampCard;