import React from 'react'
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import  { sidebarLinks } from "../../../data/Dashboard-Link"

const Sidebar = () => {
    const {  loading: authLoading } = useSelector((state) => state.auth);
  const { user ,loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        {/* links  */}
        <div>
            {
                sidebarLinks.map((link , index)=>{
                    if(link.type && user?.accountType !== link.type  ) return null;

                    return (
                        <SidebarLink link={link.path} iconName={link.icon} ></SidebarLink>
                    )

                })
            }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
