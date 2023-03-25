const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const helmet = require("helmet");
const bodyParser = require("body-parser");
// Mongo DB Connections
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json())
app.use(cors());
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB Connection Succeeded.");
  })
  .catch((error) => {
    console.log("Error in DB connection: " + error);
  });

// Middleware Connections
// app.use(cors({
//     origin: ["http://localhost:3000","https://accounts.google.com/o/oauth2/v2/auth"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   }));

//   app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*"); // Set it to *
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
//   });

// Routes
const eventsRoutes = require("./routers/events");
const authRouter = require("./routers/auth");
const userRoute = require("./routers/user");

app.use("/api", eventsRoutes);
app.use("/api", authRouter);
app.use("/api/user", userRoute);

// Connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
