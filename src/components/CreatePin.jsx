import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { MdDelete } from "react-icons/md";
import { AiOutlineCloudUpload, AiOutlineUpload } from "react-icons/ai";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {
  console.log("🚀 ~ file: CreatePin.jsx:4 ~ CreatePin ~ user", user);

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  //TODO: add validation
  const [wrongImageType, setWrongImageType] = useState(false);
  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e?.target?.files[0];
    if (
      type === "image/jpeg" ||
      type === "image/png" ||
      type === "image/jpg" ||
      type === "image/gif" ||
      type === "image/svg" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", e?.target?.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: CreatePin.jsx:35 ~ uploadImageFail ~ error",
            error
          );
        });
    } else {
      setLoading(true);
      setWrongImageType(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 ">
      {fields && (
        <p className="text-red-500  text-xl transition-all duration-500 ease-in ">
          please fill all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-2 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-2 w-full h-420 ">
            {loading && <Spinner />}
            {wrongImageType && <p className="text-red-500">wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg"> Click to upload</p>
                    <p className="mt-32 text-gray-400">
                      Use high-quality JPG, SVG, PNG, GIF or TIFF less than 20MB
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </div>
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="upload-pic"
                  className="w-full h-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => {
                    setImageAsset(null);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e?.target?.value)}
            placeholder="Add your title here"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img
                src={user.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e?.target?.value)}
            placeholder="Add your pin about "
            className="outline-none text-base sm:text-lg font-bold border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e?.target?.value)}
            placeholder="Add your destination link "
            className="outline-none text-base sm:text-lg font-bold border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div className="mb-2 font-semibold text-lg sm:text-xl">
              <p>Choose Pin category</p>
              <select
                onChange={(e) => {
                  setCategory(e?.target?.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 r Dounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option value="other" className="bg-white">
                    Select Category
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
