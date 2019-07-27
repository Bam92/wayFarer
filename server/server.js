import http from 'http';

import app from './app';

const port = 5000;
const server = http.createServer(app);

app.listen(port, () => {
  console.log(`The server restarted successfully on port ${port}`);
});
