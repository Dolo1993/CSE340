const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");
const utilities = require("../utilities");

// Route for rendering the default account view
router.get("/default", utilities.handleErrors(accountController.buildDefault));


// Route for user login
router.get("/login", utilities.handleErrors(accountController.buildLogin)); 
router.post("/login", utilities.handleErrors(accountController.processLogin));

// Route for user registration
router.get("/register", utilities.handleErrors(accountController.buildRegister)); 
router.post("/register", regValidate.registrationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount));

module.exports = router;
