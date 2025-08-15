import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

import PaintingCard from "./../components/PaintingCard";
import baseAxios from "../api";
import Loading from "./Loading";

const MyPaintings = () => {
  const { user } = useContext(AuthContext);
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    baseAxios
      .get(`/paintings/myPaintings/${user.email}`)
      .then((res) => {
        setPaintings(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching paintings:", err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">My Paintings</h2>

      {paintings.length === 0 ? (
        <p className="text-gray-500">You haven’t created any paintings yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paintings?.map((painting) => (
            <PaintingCard key={painting._id} painting={painting} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPaintings;
