const router = require("express").Router();
const MovieModel = require("../models/movieModel");

router.post("/add", async (req,res) => {
  try {
    const newMovie = await MovieModel(req.body);
    await newMovie.save();
    res.send({
        success:true,
        message:"New Movie has been added successfully"
    })
  } catch (err) {
    res.send({
        success:false,
        message:err.message
    })
  }
});

// router.get('/get-all');
// router.put('/update');
// router.delete('/delete');


module.exports = router;
