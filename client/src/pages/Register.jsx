import googleAnimation from "../assets/google.json";
import Lottie from "lottie-react";
import Title from "../components/Title";
import {
  BiEnvelope,
  BiImageAdd,
  BiKey,
  BiRename,
  BiUser,
} from "react-icons/bi";

import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../api/utils";
import { saveUser } from "../api/auth";
import toast from "react-hot-toast";
import baseAxios from "../api";

const Register = () => {
  const goTo = useNavigate();
  const { createUser, signIn, user, setUser, updateUser, googleSignIn } =
    useContext(AuthContext);

  const [uploadButtonText, setUploadButtonText] = useState(
    "Upload Profile Picture"
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const password = form.pass.value;
    setLoading(true);
    try {
      // upload image
      const imageData = await imageUpload(image);

      console.log(imageData?.data?.url);
      // user registration
      const result = await createUser(email, password);
      console.log(result);
      // update user profile with name and photo
      await updateUser({
        displayName: name,
        photoURL: imageData?.url,
      });

      // save user info into the database directly here
      const currentUser = {
        name: name,
        email: email,
        photo: imageData?.data?.url,
        firebaseUserId: result.user.uid,
      };
      console.log(currentUser);

      await baseAxios.put(`/auth/register/${email}`, currentUser);

      setUploadButtonText("Upload Profile Picture");
      toast.success("SignUp Successful");
      setLoading(false);
      goTo("/generate");
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  // google sign in
  const handleGoogleSignIn = async () => {
    try {
      // user registration with google
      const result = await googleSignIn();

      // save user info into the database directly here
      const currentUser = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        photo: result?.user?.photoURL,
        firebaseUserId: result?.user?.uid,
      };

      await baseAxios.put(`/auth/register/${currentUser?.email}`, currentUser);

      toast.success("SignUp Successful");
      setLoading(false);
      goTo("/generate");
      // ----------------------------------------------------------------
    } catch (err) {
      toast.error(err?.message);
    }
  };
  // ----------------------------------------------------------------
  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };
  return (
    <div
      style={{ backgroundImage: "url(/bg.jpg)" }}
      className="bg-cover bg-center min-h-screen"
    >
      <div className="bg-white bg-opacity-60 min-h-screen flex justify-center items-center">
        <div className="w-11/12 md:w-1/2 lg:w-1/3 mx-auto py-8 m-5 p-5">
          <div className="title mt-5 text-center">
            <Title>Join with Us</Title>
          </div>

          <div className="login-for mt-8">
            {/* Google Login */}
            <div className="flex flex-col justify-center items-center">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center"
              >
                Continue With Google
                <span className="w-8">
                  <Lottie animationData={googleAnimation}></Lottie>
                </span>
              </button>
            </div>

            <div className="flex justify-center items-center my-5">
              <p className="font-bold mb-2 text-xl">Or,</p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
            >
              {/* Name */}
              <div className="flex justify-start items-center">
                <BiUser className="text-3xl text-slate-500" />
                <input
                  className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                  type="text"
                  name="name"
                  placeholder="Enter Full Name"
                />
              </div>

              {/* Email */}
              <div className="flex justify-start items-center">
                <BiEnvelope className="text-3xl text-slate-500" />
                <input
                  className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                />
              </div>

              {/* Password */}
              <div className="flex justify-start items-center">
                <BiKey className="text-3xl text-slate-500" />
                <input
                  className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                  type="password"
                  name="pass"
                  placeholder="Enter Password"
                />
              </div>

              {/* File Upload */}
              <div className="flex justify-start items-center">
                <div className="bg-white w-full m-auto rounded-lg">
                  <div className="file_upload px-5 py-3 relative border-2 border-orange-300 border-dashed rounded-lg">
                    <div className="flex flex-col w-max mx-auto text-center">
                      <label>
                        <input
                          onChange={(e) => handleImageChange(e.target.files[0])}
                          className="text-sm cursor-pointer w-36 hidden"
                          type="file"
                          name="image"
                          id="image"
                          accept="image/*"
                          hidden
                        />
                        <div className="bg-orange-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-orange-700">
                          {uploadButtonText}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              {loading ? (
                <input value="Loading..." className="btn cursor-pointer" />
              ) : (
                <input
                  type="submit"
                  value="Register"
                  className="btn cursor-pointer"
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
