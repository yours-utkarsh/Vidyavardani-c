import React from "react";
import NavbarLinks from "../../data/Navbar-Link";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../asset/Logo/Logo-full-white.png";

const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    if(!route) return false;
    return matchPath({path:route}, location.pathname);
  }
  return (
   <div className='flex flex-row h-14 items-center justify-center border-b-[1px] border-b-richblack-700 mobile-menu-container relative'>
      <div className='flex flex-row w-11/12 max-w-maxContent items-center justify-between'>
        {/* image  */}
        <Link to="/">
          <img src={logo} width={160} height={42} loading="lazy" alt="logo" />
        </Link>

        {/* nav links */}
        <nav>
          <ul className=' hidden md:flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catagory" ? (
                  <div>

                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login/signup/dashboard  */}

        <div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
