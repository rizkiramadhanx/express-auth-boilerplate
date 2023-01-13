const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    console.log('✅ MongoDB : Connected.');
  } catch (e) {
    console.log('❌ MongoDB : Error Connected.,' + e);
  }
};

module.exports = connectDB;
