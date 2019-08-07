import express from 'express';

// Import controller modules.
import controller from '../controllers/trip.controller';
import { verifyToken, verifyAdmin } from '../middleware/middlewares';

const router = express.Router();

// / TRIPS ROUTES ///

// GET list of all trip
router.get('/trips', verifyToken, controller.getTrips);

// POST create a new trip by admin only
router.post('/trips', verifyToken, verifyAdmin, controller.createTrip);

router.patch('/trips/:id/cancel', verifyToken, verifyAdmin, controller.cancelTrip);
router.get('/trips/:id', verifyToken, controller.getTrip);

export default router;
