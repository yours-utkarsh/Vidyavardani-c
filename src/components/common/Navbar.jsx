import React, { useEffect, useState } from "react";
import NavbarLinks from "../../data/Navbar-Link";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../asset/Logo/Logo-full-white.png";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import ProfileDropdown from "../core/Auth/ProfileDropdown"
import { IoIosArrowDown } from "react-icons/io";


const Navbar = () => {
  const {token} = useSelector((state) => state.auth )  
  const {user} = useSelector((state) => state.profile ) 
  const {totalItems} = useSelector((state) => state.cart ) 
  const location = useLocation();

  const [sublinks , setSublinks] = useState([]);

  const fetchSublinks = async()=>{
    try{
      const result = await apiConnector("GET" , categories.CATEGORIES_API)
      console.log("printing sublink result :" ,result)
      setSublinks(result.data.data);
    }
    catch{
      console.log("Could not able to Fetch data")
    }
  }

  useEffect(() => {
    fetchSublinks();
  }, [])

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
                    <p>{link.title}</p>
                    <IoIosArrowDown />
                    <div>
                      {/* full box  */}
                      <div>
                        {/* triangle box */}
                        
                      </div>
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

       <div className='hidden md:flex gap-x-4 items-center'>
            
            {
              user && user?.accountType !== "Instructor" && (
               <Link to="/dashboard/cart" className="relative">
               <IoCartOutline />
                  {
                    totalItems >0 && (
                      <span>
                        {totalItems}
                      </span>
                    )
                  }
               </Link>

              )
            }

            {
                token === null && (
                    <Link to="/login">
                        <button className='border  border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
           

            {
              token != null && (
                <ProfileDropdown/>
              )
            }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
