import express from 'express';

// Import controller modules.
import controller from '../controllers/user.controller';

const router = express.Router();

// / AUTH ROUTES ///

// POST Signup
router.post('/signup', controller.signUpUser);

// POST Signin
router.post('/signin', controller.logInUser);

export default router;
