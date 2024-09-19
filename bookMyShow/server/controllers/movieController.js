const MovieModel = require("../models/movieModel");

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await MovieModel.find();
    res.send({
      success: true,
      message: "All Movies have been fetched successfully",
      data: allMovies,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const body = req.body;
    const movieId = body.id;
    const movie = await MovieModel.findById(movieId);

    Object.keys(body).forEach((key) => {
      if (key !== "id") movie[key] = body[key];
    });
    await movie.save();
    res.send({
      success: true,
      message: "Movie has been updated successfully",
      data: movie,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.body.id;
    console.log(req.body);
    await MovieModel.findByIdAndDelete(movieId);
    res.send({
      success: true,
      message: "Movie has been deleted successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const addMovie = async (req, res) => {
  try {
    const newMovie = await MovieModel(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "New Movie has been added successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getSingleMovie = async (req,res)=>{
    try{
        const movie = await MovieModel.findById(req.params.id);
        res.send({
            success:true,
            message:"Movie fetched successfully",
            data:movie,
        })

    }catch(err){
        res.send({
            success:false,
            message:err.message,
        })
    }
}

module.exports = {
  getAllMovies,
  updateMovie,
  deleteMovie,
  addMovie,
  getSingleMovie
};
