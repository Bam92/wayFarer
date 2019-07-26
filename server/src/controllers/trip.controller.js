import trips from '../models/trip.model';

class TripController {
  /**
 * Get all trips
 * @param {object} req
 * @param {object} res
 */

  getTrips(req, res) {
    return res.status(201).send({
      status: 'success',
      data: trips.findAllTrips(),
    });
  }
}

const tripController = new TripController();
export default tripController;
