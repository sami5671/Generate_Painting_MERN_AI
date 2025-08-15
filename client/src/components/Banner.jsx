import animation from "../assets/Artist.json";

import Lottie from "lottie-react";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <section
      className="bg-contain bg-fixed"
      style={{ backgroundImage: "url(/bg.jpg)" }}
    >
      <div
        id="banner"
        className="flex min-h-screen bg-white bg-opacity-50 flex-col-reverse md:flex-row items-center justify-around "
      >
        <div className="text space-y-4  text-center md:text-start mb-16 lg:mb-0">
          <h1 className="text-5xl font-bold">
            Create Your <span className="text-orange-400"> Paintings </span>
            using <span className="text-orange-400">GenAI</span>,
          </h1>
          <div className=" max-w-[520px] md:rounded-full p-2 bg-orange-400 text-white">
            <marquee direction="right">
              Join our community of artists and unleash your creativity!
              Discover the power of AI in art creation and share your
              masterpieces with the world.
            </marquee>
          </div>

          <h2 className="text-3xl">Build in a best way</h2>
          <div className="buttons flex gap-3 justify-center md:justify-start">
            <Link to="/registration">
              <button className=" ">Join Now</button>
            </Link>
            {/* <button className=" ">See More</button> */}
          </div>
        </div>
        <div className="max-w-[500px] ">
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
