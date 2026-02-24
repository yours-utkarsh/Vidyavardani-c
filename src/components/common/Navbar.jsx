import React, { useEffect, useState } from "react";
import NavbarLinks from "../../data/Navbar-Link";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../asset/Logo/Logo-full-white.png";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [sublinks, setSublinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing sublink result :", result);
      setSublinks(result.data.data);
    } catch {
      console.log("Could not able to Fetch data");
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex flex-row h-14 items-center justify-center border-b-[1px] border-b-richblack-700 mobile-menu-container relative">
      <div className="flex flex-row w-11/12 max-w-maxContent items-center justify-between">
        {/* image  */}
        <Link to="/">
          <img src={logo} width={160} height={42} loading="lazy" alt="logo" />
        </Link>

        {/* nav links */}
        <nav>
          <ul className=" hidden md:flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <IoIosArrowDown />
                    {/* full box  */}
                    <div
                      className={`invisible absolute left-[50%] 
                                    translate-x-[-49%] ${
                                      Array.isArray(sublinks) && sublinks.length
                                        ? "translate-y-[15%]"
                                        : "translate-y-[40%]"
                                    }
                                 top-[50%] z-50 
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]`}
                    >
                      {/* triangle box */}
                      <div
                        className="absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"
                      ></div>

                      {/* sublinks  */}
                      {
                       
                      }

                    </div>
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

        <div className="hidden md:flex gap-x-4 items-center text-white">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <IoCartOutline />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border  border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}

          {token != null && <ProfileDropdown />}
          
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuModalOpen(true)}
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      <HamburgerMenu isMenuModalOpen={isMenuModalOpen} setIsMenuModalOpen={setIsMenuModalOpen}>
        <div className="p-6">
          {/* Mobile Navigation Links */}

          

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-4 mt-8 border-t border-richblack-700 pt-6">
           

           

            {token != null && (
              <div onClick={() => setIsMenuModalOpen(false)}>
                <ProfileDropdown />
              </div>
            )}
          </div>

        </div>
      </HamburgerMenu>
    </div>
  );
};

export default Navbar;
