const express = require("express");
const app = express();
const _connect = require('./db/_connect');
require('dotenv').config();
const blogRouter = require("./routes/BlogRoutes");


// mongo db connection 
_connect();


//middleware
app.use(express.json());


app.use("/api/blogs", blogRouter);

 
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
 
module.exports = app;