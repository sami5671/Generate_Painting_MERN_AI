import React from "react";
import { Link } from "react-router-dom";

const PaintingCard = ({ painting }) => {
  // Download handler
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = painting?.url;
    link.download = painting?.title || "painting";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="relative hover:mt-2 transition-all duration-200 rounded-lg ">
      <img src={painting?.url} alt="" className="rounded-lg" />
      <div className="detail absolute transition-all duration-200 inset-0 w-full h-full hover:opacity-80  bg-stone-600 opacity-5 flex flex-col gap-3 justify-center items-center rounded-lg">
        <p className="text-xl text-center text-white m-3">{painting?.title}</p>
        <Link to={`/paintings/${painting?._id}`}>
          <button className="text-white">Details</button>
        </Link>
        <div className="m-4 flex items-center gap-3">
          <div className="">
            <img
              className="w-12 h-12 rounded-full"
              src={painting?.userImg}
              alt=""
            />
          </div>
          <div className="mt-2">
            <h1 className="text-white">
              <span className="text-orange-400 font-bold mr-1">
                Created By:
              </span>{" "}
              {painting?.name}
            </h1>
            <p className="text-white">
              {" "}
              <span className="text-orange-400 font-bold mr-1">
                Creation Time:
              </span>{" "}
              {painting?.createdAt
                ? new Date(painting?.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingCard;
