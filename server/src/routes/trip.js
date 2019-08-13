import express from 'express';

// Import controller modules.
import controller from '../controllers/trip';
import Auth from '../middleware/Auth';

const router = express.Router();

// / TRIPS ROUTES ///

// GET list of all trip
router.get('/trips', Auth.verifyToken, controller.getAll);

// POST create a new trip by admin only
router.post('/trips', Auth.verifyToken, Auth.verifyAdmin, controller.create);

/*router.patch('/trips/:id/cancel', verifyToken, verifyAdmin, controller.cancelTrip);*/
router.get('/trips/:id', Auth.verifyToken, controller.getOne);

export default router;
