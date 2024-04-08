import { check, validationResult } from "express-validator";
const useValidator=[
  check("email").isEmail().withMessage("Invalid email format").isLength({ min: 5 }).withMessage("Email must be at least 5 characters long"),
  check("name").isString().withMessage("Name must be a string").isLength({ min: 4 }).withMessage("Name must be at least 4 characters long"),
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  //check("old").isNumeric().withMessage("Age must be a number").isInt({ min: 1, max: 99 }).withMessage("Age must be between 1 and 99"),
 // check("tall").optional().isNumeric().withMessage("Height must be a number"),
  check("gender").isString(),


]
const useValidatorContent=[
  check('title').notEmpty().withMessage('Title is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('image').notEmpty().isURL()


]

const logInValidator= [
  check("email").isEmail().withMessage("Invalid email format").isLength({ min: 5 }).withMessage("Email must be at least 5 characters long"),
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),


]


const validate = (req, res, next) => {
  console.log("st"+req.body)
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return  res.status(422).json({ errors: errors.array() });
    }
  next()

  };

  export {validate, useValidator, useValidatorContent, logInValidator}