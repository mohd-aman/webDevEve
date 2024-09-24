const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51Q1WBGDc5J7nS49CPbObkenbONHRmg9uAB5iiJsXtSuepXUPw50CvCV500q7NpLYJcuP6H6m0NEBrmOwaFBmMt3k00lIZasvkD"
);
const authMiddleware = require("../middlewares/authMiddleware");
const bookingModel = require("../models/bookingModel");
const showModel = require("../models/showModel");
const EmailHelper = require("../utils/emailHelper");

const router = require("express").Router();

router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned to movie !",
    });

    const transactionId = paymentIntent.id;

    res.send({
      success: true,
      message: "Payment Successfully",
      data: transactionId,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    const newBooking = await bookingModel(req.body);
    await newBooking.save();

    const show = await showModel.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    show.bookedSeats = updatedBookedSeats;
    await show.save();

    const populatedBooking = await bookingModel
      .findById(newBooking._id)
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    res.send({
      success: true,
      message: "Show Booked Successfully",
      data: populatedBooking,
    });

    await EmailHelper("ticketTemplate.html", populatedBooking.user.email, {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.movieName,
      theatre: populatedBooking.show.theatre.name,
      date: populatedBooking.show.date,
      time: populatedBooking.show.time,
      seats: populatedBooking.seats,
      amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
      transactionId: populatedBooking.transactionId,
    }, "Booking Confirmation");
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/all-booking-by-user", authMiddleware, async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ user: req.body.userId })
      .populate("show")
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    res.send({
      success: true,
      message: "All Bookings by User have been fetched",
      data: bookings,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
