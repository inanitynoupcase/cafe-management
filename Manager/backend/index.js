const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const sql = require("mssql");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const testRoute = require("./routes/test");
const drinksRoute = require("./routes/drinks");
const ordersRoute = require("./routes/orders");
const clientRoute = require("./routes/client");

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // Nếu sử dụng kết nối bảo mật SSL
  },
};

sql
  .connect(config)
  .then(() => {
    console.log("CONNECTED TO MSSQL");
  })
  .catch((err) => {
    console.log(err);
  });
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

//ROUTES
// app.use("/v1/user", userRoute);
app.use("/manager/test", testRoute);
app.use("/manager/auth", authRoute);
app.use("/manager/user", userRoute);
app.use("/manager/drinks", drinksRoute);
app.use("/manager/orders", ordersRoute);
app.use("/client/", clientRoute);

app.listen(8000, () => {
  console.log("Server is running");
});
