import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { urlFor, client } from "../client";
import { fetchUser } from "../utils/fetchUser";

const PinDemo = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const user = fetchUser();

  const { destination, image, postedBy, _id, save } = pin;

  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user.googleId
  )?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  console.log("🚀 ~ file: PinDemo.jsx:4 ~ PinDemo ~ pin", pin);
  const navigate = useNavigate();

  return (
    <div>
      <div
        onMouseEnter={() => {
          setPostHovered(true);
        }}
        onMouseLeave={() => {
          setPostHovered(false);
        }}
        onClick={() => {
          navigate(`/pin-detail/${_id}`);
        }}
        className="cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="relative">
          <img
            src={urlFor(image).width(250).url()}
            alt="user-post"
            className="rounded-lg w-full"
          />
          {postHovered && (
            <div
              className="absolute flex top-0 bottom-0 w-full h-full flex-col justify-between  p-1 pr-2 pt-2 pb-2 z-50  "
              style={{ height: "100%" }}
            >
              <div className="flex justify-between items-center ">
                <div className="flex gap-2">
                  <a
                    href={`${image?.asset?.url}?dl=`}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-9 h-9 p-1 rounded-full opacity-75 m-1 text-black hover:opacity-100 hover:shadow-md outline-none items-center justify-center flex"
                  >
                    <MdDownloadForOffline />
                  </a>
                </div>
                {alreadySaved !== 0 ? (
                  <button
                    type="button"
                    className="bg-red-500 opacity-75 text-white font-bold px-5 py-1 text-base rounded-2xl hover:shadow-md hover:opacity-100 outline-none "
                  >
                    {save?.length} Saved
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                    type="button"
                    className="bg-red-500 opacity-75 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md hover:opacity-100 outline-none "
                  >
                    Save
                  </button>
                )}
              </div>
              <div className="flex justify-between items-center gap-2 w-full">
                {destination && (
                  <a
                    href={destination}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white flex items-center justify-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 "
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BsFillArrowUpRightCircleFill />
                    {destination.length > 21
                      ? destination.slice(8, 21)
                      : destination.slice(8)}
                  </a>
                )}

                {postedBy?._id === user.googleId && (
                  <button
                    className="bg-white opacity-75 text-black font-bold p-2 text-base rounded-full hover:shadow-md hover:opacity-100 outline-none "
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(_id);
                    }}
                  >
                    <AiTwotoneDelete />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default PinDemo;
