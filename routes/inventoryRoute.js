//Needed Resources 
const express = require("express") 
const router = new express.Router() 
const invController = require("../controllers/invController")    
const utilities = require("../utilities");  


 
//javascript route
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON)) 


// Route to display the "Add New Vehicle to Inventory" page
router.get("/add-inventory", invController.buildAddInventoryView);

// Route to process adding a new vehicle to inventory
router.post("/add-inventory", utilities.handleErrors(invController.addInventory));
 
// Route to build inventory by classification view 
router.get("/type/:classificationId", invController.buildByClassificationId); 


// inventoryRoute.js
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView));
router.post("/add-classification", utilities.handleErrors(invController.addClassification));  


// Route for the new management view
router.get("/", invController.buildManagementView);    



// Process the login attempt
router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
  )

 

module.exports = router;