const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(process.env.MONGODB_URI);

  mongoose.connection.on("error", (e) => {
    console.error("MONGO DB ERROR: ", e);
  });
  mongoose.connection.once("connected", () => {
    console.log("MONGO DB CONNECTED");
  });
};

module.exports = { connect };
