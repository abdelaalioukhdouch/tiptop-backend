require("dotenv").config();
const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/api/auth/auth");
const usersRoutes = require("./routes/api/user/user");
const scriptRoutes = require("./routes/api/script/script");
const ticketRoutes = require("./routes/api/ticket/ticket");
const gainRoutes = require("./routes/api/gain/gain");
const selectWinnerRoutes = require("./routes/api/select-winner/select-winner");


const port = process.env.PORT || 443;




const app = express();

const corsOptions = {
  origin: ['http://localhost:4200', 'https://tiptipfront.azurewebsites.net'], // array of allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // if your frontend needs to send cookies with the request
  allowedHeaders: 'Content-Type,Authorization' // specify headers if needed
};

app.use(cors(corsOptions));

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

// app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res) => {
//   res.redirect('/home'); // Redirige vers la page d'accueil
// });

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/script", scriptRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/gain", gainRoutes);
app.use("/api/select-winner", selectWinnerRoutes);

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "test",
  });
});

app.use((req, res) => {
  res.redirect('/');
});

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

connectDB();
console.log(`Connected to PORT ${port} `);
const server = app.listen(port);

module.exports = app;
