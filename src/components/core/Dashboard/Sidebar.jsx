import React from "react";
import { useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/Dashboard-Link";
import SidebarLink from "./SidebarLink";
import Spinner from "../../common/Spinner";

const Sidebar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile,
  );

  if (authLoading || profileLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-richblack-800 ">
      <div className="flex flex-col w-fit md:min-w-[220px] min-h-[calc(100vh-3.5rem)] border-r border-richblack-700 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && link.type !== user?.accountType) return null;

            return <SidebarLink key={link.id} data={link}></SidebarLink>;
          })}
        </div>

        <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700"></div>

        <div>
          <Sidebar
            data={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: "VscSettingsGear",
            }}
          />
        </div>
        
        

      </div>
    </div>
  );
};

export default Sidebar;
