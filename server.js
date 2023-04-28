const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = process.env.PORT || 5000;
const s3 = require("./controllers/s3");
const corsOptions = require("./config/corsOptions");

connectDB();

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/user", require("./routes/user.routes"));
app.use("/list", require("./routes/list.routes"));
app.use("/like", require("./routes/likes.routes"));
app.use("/rate", require("./routes/rates.routes"));
app.use("/recommendations", require("./routes/recommendations.routes"));
app.use(
  express.static(path.join(__dirname, "/frontend", "/public", "/index.html"))
);
app.get("/s3Url", async (req, res) => {
  const url = await s3.generateUploadURL();
  res.send({ url });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/frontend/public/index.html"));
  app.get("https://umtappo-d6u1.onrender.com/*", (req, res) =>
    res.sendFile(__dirname + "/frontend/public/index.html")
  );
}
// app.get("/*", (req, res) => {
//   res.sendFile(path.join("./frontend/public/index.html"));
// });

app.listen(port, () => console.log("server start at port " + port));
