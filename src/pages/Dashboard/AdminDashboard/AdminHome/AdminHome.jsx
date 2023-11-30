import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import useAuth from "../../../../hooks/useAuth";

const AdminHome = () => {

    const { user } = useAuth()

    return (
        <div className="pb-14">
            <div className="text-center">
                <SectionTitle subHeading={'dashboard'} heading={"Admin Dashboard"} darkMode={true} />
            </div>
            <div className="text-center mt-4">
                <h3 className="text-2xl text-title-optioanl font-bold">Welcome, 
                    <span className="text-lg font-normal">{user?.displayName}</span>
                </h3>
            </div>
        </div>
    );
};

export default AdminHome;