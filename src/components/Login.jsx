import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logowhite.png";
import shareVideo from "../assets/share.mp4";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { googleId, imageUrl, name, email } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then((res) => {
      navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    gapi.load("auth2", () => {
      gapi.auth2.init({ client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID });
    });
  }, []);

  return (
    <div className=" h-screen flex flex-col justify-start items-center">
      <div className="w-full h-full relative">
        <video
          autoPlay
          src={shareVideo}
          type="video/mp4"
          loop
          muted
          controls={false}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-blackOverlay flex flex-col items-center justify-center">
          <div className="p-5">
            <img src={logo} alt="logo" style={{ width: "150px" }} />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="bg-white rounded-lg p-3 cursor-pointer outline-none flex items-center"
                >
                  <FcGoogle size={30} className="mr-3 items-center" /> Login
                  with Google
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
