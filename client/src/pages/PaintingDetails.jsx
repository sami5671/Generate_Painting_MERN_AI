import { useLoaderData } from "react-router-dom";
import downloading from "../assets/Downloading.json";
import Lottie from "lottie-react";
const PaintingDetails = () => {
  const data = useLoaderData();

  // Download handler
  const handleDownload = async () => {
    try {
      const response = await fetch(data?.url, { mode: "cors" });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = data?.title || "painting";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white/80 rounded-xl shadow-lg p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Image & Download */}
        <div className="flex gap-4">
          <img
            src={data?.url}
            alt={data?.title}
            className="w-full rounded-lg shadow-lg border-4 border-orange-200"
          />
        </div>

        {/* Details */}
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-orange-500">{data?.title}</h2>
          <div className="flex items-center gap-3">
            <img
              src={data?.userImg}
              alt={data?.name}
              className="w-14 h-14 rounded-full border-2 border-orange-400"
            />
            <div>
              <h3 className="font-semibold text-lg">
                <span className="text-orange-400">Created By:</span>{" "}
                {data?.name}
              </h3>
              <p className="text-gray-600">
                <span className="text-orange-400 font-semibold">Email:</span>{" "}
                {data?.email}
              </p>
              <p className="text-gray-600">
                <span className="text-orange-400 font-semibold">Created:</span>{" "}
                {data?.createdAt
                  ? new Date(data?.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
              Category: {data?.category}
            </span>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
              Type: {data?.type}
            </span>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
              Medium: {data?.medium_url ? "Available" : "N/A"}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-orange-400 mb-1">
              Prompt
            </h4>
            <p className="italic text-gray-500 font-mono">{data?.prompt}</p>
          </div>
          <div className="">
            <button
              onClick={handleDownload}
              className="flex items-center w-1/4 border-orange-200"
            >
              Download
              <span className="w-10">
                <Lottie animationData={downloading}></Lottie>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingDetails;
