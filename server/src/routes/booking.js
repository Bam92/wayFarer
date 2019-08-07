import express from 'express';

// Import controller modules.
import controller from '../controllers/booking.controller';
import { verifyToken, verifyAdmin } from '../middleware/middlewares';

const router = express.Router();

// / TRIPS ROUTES ///

// GET list of all booking
router.get('/bookings', verifyToken, controller.getBookings);
//console.log('verify tokenppp', req.currentUser);
//verifyToken.length
// POST create a new trip by admin only
/*router.post('/trips', verifyToken, verifyAdmin, controller.createTrip);

router.patch('/trips/:id/cancel', verifyToken, verifyAdmin, controller.cancelTrip);
router.get('/trips/:id', verifyToken, controller.getTrip);*/

export default router;
