const express = require("express");
const cors = require("cors");

const myAuth = require("./utils/auth");
const userRouter = require("./routes/users");

const app = express();
app.use(cors());
app.use(express.json());
app.use(myAuth);
app.use("/users", userRouter);

app.listen(4000, "localhost", () => {
  console.log("server started at port 4000");
});
