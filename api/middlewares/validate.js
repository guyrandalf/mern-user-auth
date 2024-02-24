const validator = require("../helpers/validate")

const saveUser = (req, res, next) => {
    const validationRule = {
        firstName: "required|string",
        lastName: "required|string",
        email: "required|email",
        password: "required|string",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            const validationErrors = [];
            // Collect custom error messages
            if (err.firstName) validationErrors.push(err.firstName[0]);
            if (err.lastName) validationErrors.push(err.lastName[0]);
            if (err.email) validationErrors.push(err.email[0]);
            if (err.password) validationErrors.push(err.password[0]);
            
            res.status(412).send({
                success: false,
                message: "Validation Failed",
                errors: validationErrors,
            })
        } else {
            next()
        }
    })
}

module.exports = { saveUser }