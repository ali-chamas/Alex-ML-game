const express = require("express");

const { connect } = require("./config/db.config");

const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/user.routes");
const gamesRouter = require("./routes/game.routes");
const modelRouter = require("./routes/model.routes");

const app = express();

var fileupload = require("express-fileupload");
app.use(fileupload());

app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/model", modelRouter);

app.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`Server is listining on port ${PORT}`);
  connect();
});
