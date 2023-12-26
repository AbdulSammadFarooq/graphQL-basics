import mongoose from "mongoose"

// Connection URI for the local MongoDB database
const dbURI = 'mongodb://localhost:27017/graphQL'; // Replace 'my_database' with the name of your database

// Mongoose connection options (optional)
const options = {
  useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
};

// Connect to the MongoDB database
mongoose.connect(dbURI, options)
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
