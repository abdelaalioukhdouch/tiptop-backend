require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/api/auth/auth");
const usersRoutes = require("./routes/api/user/user");
const scriptRoutes = require("./routes/api/script/script");
const ticketRoutes = require("./routes/api/ticket/ticket");

const port = process.env.PORT;

const app = express();

const server = app.listen(port);
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, X-Requested-With, Accept,"
  );
  next();
});

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/script", scriptRoutes);
app.use("/api/ticket", ticketRoutes);
app.get("/test", (req, res) => {
  res.status(200).json({
    message: "test",
  });
});


connectDB();
console.log(`Connected to PORT ${port} `);
