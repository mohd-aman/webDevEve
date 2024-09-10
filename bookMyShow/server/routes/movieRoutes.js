const router = require("express").Router();
const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

router.get("/get-all", getAllMovies);
router.post("/add", addMovie);
router.put("/update", updateMovie);
router.delete("/delete", deleteMovie);

module.exports = router;
