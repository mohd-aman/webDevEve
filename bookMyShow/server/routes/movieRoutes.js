const router = require("express").Router();
const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getSingleMovie,
} = require("../controllers/movieController");

router.get("/get-all", getAllMovies);
router.get("/get/:id",getSingleMovie);
router.post("/add", addMovie);
router.put("/update", updateMovie);
router.put("/delete", deleteMovie);

module.exports = router;
