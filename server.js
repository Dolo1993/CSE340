require('dotenv').config();
 
// Require Statements
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const staticRoutes = require("./routes/static"); 
const baseController = require("./controllers/baseController"); 
const inventoryRoute = require("./routes/inventoryRoute"); 
const utilities = require("./utilities/index") 

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

app.use(staticRoutes); 
// index routes 
app.use("/inv", inventoryRoute);
app.get("/", utilities.handleErrors(baseController.buildHome));  

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

const port = process.env.PORT;
const host = process.env.HOST;


 /* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  const statusCode = err.status || 500; // Set a default status code if not provided
  const message = (statusCode === 404) ? err.message : 'Oh no! There was a crash. Maybe try a different route?';
  res.status(statusCode).render("errors/error", {
    title: statusCode === 404 ? '404' : 'Server Error',
    message,
    nav
  });
});
/*****************************
 * local server information
 * Value from .env (environment) file
 */
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
