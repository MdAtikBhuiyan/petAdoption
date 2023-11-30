import { useLocation } from "react-router-dom";
import CommonBanner from "../../components/CommonBanner/CommonBanner";
import useDonationCamp from "../../hooks/useDonationCamp";
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import Container from "../../components/Container/Container";
import DontationCampCard from "../DonationCampaign/DontationCampCard";

const RecommendedDonations = () => {

    const location = useLocation()

    // common banner title
    const path = location.pathname.replace(/^\/+/, '');
    const title = path.replace(/([A-Z])/g, ' $1').trim()

    const pathName = location.pathname.replace(/\//g, 'Home | ');

    // console.log(location);

    const [donationCamps, isLoading, refetch] = useDonationCamp()

    const othersCamp = donationCamps.filter(camp => camp._id !== location.state?.campaignID)

    return (
        <div>

            <CommonBanner path={pathName} title={title} />

            <div className="text-center mt-12">
                <SectionTitle subHeading={'campaigns'} heading={"available for donations"} darkMode={true} />
            </div>
            <div className="my-14">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">

                        {
                            isLoading ?

                                "Loading .........."
                                :
                                othersCamp?.map(camp => (
                                    <DontationCampCard key={camp._id} camp={camp} />
                                ))

                        }
                    </div>
                </Container>
            </div>

        </div>
    );
};

export default RecommendedDonations;