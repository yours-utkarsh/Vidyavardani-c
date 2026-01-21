import React from "react";
import * as Icons from "react-icons/vsc";
import { matchPath, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ data }) => {
  const Icon = Icons[data.icon];
  const location = useLocation();

  const matchRoute = (linkPath) => {
    return matchPath({ path: linkPath }, location.pathname);
  };

  return (
    <NavLink
      to={data.path}
      className={` relative flex  gap-x-2 items-center text-sm font-medium px-3 md:px-8 py-2 cursor-pointer transition-all duration-200  ${matchRoute(data.path) ? "text-yellow-50 bg-yellow-800" : "text-richblack-300"}`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${matchRoute(data.path) ? " opacity-100 " : "opacity-0"}`}
      ></span>

      
        <Icon className="text-lg" />
        <p className="hidden md:block uppercase tracking-wider">{data.name}</p>
      
    </NavLink>
  );
};

export default SidebarLink;
