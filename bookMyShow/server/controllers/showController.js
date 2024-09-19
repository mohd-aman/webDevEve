const showModel = require("../models/showModel");

const addShow = async (req, res) => {
  try {
    const newShow = await showModel(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "New Show has been added successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const deleteShow = async (req, res) => {
  try {
    await showModel.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show has been deleted successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const updateShow = async (req, res) => {
  try {
    const body = req.body;
    const showId = body.showId;
    const show = await showModel.findById(showId);

    Object.keys(body).forEach((key) => {
      if (key !== "id") show[key] = body[key];
    });
    await show.save();
    res.send({
      success: true,
      message: "Show has been updated successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getAllShowByTheatre = async (req, res) => {
  try {
    const shows = await showModel
      .find({ theatre: req.body.theatreId })
      .populate("movie");
    res.send({
      success: true,
      message: "All Shows have been fetched for theatre",
      data: shows,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getTheatreByMovie = async (req, res) => {
  try {
    const { movie, date } = req.body;
    const shows = await showModel
      .find({ movie: movie, date: date })
      .populate("theatre");
    //   [{noon show,pvr chennai},{morning show,pvr chennai},{morningshow, kolkata}]
    console.log(shows);
    const uniqueTheatres = [];
    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );
      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });
    res.send({
      success: true,
      message: "All theatre having shows for movies fetched successfully",
      data: uniqueTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getShowById = async (req, res) => {
  try {
    const show = await showModel
      .findById(req.body.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "Show has been fetched",
      data: show,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addShow,
  deleteShow,
  updateShow,
  getAllShowByTheatre,
  getShowById,
  getTheatreByMovie
};
