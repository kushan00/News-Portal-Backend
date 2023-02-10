const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

/* Loading the environment variables from the .env file. */
dotenv.config();

//
// ─── SET UP SERVER ──────────────────────────────────────────────────────────────
//


/* Creating an instance of express. */
const app = express();

/* A middleware that parses the body of the request and makes it available in the req.body property. */
app.use(express.json());

/* Show all static images in public folder */
app.use('/public', express.static('public'));

/* Allowing the server to accept requests from the client. */
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials:true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Setting the port to 5000. */
const PORT = process.env.PORT || 5000;

/* Starting the server on the port 8000. */
app.listen(PORT, () => console.log(`Server successfully  started on : ${PORT}`));

//
// ─── CONNECT TO MONGODB ─────────────────────────────────────────────────────────
//

mongoose.connect(
  process.env.DB_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully Connected to MongoDB");
  }
);


//import routes
const Auth = require("./routes/AuthRoutes");
const News = require("./routes/NewsRoutes");


//
// ─── SET UP ROUTES ──────────────────────────────────────────────────────────────
//

//User management routes
app.use("/news-portal",Auth);


//News Management routes
app.use("/news-portal/news",News);