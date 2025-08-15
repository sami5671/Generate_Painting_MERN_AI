import { useContext, useState } from "react";
import Title from "../components/Title";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import baseAxios from "./../api/index";

const Generate = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const painting_types = [
    "Oil Painting",
    "Watercolor Painting",
    "Acrylic Painting",
    "Pastel Painting",
    "Gouache Painting",
    "Encaustic Painting",
    "Fresco Painting",
    "Impasto Painting",
    "Miniature Painting",
    "Abstract Painting",
    "Realistic/Representational Painting",
  ];

  const painting_categories = [
    "Colorful",
    "Black and White",
    "Monochromatic",
    "Landscape",
    "Portrait",
    "Still Life",
    "Abstract",
    "Impressionistic",
    "Surrealistic",
    "Realistic",
  ];

  const [activeCat, setActiveCat] = useState("");
  const [activeType, setActiveType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = e.target.prompt.value;

    if (!activeCat) {
      return Swal.fire("Error", "Please choose a category", "error");
    }
    if (!activeType) {
      return Swal.fire("Error", "Please choose a type", "error");
    }
    if (prompt.length < 10) {
      return Swal.fire("Error", "Add minimum 10-30 characters.", "error");
    }

    setLoading(true);
    baseAxios
      .post("/paintings/generate", {
        prompt,
        type: activeType,
        category: activeCat,
        email: user?.email,
        name: user?.displayName,
      })
      .then((res) => {
        if (res?.data?.insertedId) {
          Swal.fire("Great", "Painting generated", "success");
          navigate(`/paintings`);
          setLoading(false);
        }
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <Title>Generate Paintings</Title>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap mt-10 justify-center gap-2"
      >
        <input
          type="text"
          name="prompt"
          placeholder="What kind of painting do you need?"
          className="input input-bordered w-10/12"
        />
        <button className="bg-orange-500 px-4 py-2 text-white rounded">
          Generate
        </button>
      </form>

      {/* Dropdowns for Mobile / Small Screen */}
      <div className="grid md:grid-cols-2 gap-6 pt-10">
        {/* Category Dropdown */}
        <div>
          <h2 className="text-xl font-bold mb-2">Choose a Category</h2>
          <select
            value={activeCat}
            onChange={(e) => setActiveCat(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">-- Select Category --</option>
            {painting_categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Type Dropdown */}
        <div>
          <h2 className="text-xl font-bold mb-2">Choose a Type</h2>
          <select
            value={activeType}
            onChange={(e) => setActiveType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">-- Select Type --</option>
            {painting_types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Generate;
