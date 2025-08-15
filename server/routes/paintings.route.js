const express = require("express");
const {
  generatePaint,
  getAllPaintings,
  getPaintingById,
  getMyPaintings,
} = require("../controllers/paintings.controller");
const router = express.Router();

router.post("/generate", generatePaint);
router.get("/allPaintings", getAllPaintings);
router.get("/:id", getPaintingById);
router.get("/myPaintings/:email", getMyPaintings);
// router.post("/");

module.exports = router;
