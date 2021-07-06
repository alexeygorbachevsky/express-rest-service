import config from '../common/ormconfig';

const { getConnection, createConnection } = require('typeorm');
const writeToFile = require('../common/writeToFile');

const getDBConnection = async () => {
  let connection;
  try {
    connection = getConnection();
  } catch (err) {
    //  handle
  }

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      await createConnection(config);
    }
    // eslint-disable-next-line no-console
    console.log('Successfully connected to DB');
    writeToFile('Successfully connected to DB', './logs/info.log');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('get DB connection error:', err);
    writeToFile(`get DB connection error: ${err}`);
  }
};

const dbConnect = async (cb: () => void) => {
  try {
    await getDBConnection();
    cb();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('DB connection error', err);
    writeToFile(`DB connection error: ${err}`);
  }
};

module.exports = dbConnect;
