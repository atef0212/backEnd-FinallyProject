import { check, validationResult } from "express-validator";
const useValidator=[
    [check("email").isEmail().isLength({min:5})],
    [check("name").isString().isAlphanumeric().isLength({min:4})],
    [check("password").escape().isLength({min:8})]

]


const validate = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return  res.status(422).json({ errors: errors.array() });
    }
  next()

  };

  export {validate, useValidator}