
import CommonBanner from "../../components/CommonBanner/CommonBanner";
import DontationCampCard from "./DontationCampCard";
import Container from "../../components/Container/Container";
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import useDonationCamp from "../../hooks/useDonationCamp";
import { useLocation } from "react-router-dom";

const DonationCampaign = () => {

    const location = useLocation()

    // common banner title
    const path = location.pathname.replace(/^\/+/, '');
    const title = path.replace(/([A-Z])/g, ' $1').trim()

    const pathName = location.pathname.replace(/\//g, 'Home | ')


    // data
    const [donationCamps, isLoading, refetch] = useDonationCamp()

    console.log(donationCamps);

    return (
        <div>

            <CommonBanner path={pathName} title={title} />

            <div className="text-center mt-12">
                <SectionTitle subHeading={'campaigns'} heading={"available all donation campaigns"} darkMode={true} />
            </div>
            <div className="my-14">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">

                        {
                            donationCamps.length ?
                                donationCamps?.map(camp => (
                                    <DontationCampCard key={camp._id} camp={camp} />
                                ))
                                :

                                "Loading .........."
                        }
                    </div>
                </Container>
            </div>

        </div>
    );
};

export default DonationCampaign;