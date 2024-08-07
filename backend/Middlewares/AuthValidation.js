const Joi = require('joi')

const signupValidation = (req, res, next)=>{
      const schema = Joi.object({
        firstName : Joi.string().min(3).max(100).required(),
        lastName : Joi.string().min(3).max(100).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required(),
        state : Joi.string().min(3).max(100).required(),
        city : Joi.string().min(3).max(100).required(),
        pincode : Joi.string().min(6).max(6).required(),
        dateOfBirth : Joi.string().min(3).max(100).required(),
        
      });

      const {error} = schema.validate(req.body);
      if(error){
       return res.status(400)
       .json({message:"Bad Request", error});
      }
        next();

 }

 const loginValidation = (req, res, next)=>{
    const schema = Joi.object({
     
      email : Joi.string().email().required(),
      password : Joi.string().min(4).max(100).required(),
    
      
    });

    const {error} = schema.validate(req.body);
    if(error){
     return res.status(400)
     .json({message:"Bad Request", error});
    }
      next();

    }

    module.exports = {
        signupValidation,
        loginValidation
    }