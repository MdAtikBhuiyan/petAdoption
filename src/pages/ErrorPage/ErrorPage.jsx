import { Link, useRouteError } from "react-router-dom";
import errorImg from '/images/error-page.png'

const ErrorPage = () => {

    const error = useRouteError();

    // console.log(location.pathname);


    return (
        <div className="h-screen flex flex-col items-center justify-center gap-4 text-center bg-theme-bg">

            <img src={errorImg} className="max-w-sm" alt="" />

            <div className="space-y-3">

                <p className="text-4xl uppercase italic text-red-600 font-semibold font-londrina">
                    {
                        error.status === 404 ? 'Page Not Found' : `${error.statusText}`
                    }
                </p>

                <p className="text-lg text-red-500 italic">{error.data}</p>
                <div className="flex justify-center mt-8">
                    <Link to='/'>
                        <button className="sign-in-btn text-white bg-secondary-bg font-title hover:bg-primary-bg focus:shadow-none font-medium rounded text-base px-3 py-1.5 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2">Go to home </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ErrorPage;