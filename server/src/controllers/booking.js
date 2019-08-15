import { runQuery } from '../../db';
import Helper from '../middleware/Helper';

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

    if (!await Helper.tripExist(trip_id)) return res.status(404).json({ status: 404, success, error: 'Sorry, you can\'t book a non existing trip' });
    /* ----- end validation -------*/
    const text = 'INSERT INTO bookings(trip_id, user_id, created_on) VALUES($1, $2, $3) RETURNING *';
    const values = [trip_id, req.currentUser.id, new Date()];
    try {
      const { rows } = await runQuery(text, values);
      success = true;
      status = 201;

      const getTrip = await Helper.getTrip(trip_id);

      if (getTrip.status === 'cancelled') {
        status = 404;
        return res.status(status).json({
          status, success, error: 'Sorry, this trip has been cancelled',
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

  async get(req, res) {
    let success = false;
    let status = 400;


    /* ----- end validation -------*/
    if (req.currentUser.is_admin === false || req.currentUser.is_admin === 'false') {
      const text = 'SELECT * FROM bookings WHERE user_id = $1';

      try {
        const { rows } = await runQuery(text, [req.currentUser.id]);
        success = true;
        status = 200;

        if (rows.length === 0) {
          return res.status(404).json({
            status: 404, success: false, error: 'You have no booking(s) yet',
          });
        }

        rows.first_name = req.currentUser.first_name;
        rows.last_name = req.currentUser.last_name;

        for (let i = 0; i < rows.length; i++) {
          const tripInfo = await Helper.getTrip(rows[i].trip_id);

          rows[i].first_name = req.currentUser.first_name;
          rows[i].last_name = req.currentUser.last_name;
          rows[i].user_email = req.currentUser.email;
          rows[i].bus_license_number = tripInfo.bus_license_number;
          rows[i].trip_date = tripInfo.date;

          delete rows[i].trip_id;
          delete rows[i].user_id;
          delete rows[i].created_on;
        }

        return res.status(status).json({
          status, success, message: `Booking(s) for user ${req.currentUser.first_name} ${req.currentUser.last_name}`, data: rows,
        });
      } catch (error) {
        return res.status(status).json({
          status, success, error: error.message,
        });
      }
    }

    const text = 'SELECT * FROM bookings';

    try {
      const { rows } = await runQuery(text);
      success = true;
      status = 200;

      if (rows.length === 0) {
        return res.status(404).json({
          status: 404, success: false, error: 'There is no booking(s) yet',
        });
      }

      for (let i = 0; i < rows.length; i++) {
        const userInfo = await Helper.getUser(rows[i].user_id);
        const tripInfo = await Helper.getTrip(rows[i].trip_id);

        rows[i].bus_license_number = tripInfo.bus_license_number;
        rows[i].trip_date = tripInfo.date;

        rows[i].first_name = userInfo.first_name;
        rows[i].last_name = userInfo.last_name;
        rows[i].user_email = userInfo.email;

        delete rows[i].trip_id;
        delete rows[i].user_id;
        delete rows[i].created_on;
      }

      return res.status(status).json({
        status, success, message: 'List of all bookings', data: rows,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404, success: false, error: error.message,
      });
    }
  },

  async delete(req, res) {
    let success = false;
    let status = 400;

    const { id } = req.params;
    const user = req.currentUser.id;

    /* ----- manuel validation -----*/
    if (!id) return res.status(status).json({ status, success, error: 'Booking ID is required' });
    if (isNaN(id)) return res.status(status).json({ status, success, error: 'Booking ID must be an integer' });

    if (!await Helper.bookingExist(id, user)) return res.status(status).json({ status: 404, success, error: 'Sorry, you don\'t have this booking' });
    /* ----- end validation -------*/

    const text = 'DELETE FROM bookings WHERE id = $1';

    try {
      await runQuery(text, [id]);
      success = true;
      status = 201;

      return res.status(status).json({
        status, success, message: 'Booking deleted successfully',
      });
    } catch (error) {
      return res.status(status).json({
        status, success, error: error.message,
      });
    }
  },
};

export default Booking;
