import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getShowById } from "../api/show";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button } from "antd";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout"; // Stripe Checkout
import { bookShow, makePayment } from "../api/bookings";

const BookShow = () => {
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await getShowById({ showId: params.id });
      if (response.success) {
        setShow(response.data);
        // message.success(response.message);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getSeats = () => {
    let columns = 12;
    let totalSeats = 120;
    let rows = totalSeats / columns; // 10
    return (
      <div
        className="d-flex flex-column align-items-center"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px">
            Screen this side, you will be watching in this direction
          </p>
          <div className="screen-div"></div>
        </div>
        <ul className="seat-ul justify-content-center">
          {Array.from(Array(rows).keys()).map((row) => {
            return Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1;

              let seatClass = "seat-btn";
              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected";
              }
              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " booked";
              }
              if (seatNumber <= totalSeats)
                return (
                  <li>
                    <button
                      className={seatClass}
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber
                            )
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
            });
          })}
        </ul>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };

  const onToken = async (token) => {
    try {
      const response = await makePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100
      );
      console.log(response);
      const transactionId = response.data;
      if (response.success) {
        message.success(response.message);
        const resp = await bookShow({
          show: params.id,
          transactionId,
          seats: selectedSeats,
          user: user._id,
        });
        if (resp.success) {
          message.success(resp.message);
          navigate("/profile");
        } else {
          message.error("Failed to book show");
        }
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1>{show.movie.movieName}</h1>
                  <p>
                    Theatre: {show.theatre.name}, {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3">
                  <h3>
                    <span>Show Name:</span> {show.name}
                  </h3>
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}{" "}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {getSeats()}
              {selectedSeats.length > 0 && (
                <StripeCheckout
                  token={onToken}
                  billingAddress
                  amount={selectedSeats.length * show.ticketPrice * 100}
                  stripeKey="pk_test_51Q1WBGDc5J7nS49CHNkLN6ZQd0QNUni7qmN90CaISQ9YvoXJMc4PnRdTfjjQK1gw73fbGBXoIGz1x1WUs9gA7Ix900mK2ut7ZT"
                >
                  {/* Use this one in some situation=> pk_test_eTH82XLklCU1LJBkr2cSDiGL001Bew71X8  */}
                  <div className="max-width-600 mx-auto">
                    <Button type="primary" shape="round" size="large" block>
                      Pay Now
                    </Button>
                  </div>
                </StripeCheckout>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default BookShow;
