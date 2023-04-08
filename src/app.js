const express = require("express");
const app = express();
const cors = require('cors')
const _connect = require('./db/_connect');
require('dotenv').config();

const blogRouter = require("./routes/BlogRoutes");
const userRouter = require("./routes/UserRoutes");
const authRouter = require("./routes/AuthRoutes");
const FileRouter = require("./routes/FileRoutes");
const { jwtMiddleware } = require("./middlewares/jwtMiddleware");



// mongo db connection 
_connect();


//middleware
app.use(express.json());
app.use(cors())

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/files", FileRouter);
app.use("/api", authRouter);

// Agregar middleware para rutas protegidas
app.use('/protected', jwtMiddleware);

// Agregar ruta protegida
app.get('/protected/example', (req, res) => {
  res.json({ message: 'Esta es una ruta protegida' });
});



// Handle all not found routes
app.use((req, res , next) =>{
  res.status(404).send('<h3>Page not found</h3>')
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;