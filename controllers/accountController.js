const bcrypt = require("bcryptjs");
const utilities = require("../utilities");
const accountModel = require("../models/account-model");

//login function
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  const registrationSuccessMessage = req.flash("notice")[0];
  res.render("account/login", {
    title: "Login",
    nav,
    registrationSuccessMessage,
  });
}

async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  });
}

//Register new client
async function registerAccount(req, res) {
  let nav = await utilities.getNav();
  const { account_firstname, account_lastname, account_email, account_password } = req.body;

  // Hash the password before storing
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
    req.flash(
      'success',
      `Congratulations, you're registered ${account_firstname}. Please log in.`
    );
    return res.redirect('/account/login');
  } else {
    req.flash('error', 'Sorry, the registration failed.');
    return res.status(501).render('account/register', {
      title: 'Registration',
      nav,
    });
  }
}

module.exports = { buildLogin, buildRegister, registerAccount };
