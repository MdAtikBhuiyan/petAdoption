import { Link, NavLink, Outlet } from "react-router-dom";
import Navbars from "../pages/shared/Navbar/Navbars";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaBars } from "react-icons/fa6";

const Dashboard = () => {

    const [showMenu, setShowMenu] = useState(true)
    console.log(showMenu);
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(window.matchMedia('(max-width: 767px)').matches);


    const navLinks = <>

        <MenuItem component={<NavLink to='/dashboard/addPet' />}>
            Add a pet
        </MenuItem>
        <MenuItem component={<NavLink to='/dashboard/myAddedPet' />}>
            My Added Pet
        </MenuItem>
        <MenuItem component={<NavLink to='/dashboard/adoptRequest' />}>
            Adoption Request
        </MenuItem>
        <MenuItem component={<NavLink to='/dashboard/createDonationCamp' />}>
            Create Donation Campaign
        </MenuItem>
        <MenuItem component={<NavLink to='/dashboard/myDonationCamp' />}>
            My Donation Campaigns
        </MenuItem>
        <MenuItem component={<NavLink to='/dashboard/myDonation' />}>
            My Donations
        </MenuItem>

    </>

    return (
        <div>
            <Navbars />

            <div>



                {broken && (
                    <button className="pt-8 p-4" onClick={() => setToggled(!toggled)}>
                        <FaBars className="text-2xl text-title-optioanl" />
                    </button>
                )}

                <div className={` ${toggled ? '' : 'hidden'} fixed py-0 top-0 pt-20 md:pt-28 md:block left-0 z-40 w-60 h-screen bg-secondary-bg shadow-xl dashboard-sidebar`}>
                    <Sidebar toggled={toggled} onBackdropClick={() => setToggled(false)} customBreakPoint="767px" onBreakPoint={setBroken}>
                        <Menu className="py-4 bg-secondary-bg text-base text-white">
                            {navLinks}
                        </Menu>
                    </Sidebar>
                </div>

                <div className="mt-8 md:ml-64 p-4 md:pr-4">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        <Outlet />
                    </div>
                </div>


            </div>


        </div>
    );
};

export default Dashboard;