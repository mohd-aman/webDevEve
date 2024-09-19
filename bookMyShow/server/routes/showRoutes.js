const {
  addShow,
  deleteShow,
  updateShow,
  getAllShowByTheatre,
  getShowById,
  getTheatreByMovie,
} = require("../controllers/showController");

const router = require("express").Router();

router.post("/add", addShow);
router.post("/get-all-shows-by-theatre", getAllShowByTheatre);
router.put("/update", updateShow);
router.put("/delete", deleteShow);
router.post("/get-all-theatres-by-movie",getTheatreByMovie);
router.post("/get-show-by-id", getShowById);

module.exports = router;
