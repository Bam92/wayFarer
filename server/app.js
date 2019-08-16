import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';


import auth from './src/routes/auth';
import trip from './src/routes/trip';
import booking from './src/routes/booking';

dotenv.config(); // Sets environment's varibles

// set up the express app
const app = express();

const swaggerDocument = YAML.load('server/swagger.yaml');

app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));


const baseUrl = '/api/v1';

//  / ROUTES ///
app.use(`${baseUrl}/auth`, auth);
app.use(baseUrl, trip);
app.use(baseUrl, booking);

//  / SWAGGER ///
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

app.use('/docs', swaggerUi.serve, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// / HANDLE SOME ERRORS ///

// debuging
if (process.env.NODE_ENV === 'development') {
  Error.stackTraceLimit = Infinity;
}

// 404
app.use((req, res) => res.status(404).send({
  status: 404,
  message: `Oh! I am sorry the Route ${req.url} couldn't be found in this Andela server. Contact Emmanuel or Eric`,
}));

// 500 or any
app.use((err, req, res) => res.status(500).send({
  status: 500,
  message: `Your request returned with a server error ${err}`,
}));

export default app;
