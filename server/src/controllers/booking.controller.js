import model from '../models/booking.model';

class BookingController {
  getBookings(req, res) {
    const { currentUser } = req;
    const status = 201;
    if (currentUser.is_admin === false) {
      return res.status(status).send({
        status,
        message: 'Well done. You can see your bookings',
        data: model.findAllByUser(currentUser.id),
      });
    }

    return res.status(status).send({
      status,
      message: 'Well done. You can see all bookings',
      data: model.findAll(),
    });
  }

  delBooking(req, res) {
    const { id } = req.params;
  if (isNaN(id)) {
    const status = 409;
    return res.status(status).send({
      status,
      message: 'ID must be a number',
    });
  }
const exists = model.findById(parseInt(id));

if (!exists) {
  const status = 404;
  return res.status(status).send({
    status,
    message: 'The ID you have provided does not exist',
  });
}
  const deleted = model.delBooking(id);
  if (deleted) {
    const status = 201;
    return res.status(status).send({
      status,
      message: 'Booking deleted successfully',
    });
  } else {
    res.json('wrong')

  }
 }

 addBooking (req, res) {
  const { currentUser } = req;
   const trip_id = req.body.trip_id;

   if (isNaN(trip_id)) {
    const status = 409;
    return res.status(status).send({
      status,
      message: 'Trip id must be a number',
    });
  }

  const exists = model.checkTrip(parseInt(trip_id));

if (!exists) {
  const status = 404;
  return res.status(status).send({
    status,
    message: 'The trip you want to book does not exist',
  });
}

const bookNow = model.bookNow(trip_id, currentUser.id);
const tripInfo = model.findTrip(parseInt(trip_id));

if (bookNow) {
  delete bookNow.trip_id;
  delete bookNow.created_on;
  if (tripInfo) {
    bookNow.bus_license_number = tripInfo.bus_license_number;
    bookNow.trp_date = tripInfo.trip_date;
  }
  bookNow.first_name = currentUser.first_name;
  bookNow.last_name = currentUser.last_name;
  bookNow.email = currentUser.email;

  const status = 201;
  return res.status(status).send({
    status,
    message: 'Success',
    data: bookNow
  });
} else res.json("error")

 }
}
const bookingController = new BookingController();
export default bookingController;
