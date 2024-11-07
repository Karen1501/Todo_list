require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const subtaskRoutes = require("./routes/subtaskRoutes");

const app = express();

//middleware para procesar datos en formato json
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Ajusta esto si tu frontend está en otro puerto
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
//conexión con mongo
const conectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 50000,
      })
      .then(() => console.log("Conectado a mongo"));
  } catch (error) {
    console.error("Error al conectar a mongo", error);
    process.exit(1);
  }
};

conectDB();

// Rutas
app.use("/api", authRoutes); // Aquí se manejan las rutas de autenticación
app.use("/api", taskRoutes); // Aquí se manejan las rutas de tareas
app.use("/api", subtaskRoutes); // Aquí se manejan las rutas de subtareas

app.get("/api/test", (req, res) => {
  console.log("bien");
  res.json({ message: "Ruta de prueba funcionando correctamente" });
});

//deifinir el puerto
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
