const mongoose = require('mongoose');

const connectionString = 'mongodb://wdi:abc123@ds053954.mongolab.com:53954/wdi-students';

mongoose.connect(connectionString, { useNewUrlParser: true });


mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
});

mongoose.connection.on('error', (err) => {
  console.log(err, 'Mongoose failed to connect')
});


mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected')
});
