import { runQuery, getAll } from '../../db';
import Helper from '../middleware/Helper';
import Trip from '../controllers/trip';

const Booking = {
  /**
   * Book a seat
   * @param {object} req
   * @param {object} res
   * @returns {object} bookings object
   */
  async book(req, res) {
    let success = false;
    let status = 400;

    const { trip_id } = req.body;

    /* ----- manuel validation -----*/
    if (!trip_id) return res.status(status).json({ status, success, error: 'Trip ID is required' });
    if (isNaN(trip_id)) return res.status(status).json({ status, success, error: 'Trip ID must be an integer' });

    if (!await Helper.tripExist(trip_id)) return res.status(status).json({ status, success, error: 'Sorry, you can\'t book a non existing trip' });
    /* ----- end validation -------*/
    const text = 'INSERT INTO bookings(trip_id, user_id, created_on) VALUES($1, $2, $3) RETURNING *';
    const values = [trip_id, req.currentUser.id, new Date()];
    try {
      const { rows } = await runQuery(text, values);
      success = true;
      status = 201;

      const getTrip = await Helper.getTrip(trip_id);

      if (getTrip.status === 'cancelled') {
        success = false;
        status = 400;
        return res.status(status).json({
          status, success, message: 'Sorry, this trip has been cancelled',
        });
      }

      rows[0].first_name = req.currentUser.first_name;
      rows[0].last_name = req.currentUser.last_name;
      rows[0].email = req.currentUser.email;
      rows[0].bus_licence_number = getTrip.bus_license_number;
      rows[0].trip_date = getTrip.date;

      delete rows[0].created_on;

      return res.status(status).json({
        status, success, message: 'You\'ve booked successfully', data: rows[0],
      });
    } catch (error) {
      return res.status(status).json({
        status, success, error: error.message,
      });
    }
  },


};

export default Booking;
