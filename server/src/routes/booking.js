import express from 'express';

// Import controller modules.
import controller from '../controllers/booking.controller';
import { verifyToken, verifyAdmin } from '../middleware/middlewares';

const router = express.Router();

// / BOOKING ROUTES ///

// GET list of all booking
router.get('/bookings', verifyToken, verifyAdmin, controller.getBookings);
router.delete('/bookings/:id', verifyToken, controller.delBooking);

/*router.post('/trips', verifyToken, verifyAdmin, controller.createTrip);

router.patch('/trips/:id/cancel', verifyToken, verifyAdmin, controller.cancelTrip);
router.get('/trips/:id', verifyToken, controller.getTrip);*/

export default router;
