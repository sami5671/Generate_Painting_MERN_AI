import Lottie from "lottie-react";
import Title from "../components/Title";
import happy from "../assets/happy.json";
import { BiEnvelope, BiKey } from "react-icons/bi";
import Social from "../components/Social";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { data } from "autoprefixer";
import googleAnimation from "../assets/google.json";
import loginAnimation from "../assets/loginAnimation.json";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import baseAxios from "../api";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    signIn(email, pass)
      .then((res) => {
        const user = res.user;
        if (user) {
          toast.success("Login Successful");
          navigate(`${location.state ? location.state : "/"}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      navigate(`${location.state ? location.state : "/"}`);
      // ----------------------------------------------------------------
    } catch (err) {
      toast.error(err?.message);
    }
  };
  return (
    <div className=" bg-[url(/bg.png)] bg-contain ">
      <div className=" bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10 m-5 p-5  ">
          <div className="title mt-5">
            <Title>Login Now</Title>
          </div>

          <div className="flex  justify-between items-center gap-5 pt-8">
            <div className="login-for flex-1">
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
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
              >
                <div className="flex justify-start items-center">
                  <div className="">
                    <BiEnvelope className="text-3xl text-slate-500"></BiEnvelope>
                  </div>
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                    type="email"
                    name="email"
                    placeholder="enter email"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-start items-center">
                    <div className="">
                      <BiKey className="text-3xl text-slate-500"></BiKey>
                    </div>
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all  duration-200"
                      type="password"
                      name="pass"
                      placeholder="enter Password"
                    />
                  </div>
                  <p className="text-end text-[13px] text-slate-500">
                    forgot password?{" "}
                  </p>
                </div>

                <div className=" p-1 flex gap-3 -mt-4">
                  <input type="checkbox" name="remember me" className="" />
                  Remember Me
                </div>

                <input
                  type="submit"
                  value="Login Now"
                  className="btn cursor-pointer"
                />
              </form>
            </div>

            <div className="lottie  flex-1 mx-20">
              <Lottie animationData={loginAnimation} loop={true}></Lottie>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
