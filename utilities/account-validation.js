const accountModel = require("../models/account-model");
const utilities = require("../utilities/index");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.registrationRules = () => {
    return [
        body("account_firstname")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a first name."),

        body("account_lastname")
            .trim()
            .isLength({ min: 2 })
            .withMessage("Please provide a last name."),

        body("account_email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required.")
            .custom(async (account_email) => {
                const emailExists = await accountModel.checkExistingEmail(account_email);
                if (emailExists) {
                    throw new Error("Email exists. Please log in or use a different email");
                }
            }),

        body("account_password")
            .trim()
            .isStrongPassword({
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements."),
    ];
};

validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        });
        return;
    }
    next();
};

module.exports = validate;
