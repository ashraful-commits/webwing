import mongoose from 'mongoose';
import Colors from 'colors';

//========================================create connection

export const mongodbConncetion = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_CON);
    console.log(`MongoDB connection Successfully`.bgCyan);
  } catch (error) {
    console.log(error.message);
  }
};
