const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const utilities = require("../utilities");
const accountModel = require("../models/account-model");


// Function to render the login view
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav(); 
  const registrationSuccessMessage = req.flash("notice")[0];  
  res.render("account/login", {  
    title: "Login",
    nav,
    registrationSuccessMessage,
  });
}

// Function to process the login attempt
async function processLogin(req, res, next) {
  const { account_email, account_password } = req.body;  

  try {
    const user = await accountModel.getAccountByEmail(account_email);  
    if (!user) { // If user does not exist
      req.flash('error', 'Invalid email or password');  
      return res.redirect('/account/login');  
    }

    const passwordMatch = await bcrypt.compare(account_password, user.account_password);  

    if (passwordMatch) {  
      req.session.user = user;  
      return res.redirect('/account/default');  
    } else {  
      req.flash('error', 'Invalid email or password');  
      return res.redirect('/account/login');  
    }
  } catch (error) { 
    console.error("Error processing login:", error); 
    req.flash('error', 'An unexpected error occurred. Please try again later.'); 
    return res.redirect('/account/login');  
  }
}

// Function to render the registration view
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();  
  res.render("account/register", {  
    title: "Register",
    nav,
    errors: null,
  });
}

// Function to register a new account
async function registerAccount(req, res) {
  let nav = await utilities.getNav();  
  const { account_firstname, account_lastname, account_email, account_password } = req.body;  

  let hashedPassword;
  try {
    hashedPassword = bcrypt.hashSync(account_password, 10); 
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.'); 
    return res.status(500).render("account/register", {  
      title: "Registration",
      nav,
      errors: null,
    });
  }

  const regResult = await accountModel.registerAccount(  
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  );

  if (regResult) { 
    req.flash('success', `Congratulations, you're registered ${account_firstname}. Please log in.`);  
    return res.redirect('/account/login');  
  } else { 
    req.flash('error', 'Sorry, the registration failed.');  
    return res.status(501).render('account/register', { 
      title: 'Registration',
      nav,
    });
  }
}

// Function to render the default view
async function buildDefault(req, res, next) {
  let nav = await utilities.getNav();  
  res.render("account/default", { 
    title: "Default",
    nav
  });
}

module.exports = { buildLogin, processLogin, buildRegister, registerAccount, buildDefault }; 
