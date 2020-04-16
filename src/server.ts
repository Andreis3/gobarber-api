import express from 'express';

import routes from './routes/index';

const app = express();

app.use(express.json());

app.use(routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Runing service in port: ${port}`);
});
