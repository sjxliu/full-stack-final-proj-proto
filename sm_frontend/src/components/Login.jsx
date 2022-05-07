import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import openingVid from "../assets/Volley.mp4";
import logo from "../assets/volley-logo.png";
import { client } from "../client";

export default function Login() {
  const navigate = useNavigate();
  // remember to call all imported tools

  const responseGoogle = (res) => {
    localStorage.setItem("user", JSON.stringify(res.profileObj));

    const { name, googleId, imageUrl } = res.profileObj;

    const doc = {
      // contains same fields created in schema
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      Login
      <div className="relative w-full h-full">
        <video
          src={openingVid}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="300px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN_ID}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-white flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  // google login logic
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
