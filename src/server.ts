export {};
const { PORT } = require('./common/config');
const app = require('./app');
const dbConnect = require('./db/db');
const writeToFile = require('./logger/writeToFile');

dbConnect(() => {
  app.listen(PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`App is running on http://localhost:${PORT}`)
  );
})
  .then(() => {})
  .catch((err: Error) => {
    // eslint-disable-next-line no-console
    console.error('App running error', err);
    writeToFile(`App running error, ${err}`);
  });
