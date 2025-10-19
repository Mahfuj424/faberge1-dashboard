/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
// import { useSelector } from "react-redux";
// import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { RiNotificationFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full px-7 py-3.5 bg-white flex justify-between items-center  sticky top-0 left-0 z-10 shadow-lg rounded-lg">
      <div className="flex items-center gap-3 md:hidden">
        {/* Hamburger menu for mobile */}
        
      </div>
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-2xl font-semibold">Welcome Jemos</h1>
          <h2 className="text-lg">Have a Nice Day</h2>
        </div>

        <div className="flex items-center gap-8">
          <Link to={"/notification"}>
            <h1 className="relative  p-2 rounded-full bg-white">
              <IoNotificationsOutline className="size-8" />{" "}
            </h1>
          </Link>
          <h1 className="relative  p-2 rounded-full bg-white">
            <RxAvatar className="size-8" />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
