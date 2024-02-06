//Needed Resources 
const express = require("express") 
const router = new express.Router() 
const invController = require("../controllers/invController")    
const utilities = require("../utilities"); 
 
 
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