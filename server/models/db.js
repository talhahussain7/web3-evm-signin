const mongoose = require('mongoose');
require('dotenv/config')

module.exports = async () => {
  try{
    await mongoose.connect(process.env.DATABASE_CONNECTION,{
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Mongodb Connected");
  } catch(err){
    console.log(err.message);
    process.exit(1);
  }
}