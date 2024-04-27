const express = require("express");

const { connect } = require("./config/db.config");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");
const creatorRouter = require("./routes/creator.routes");

const app = express();

var fileupload = require("express-fileupload");
const authMiddleware = require("./middlewares/auth.middleware");
const creatorMiddleware = require("./middlewares/creators.middleware");
const adminMiddleware = require("./middlewares/admin.middleware");
app.use(fileupload());

app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/user", authMiddleware, userRouter);
app.use("/creator", authMiddleware, creatorMiddleware, creatorRouter);
app.use("/admin", authMiddleware, adminMiddleware, adminRouter);

app.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`Server is listining on port ${PORT}`);
  connect();
});
