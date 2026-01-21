import React from "react";
import { useSelector } from "react-redux";

const MyProfile = ({}) => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="bg-richblack-900 text-white mx-0 md:mx-5">

      {/* heading  */}
      <h1 className="font-medium text-richblack-5 text-3xl mb-7 md:mb-14">
        My Profile
      </h1>

      {/* first box  */}
      <div className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-8 px-3 md:px-12">
        <div className="flex flex-row gap-x-2 md:gap-x-4 items-center">
          <img
            src={user?.image}
            alt={`profile- ${user?.firstName}`}
            className="aspect-square w-[60px] md:w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>

          <IconBtn />
        </div>

      </div>

      {/* second box */}

    </div>
  );
};

export default MyProfile;
