const { ObjectId } = require("mongodb");
const { db } = require("../utils/dbconnect");
const getImageData = require("../utils/getImageData");
const getImageUrl = require("../utils/getImageUrl");

const paintingCollection = db.collection("paintings");
const usersCollection = db.collection("users");

const generatePaint = async (req, res) => {
  const { body } = req || {};
  const { prompt, email, name, category, type } = body || {};
  const buffer = await getImageData(prompt);
  const imageData = await getImageUrl(buffer, prompt);

  const user = await usersCollection.findOne({ email: email });

  const data = {
    title: imageData?.data.title,
    prompt: prompt,
    name,
    email,
    category,
    type,
    thumb: imageData?.data?.thumb?.url,
    url: imageData?.data?.url,
    medium_url: imageData?.data.medium?.url,
    userImg: user?.photo,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await paintingCollection.insertOne(data);
  res.send(result);
};

const getAllPaintings = async (req, res) => {
  const paintings = await paintingCollection
    .find({})
    .sort({ _id: -1 }) // sort by newest first
    .toArray();

  res.send(paintings);
};

// get a single painting by id
const getPaintingById = async (req, res) => {
  const { id } = req.params;
  const painting = await paintingCollection.findOne({ _id: new ObjectId(id) });
  if (!painting) {
    return res.status(404).send({ message: "Painting not found" });
  }
  res.send(painting);
};

const getMyPaintings = async (req, res) => {
  const { email } = req.params; // FIXED: params instead of query
  const paintings = await paintingCollection
    .find({ email: email })
    .sort({ _id: -1 }) // newest first
    .toArray();

  res.send(paintings);
};

module.exports = {
  generatePaint,
  getAllPaintings,
  getPaintingById,
  getMyPaintings,
};
