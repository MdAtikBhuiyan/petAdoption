
import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Inspiration from "./Inspiration/Inspiration";
import NewsLetter from "./NewsLetter/NewsLetter";


const Home = () => {
    return (
        <div className="mb-16">
            <Banner />
            <Category />
            <Inspiration />
            <AboutUs />
            <NewsLetter />
        </div>
    );
};

export default Home;