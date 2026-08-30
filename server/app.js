const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://customer-relationship-management-wine.vercel.app",
  "https://customer-relationship-management-o6p6ouhzj.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      // (for example, some server-to-server requests)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const dealRoutes = require("./routes/dealRoutes");
const interactionRoutes = require("./routes/interactionRoutes");
const documentRoutes = require("./routes/documentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("CRM Backend Running...");
});

module.exports = app;