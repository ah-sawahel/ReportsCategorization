const mongoose = require('mongoose');

module.exports = () => {

  const encodedUri = process.env.MONGODB_URI;
  const buff = Buffer.from(encodedUri, 'base64');
  const dbUri = buff.toString('ascii');

  const encodedPass = process.env.DB_PASS;
  const passBuff = Buffer.from(encodedPass, 'base64');
  const dbPass = passBuff.toString('ascii');

  mongoose
    .connect(dbUri, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: dbPass,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log('Database connected....');
    })
    .catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });
};
