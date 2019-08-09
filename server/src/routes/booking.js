import express from 'express';

// Import controller modules.
import controller from '../controllers/booking.controller';
import { verifyToken } from '../middleware/middlewares';

const router = express.Router();

// / BOOKING ROUTES ///

router.get('/bookings', verifyToken, controller.getBookings);
router.delete('/bookings/:id', verifyToken, controller.delBooking);
router.post('/bookings', verifyToken, controller.addBooking);

export default router;
