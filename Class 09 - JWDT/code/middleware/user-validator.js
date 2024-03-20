import Joi from "joi";

// Creating a validation scheme with Joi
const userSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    role: Joi.string().valid("admin", "standard").required()
});

// Middleware function to validate the user data
const userValidator = (req, res, next) => {
    const userData = req.body;
    // Validating the user data
    const validation = userSchema.validate(userData);

    // Checking if the validation failed
    if (validation.error) {
        res.status(400).send({
            message: validation.error.details[0].message
        });
    } else {
        next();
    }
};

export default userValidator;