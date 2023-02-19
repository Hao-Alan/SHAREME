import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  // console.log("🚀 ~ file: Sidebar.jsx:8 ~ Sidebar ~ user", user);

  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition duration-300 ease-in-out capitalize";

  const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2  transition duration-300 ease-in-out capitalize";

  const categories = [
    { name: "Animals" },
    { name: "Wallapapers" },
    { name: "Photography" },
    { name: "Gaming" },
    { name: "Coding" },
  ];
  return (
    <div className="flex flex-col justify-between bg-white h-full min-w-210 ">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center "
          onClick={() => {
            handleCloseSidebar();
          }}
        >
          <img src={logo} alt="logo" className="w-full " />
        </Link>

        <div className="flex flex-col gap-5 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <RiHomeFill className="w-6 h-6" />
            <span className="text-xl font-semibold">Home </span>
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category, index) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              key={category.name}
              onClick={handleCloseSidebar}
            >
              {category.name}
            </NavLink>
          ))}

          <NavLink
            to="/about"
            className="flex items-center px-5 gap-2 my-6 pt-1 w-190 items-center"
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <IoIosArrowForward className="w-6 h-6" />
            <span className="text-xl font-semibold">About</span>
          </NavLink>
        </div>
      </div>
      {user && (
        <div>
          <Link
            to={`user-profile/${user._id}`}
            className="flex my-5 mb-3 p-2 items-center gap-2 bg-white rounded-lg shadow-lg hover:shadow-lg"
            onClick={handleCloseSidebar}
          >
            <img
              src={user.image}
              alt="user-profile"
              className="w-10 h-10 rounded-full"
            />
            <p>{user.userName}</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
