import tripModel from '../models/trip.model';

class TripController {
  /**
 * Get all trips
 * @param {object} req
 * @param {object} res
 */

  getTrips(req, res) {
    const status = 201;
    res.status(status).send({
      status,
      message: 'Well done. You can see all trips',
      data: tripModel.findAllTrips(),
    });
  }

  /**
 * Create a new trips
 * @param {object} req
 * @param {object} res
 */

createTrip(req, res) {
  const trip = {
    seating_capacity: req.body.seating_capacity,
    origin: req.body.origin,
    destination: req.body.destination,
    date: req.body.trip_date,
    fare: req.body.fare,
  };

  if (tripModel.tripExists(req.body.origin, req.body.destination)) {
    const status = 401;
    return res.status(status).send({
      status,
      message: 'Trip already exists!',
    });
  }

  const createdTrip = tripModel.addTrip(trip);

  if (createdTrip) {
    const status = 201;
    return res.status(status).send({
      status,
      message: 'Trip successfully added',
      data: createdTrip
    })
  } else {
    return res.status(400).send({
      message: 'error',
    });
  }
}

  /**
 * Cancel a trip
 * @param {object} req
 * @param {object} res
 */

cancelTrip(req, res) {
  const id = req.params.id;

  const trip = tripModel.findTrip(parseInt(id))

  if (!trip) {
    const status = 404;
      return res.status(status).send({
        status,
        message:'The trip does not exist',
      });
  }

  if (trip) {
    if (trip.status !== 'active') {
      const status = 400;
      return res.status(status).send({
        status,
        message:'The trip is already cancelled!'
      });
    }

    const status = 201;
    trip.status = 'cancelled';
    return res.status(status).send({
      status,
      message:'Trip cancelled!',
      data: trip,
    });
  }
}
  /**
 * Get one trip
 * @param {object} req
 * @param {object} res
 */

getTrip(req, res) {
  const id = req.params.id;
  const trip = tripModel.findTrip(parseInt(id))

  if (!trip) {
    const status = 404;
    return res.status(status).send({
      status,
      message: 'This trip does not exist',
      });
    }
  const status = 201;
  return res.status(status).send({
    status,
    message: 'Well done. You can see the trip',
    data: trip,
  });
  }
}

const tripController = new TripController();
export default tripController;
