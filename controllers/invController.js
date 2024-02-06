const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {} 

//render management view
invCont.buildManagementView = async function (req, res, next) {
  try {
    const nav = await utilities.getNav();
    const title = "Welcome to Inventory Management";
    const messages = req.flash();
    console.log("Debug: Rendering management view"); 
    res.render("./inventory/management", {
      title,
      nav,
      messages,
    });
  } catch (error) {
    console.error("Error in buildManagementView:", error); 
    next(error);
  }
}; 


// Function to handle form submission and add classification
invCont.addClassification = async function (req, res, next) {
  try {
    // Implement server-side validation logic here

   // Server-side validation logic
const { classification_name } = req.body;
if (!classification_name || /\s/.test(classification_name) || /[^a-zA-Z0-9]/.test(classification_name)) {
  req.flash('error', 'Invalid classification name. It should not contain spaces or special characters.');
  return res.redirect('/inv/add-classification');
}

    // Insert the new classification into the database using the model function
    const insertResult = await invModel.insertClassification(classification_name);

    if (insertResult) {
      // If successful, create a new navigation bar and render the management view
      req.flash('success', 'Classification added successfully.');
      return res.redirect('/inv');
    } else {
      // If insertion fails, render the add-classification view with an error message
      req.flash('error', 'Failed to add classification.');
      return res.redirect('/inv/add-classification');
    }
  } catch (error) {
    console.error("Error in addClassification:", error);
    next(error);
  }
};



/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

// Function to render add-classification view
invCont.buildAddClassificationView = async function (req, res, next) {
  try {
    const nav = await utilities.getNav();
    const title = "Add New Classification";
    const messages = req.flash();
    res.render("./inventory/add-classification", { title, nav, messages });
  } catch (error) {
    console.error("Error in buildAddClassificationView:", error);
    next(error);
  }
};
 
 

module.exports = invCont