/**
* @api {post} /api/v1/ Sign up a user
* @api {post} /api/v1/ Sign in a user
* @apiPermission user
*
* @apiParam  {String} [email] Email
* @apiParam  {String} [first_name] First name
* @apiParam  {String} [last_name] Last name
* @apiParam  {String} [passwor] Password
* @apiParam  {String} [is_admin] Status
*
* @apiSuccess (200) {Object} mixed `User` object
*/

import express from 'express';

// Import controller modules.
import controller from '../controllers/auth';

const router = express.Router();

// / AUTH ROUTES ///

// POST Signup
router.post(
  '/signup',
  //controller.validate('signup'),
  controller.signup,
);

// POST Signin
//router.post('/signin', controller.login);

export default router;
