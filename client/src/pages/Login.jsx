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
    <div
      style={{ backgroundImage: "url(/bg.jpg)" }}
      className="bg-cover bg-center min-h-screen"
    >
      <div className="bg-contain ">
        <div className=" bg-white bg-opacity-60 min-h-screen flex justify-center items-center">
          <div className="w-11/12 md:w-1/2 lg:w-1/3 mx-auto py-10 m-5 p-5">
            <div className="title mt-5 text-center">
              <Title>Login Now</Title>
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
                <div className="space-y-1">
                  <div className="flex justify-start items-center">
                    <BiKey className="text-3xl text-slate-500" />
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                      type="password"
                      name="pass"
                      placeholder="Enter Password"
                    />
                  </div>
                  <p className="text-end text-[13px] text-slate-500">
                    Forgot password?
                  </p>
                </div>

                {/* Remember Me */}
                <div className="p-1 flex gap-3 -mt-4">
                  <input type="checkbox" name="remember" />
                  Remember Me
                </div>

                {/* Submit */}

                {loading ? (
                  <input value="Loading..." className="btn cursor-pointer" />
                ) : (
                  <input
                    type="submit"
                    value="Login Now"
                    className="btn cursor-pointer"
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
