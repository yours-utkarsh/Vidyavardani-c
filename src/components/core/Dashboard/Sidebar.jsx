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
    <div>
      <div>
        {/* links  */}
        <div>
          {sidebarLinks.map((link, index) => {
            if (link.type && user?.accountType !== link.type) return null;

            return (
              <SidebarLink
                key={link.id}
                link={link.path}
                iconName={link.icon}
              ></SidebarLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
