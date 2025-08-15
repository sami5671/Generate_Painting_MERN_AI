const express = require("express");
const {
  generatePaint,
  getAllPaintings,
  getPaintingById,
} = require("../controllers/paintings.controller");
const router = express.Router();

router.post("/generate", generatePaint);
router.get("/allPaintings", getAllPaintings);
router.get("/:id", getPaintingById);
// router.post("/");

module.exports = router;
