import { runQuery } from '../../db';
import Helper from '../middleware/Helper';

const Trip = {
  /**
   * Create a new trips
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async create(req, res) {
    let success = false;
    let status = 400;

    const { seating_capacity, bus_license_number, origin, destination, fare } = req.body;

    /* ----- manuel validation -----*/
    if (!seating_capacity) return res.status(status).send({ status, success, message: 'seating capacity is required' });

    if (!bus_license_number) return res.status(status).send({ status, success, message: 'bus_license_number is required' });

    if (!origin) return res.status(status).send({ status, success, message: 'origin is required' });

    if (!destination) return res.status(status).send({ status, success, message: 'destination is required' });

    if (!fare) return res.status(status).send({ status, success, message: 'fare is required' });

    if (isNaN(fare)) return res.status(status).send({ status, success, message: 'fare can\'t be a string' });
    /* ----- end validation -------*/


    const text = 'INSERT INTO trips(seating_capacity, bus_license_number, origin, destination, date, fare, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [seating_capacity, bus_license_number, origin, destination, new Date(), fare, 'active'];

    // verify if the trip does not exist already

   // if (Helper.VerifyTrip(origin, destination) === false) return res.status(400).send({ status: 400, success: false, message: 'Trip already exists', });
console.log('verify trip', Helper.VerifyTrip(origin, destination))
    try {
      const { rows } = await runQuery(text, values);
      success = true;
      status = 201;

      return res.status(status).send({ status, success, message: 'Trip successfully created', data: rows[0] });
    } catch (error) {
      return res.status(status).send({ status, success, message: 'There was something wrong. Try again', error });
    }
  },

};

export default Trip;
