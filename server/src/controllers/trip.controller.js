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
    console.log('id: ' ,id)
    if (!Number.isInteger(id) || id === undefined) {
      return res.status(404).send({
        status: 'error',
        error: 'Not found',
      });
    }

   if (tripModel.findTrip(id))
   {
     return res.status(201).send({
      status: 'success',
      data: tripModel.findTrip(id),
    });
  }
  if (!tripModel.findTrip(id)) {
    return res.status(404).send({
      status: 'error',
      error: 'ID does not exist',
    });
    }
  }
}

const tripController = new TripController();
export default tripController;
