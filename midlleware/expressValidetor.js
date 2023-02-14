const { body, validationResult } = require('express-validator');
exports.registerValidator=[
    body("email",'please put a valid email').isEmail(),
    body("password",'please put a password with min 6 carcter').isLength({min:6})
]

exports.loginValidator=[
    body("email",'please put a valid email').isEmail(),
   
]

exports.Validation=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}



