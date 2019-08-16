import express from 'express';

// Import controller modules.
import controller from '../controllers/booking';
import Auth from '../middleware/Auth';

const router = express.Router();

// / BOOKING ROUTES ///

router.get('/bookings', Auth.verifyToken, controller.get);
router.delete('/bookings/:id', Auth.verifyToken, Auth.verifyUser, controller.delete);
router.post('/bookings', Auth.verifyToken, Auth.verifyUser, controller.book);

export default router;
