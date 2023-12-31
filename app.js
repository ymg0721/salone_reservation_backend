const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true"); // Set this header for CORS with credentials
  next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/v1/list", async (req, res, next) => {
  const prisma = new PrismaClient();
  const allProduction = await prisma.list.findMany();
  res.json(allProduction);
});

app.get("/api/v1/calender", async (req, res, next) => {
  const prisma = new PrismaClient();
  const allProduction = await prisma.calender.findMany();
  res.json(allProduction);
});

app.post("/api/v1/reservation02", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const createdContact = await prisma.reservation02.create({
      data: {
        name,
        email,
        phone,
      },
    });

    console.log("お問い合わせが保存されました:", createdContact);

    res.status(201).json({ name: "お問い合わせが送信されました。" });
  } catch (error) {
    console.error("エラー:", error);
    res.status(500).json({ error: "サーバーエラーが発生しました。" });
  }
});

app.post("/api/v1/contact01", async (req, res) => {
  try {
    const { email, message } = req.body;

    const createdContact = await prisma.contact.create({
      data: {
        email,
        message,
      },
    });

    console.log("お問い合わせが保存されました:", createdContact);

    res.status(201).json({ message: "お問い合わせが送信されました。" });
  } catch (error) {
    console.error("エラー:", error);
    res.status(500).json({ error: "サーバーエラーが発生しました。" });
  }
});

app.post("/api/v1/contact02", async (req, res) => {
  try {
    const { email, message } = req.body;

    const createdContact = await prisma.contact.create({
      data: {
        email,
        message,
      },
    });

    console.log("お問い合わせ➁が保存されました:", createdContact);

    res.status(201).json({ message: "お問い合わせが送信されました。" });
  } catch (error) {
    console.error("エラー:", error);
    res.status(500).json({ error: "サーバーエラーが発生しました。" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

// catch 404 and forward to the error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
