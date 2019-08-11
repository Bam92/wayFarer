import http from 'http';
import morgan from 'morgan';

import app from './app';

const { PORT = 9000, NODE_ENV } = process.env;
//const port = process.env.PORT || 9000;

// Check for working environment to start logging http request
if (NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

http.createServer(app);

app.listen(PORT, () => console.log(`The server restarted successfully on port ${PORT}`));
