import jwt from 'jsonwebtoken';
import token from '../middleware/middlewares';
import privateKey from '../config';
import tripModel from '../models/trip.model';

class TripController {
  /**
 * Get all trips
 * @param {object} req
 * @param {object} res
 */

  getTrips(req, res) {
    req.token = token.verifyToken(req, res);
    jwt.verify(req.token, privateKey, (err) => {
      if (err) {
        res.json({
          status: 'error',
          error: 'No token provided or token expired',
        });
      } else {
        res.json({
          status: 'success',
          data: tripModel.findAllTrips(),
        });
      }
    });
  }

   /**
 * Get all trips
 * @param {object} req
 * @param {object} res
 */

createTrip(req, res) {
  req.token = token.verifyToken(req, res);
  jwt.verify(req.token, privateKey, (err) => {
    if (err) {
      res.json({
        status: 'error',
        error: 'No token provided or token expired',
      });
    } else {
      res.json({
        status: 'success',
        data: tripModel.findAllTrips(),
      });
    }
  });
}
  /**
 * Get one trip
 * @param {object} req
 * @param {object} res
 */

  getTrip(req, res) {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id) || id === undefined) {
      return res.status(404).send({
        status: 'error',
        error: 'Not found',
      });
    }

   if (tripModel.findTrip(id))
   {
    req.token = token.verifyToken(req, res);
    jwt.verify(req.token, privateKey, (err) => {
      if (err) {
        res.json({
          status: 'error',
          error: 'No token provided or token expired',
        });
      } else {
        res.json({
          status: 'success',
          data: tripModel.findTrip(id),
        });
      }
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
