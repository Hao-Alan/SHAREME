import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

import { Sidebar, UserProfile } from "../components";
import logo from "../assets/logo.png";
import { client } from "../client";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { useRef } from "react";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [ToggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  // console.log("🚀 ~ file: Home.jsx:85 ~ Home ~ userInfo", userInfo);

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
      // console.log("🚀 ~ file: Home.jsx:93 ~ useEffect ~ query", query);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 transition-height">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>

      <div className="flex flex-col md:hidden  ">
        <div className=" flex flex-row  items-center justify-between shadow-md">
          <HiMenu
            fontSize={40}
            onClick={() => {
              setToggleSidebar(true);
            }}
            className="cursor-pointer mr-5"
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-40" />
          </Link>
          <Link to={`user-profile/${userInfo?.googleId}`}>
            <img src={userInfo?.imageUrl} alt="logo" className="w-28 ml-5" />
          </Link>
        </div>

        {ToggleSidebar && (
          <div className="w-5/6 h-screen fixed  animate-slide-in duration-500 overflow-y-auto shadow-md z-10">
            <div className="flex w-full absolute justify-end items-center  p-2 ">
              <AiFillCloseCircle
                fontSize={40}
                className="cursor-pointer"
                onClick={() => {
                  setToggleSidebar(false);
                }}
              />
            </div>

            {/* sidebar content  */}
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
