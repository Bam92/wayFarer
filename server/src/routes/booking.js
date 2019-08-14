import express from 'express';

// Import controller modules.
import controller from '../controllers/booking';
import Auth from '../middleware/Auth';

const router = express.Router();

// / BOOKING ROUTES ///

/*router.get('/bookings', verifyToken, controller.getBookings);
router.delete('/bookings/:id', verifyToken, controller.delBooking);*/
router.post('/bookings', Auth.verifyToken, Auth.verifyUser, controller.book);

export default router;
