require("dotenv").config();

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

// Allow requests from your frontend origin
const corsOptions = {
  origin: 'http://localhost:4200', // Update with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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

const DIST_FOLDER = path.join(__dirname, '/dist/projectdsp/browser');
// Serve static files
app.use(express.static(DIST_FOLDER));

// All other routes should redirect to the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});


connectDB();
console.log(`Connected to PORT ${port} `);
const server = app.listen(port);
