const theatreModel = require("../models/theatreModel");

const addTheatre = async (req, res) => {
  try {
    const newTheatre = new theatreModel(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre saved successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const updateTheatre = async (req, res) => {
  try {
    const body = req.body;
    const theatreId = body.id;
    const theatre = await theatreModel.findById(theatreId);

    Object.keys(body).forEach((key) => {
      if (key !== "id") theatre[key] = body[key];
    });
    await theatre.save();
    res.send({
      success: true,
      message: "Theatre has been updated successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    await theatreModel.findByIdAndDelete(req.body.id);
    res.send({
      success: true,
      message: "Theatre has been deleted successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getAllTheatre = async (req,res)=>{
    try{
     const allTheatres = await theatreModel.find().populate('owner');
     res.send({
        success:true,
        message:"All theatres have been fetched",
        data:allTheatres,
     })
    }catch(err){
        res.send({
            success: false,
            message: err.message,
        })
    }
}

const getTheaterByOnwer = async (req,res)=>{
    try{
        const ownerId = req.body.ownerId;
        const filteredTheatreByOwner = await theatreModel.find({owner:ownerId});
        res.send({
            success:true,
            message:"Theater of owner has been fetched",
            data:filteredTheatreByOwner
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message,
        })
    }
}



module.exports = { addTheatre, updateTheatre, deleteTheatre,getAllTheatre, getTheaterByOnwer };
