import tripModel from '../models/trip.model';

class TripController {
  /**
 * Get all trips
 * @param {object} req
 * @param {object} res
 */

  getTrips(req, res) {
    return res.status(201).send({
      status: 'success',
      data: tripModel.findAllTrips(),
    });
  }

  /**
 * Get one trip
 * @param {object} req
 * @param {object} res
 */

  getTrip(req, res) {
    const id = parseInt(req.params.id);
    console.log(typeof id)
    if (!Number.isInteger(id) || id === undefined) {
      return res.status(404).send({
        status: 'error',
        error: 'Not found',
      });
    }
    console.log(`list ${  tripModel.findTrip(req.params.id)  } et typeof ${  req.params.id}`);
    return res.status(201).send({
      status: 'success',
      data: tripModel.findTrip(id),
    });
  }
}

const tripController = new TripController();
export default tripController;
