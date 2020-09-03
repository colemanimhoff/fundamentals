import mongoose from "mongoose";

import User from "./user";
import Message from "./message";

const connectDB = () => {
  mongoose.set("useCreateIndex", true);
  if (process.env.TEST_DATABASE_URL) {
    return mongoose.connect(process.env.TEST_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return mongoose.connect(process.env.DEVELOPMENT_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const models = { User, Message };

export { connectDB };
export default models;