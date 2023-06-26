import mongoose from "mongoose";
const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@flipkartclone.wtwrdmt.mongodb.net/FLIPKARTCLONE?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Succesfully");
  } catch (err) {
    console.log("Error while connecting", err.message);
  }
};

export default Connection;
