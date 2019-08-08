import model from '../models/booking.model';

class BookingController {

  getBookings(req, res) {
    const status = 201;
    res.status(status).send({
      status,
      message: 'Well done. You can see all bookings',
      data: model.findAll(),
    });
  }

delBooking(req, res) {
  const id = req.params.id;
  if (isNaN(id)) {
    const status = 404;
    res.status(status).send({
      status,
      message: 'ID must be a number',
    });
  }
const exists = model.findById(parseInt(id));

if (exists) {

  const deleted = model.delBooking(parseInt(id));
  if (deleted) {
    const status = 201;
    res.status(status).send({
      status,
      message: 'Booking deleted successfully',
    });
  }
   else res.json('Something is wrong')

} else {
  const status = 404;
  res.status(status).send({
    status,
    message: 'The ID you have provided does not exist',
  });
  }

}
}

const bookingController = new BookingController();
export default bookingController;
