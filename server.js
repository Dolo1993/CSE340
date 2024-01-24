require('dotenv').config();
 
// Require Statements
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const staticRoutes = require("./routes/static"); 
const baseController = require("./controllers/baseController"); 
const inventoryRoute = require("./routes/inventoryRoute");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

app.use(staticRoutes); 
// index routes 
app.use("/inv", inventoryRoute);
app.get("/", baseController.buildHome); 

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
