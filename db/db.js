const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://mirza:GL@cluster0-ggexg.gcp.mongodb.net/test?retryWrites=true&w=majority'
// 'mongodb+srv://mirza:<password>@cluster0-ggexg.gcp.mongodb.net/test?retryWrites=true&w=majority';


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
