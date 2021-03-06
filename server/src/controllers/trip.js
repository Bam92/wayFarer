import { runQuery, getAll } from '../../db';
import Helper from '../middleware/Helper';

const Trip = {
  /**
   * Create a new trips
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  async create(req, res) {
    let success = false;
    let status = 400;

    const {
      seating_capacity,
      bus_license_number,
      origin, destination,
      fare,
    } = req.body;

    /* ----- manuel validation -----*/
    if (!seating_capacity) return res.status(status).send({ status, success, error: 'seating capacity is required' });

    if (isNaN(seating_capacity)) return res.status(status).send({ status, success, error: 'seating capacity must be a valid number' });

    if (!bus_license_number) return res.status(status).json({ status, success, error: 'bus_license_number is required' });

    if (!origin) return res.status(status).send({ status, success, error: 'origin is required' });

    if (!Helper.isValidString(origin)) return res.status(status).send({ status, success, error: 'origin must be a string without numbers' });

    if (!destination) return res.status(status).json({ status, success, error: 'destination is required' });

    if (!fare) return res.status(status).json({ status, success, error: 'fare is required' });

    if (isNaN(fare)) return res.status(status).json({ status, success, error: 'fare can\'t be a string' });
    /* ----- end validation -------*/


    const text = 'INSERT INTO trips(seating_capacity, bus_license_number, origin, destination, date, fare, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [seating_capacity, bus_license_number, origin, destination, new Date(), fare, 'active'];

    // verify if the trip does not exist already

    if (await Helper.verifyTrip(bus_license_number) === true) return res.status(409).send({ status: 409, success: false, message: 'Trip already exists' });

    try {
      const { rows } = await runQuery(text, values);
      success = true;
      status = 201;

      return res.status(status).json({
        status, success, message: 'Trip successfully created', data: rows[0],
      });
    } catch (error) {
      return res.status(status).json({
        status, success, error: error.message,
      });
    }
  },

  /**
   * Get a list trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  async getAll(req, res) {
    let success = false;
    let status = 400;

    const query = 'SELECT * FROM trips';

    try {
      const { rows } = await getAll(query);
      success = true;
      status = 200;

      return res.status(status).send({
        status, success, message: 'List of available trip', data: rows,
      });
    } catch (error) {
      return res.status(status).json({
        status, success, error: error.message,
      });
    }
  },

  /**
   * Get detail of a specific trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  async getOne(req, res) {
    let success = false;
    let status = 400;

    const { id } = req.params;

    if (isNaN(id)) return res.status(status).json({ status, success, error: 'ID must be a integer' });

    const text = 'SELECT * FROM trips WHERE id = $1';

    try {
      const { rows } = await runQuery(text, [id]);

      if (!rows[0]) return res.status(404).json({ status: 404, success, error: 'Sorry, the trip you are looking for does not exist' });

      success = true;
      status = 200;

      return res.status(status).json({

        status, success, message: `Here is the detail for trip ${id}`, data: rows[0],
      });
    } catch (error) {
      return res.status(status).send({ status, success, error: error.message });
    }
  },

  /**
   * Cancel a specific trip
   * @param {object} req
   * @param {object} res
   * @returns {object} trip object
   */
  async cancel(req, res) {
    let success = false;
    let status = 400;

    const { id } = req.params;

    if (isNaN(id)) return res.status(status).json({ status, success, error: 'ID must be a integer' });

    const text = 'SELECT * FROM trips WHERE id = $1';

    try {
      const { rows } = await runQuery(text, [id]);

      if (!rows[0]) return res.status(404).json({ status: 404, success, error: 'Sorry, the trip you are looking for does not exist' });
      if (rows[0].status === 'cancelled') return res.status(status).json({ status, success, error: `Sorry, the trip ${id} is already cancelled` });

      const cancelQuery = 'UPDATE trips SET status = \'cancelled\' WHERE id = $1';

      await runQuery(cancelQuery, [id]);

      success = true;
      status = 201;

      rows[0].status = 'cancelled';

      return res.status(status).json({

        status, success, message: `Trip ${id} was cancelled successfully`, data: rows[0],
      });
    } catch (error) {
      return res.status(status).send({ status, success, error: error.message });
    }
  },

};

export default Trip;
