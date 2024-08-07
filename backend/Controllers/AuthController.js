const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res)=>{
     try{
        const {firstName, lastName, email, password, state, city, pincode, dateOfBirth } = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:"User already exists, you can login", success:false})
        }
       const userModel = new UserModel({firstName, lastName, email, password, state, city, pincode, dateOfBirth })
       userModel.password = await bcrypt.hash(password, 10);
       await userModel.save();
       res.status(201)
       .json({message:"Signup Successful",
        success : true
       })
     }catch(err){

        res.status(500)
        .json({message:"Internal server error",
         success : false
        })

     }
}

const login = async (req, res)=>{
    try{
       const { email, password} = req.body;
       const user = await UserModel.findOne({email});
       const errMsg = "Authentication failed, email or password is wrong"
       if(!user){
           return res.status(403)
           .json({message: errMsg, success:false})
       }
       //'password' is from client and 'user.password' is from db
     const isPasswordEqual = await bcrypt.compare(password, user.password) ;
     if(!isPasswordEqual){
        return res.status(403)
        .json({message: errMsg, 
         success:false})
     }

     const jwtToken = jwt.sign(
        {email: user.email, _id: user._id},
        process.env.JWT_SECRETE,
        {expiresIn : '24h'}
     )

      res.status(200)
           .json({message: "Login Success", 
            success:true,
            jwtToken,
            email: user.email,
            firstName: user.firstName
        
        })
    }catch(err){

       res.status(500)
       .json({message:"Internal server error",
        success : false
       })

    }
}

// const ageCalculator = async (req, res)=>{
//     try{
//        const {firstName, email,  } = req.body;
//        const user = await UserModel.findOne({email});
//        if(!user){
//            return res.status(409)
//            .json({message:"User is not Registered. Please signup first", success:false})
//        }
//        const userModel = new UserModel({firstName })
//     //   userModel.password = await bcrypt.hash(password, 10);
//     //   await userModel.save();
//       res.status(201)
//       .json({firstName: userModel.firstName,
//        success : true
//       })
//     }catch(err){

//        res.status(500)
//        .json({message:"Internal server error",
//         success : false
//        })

//     }
// }

module.exports = {
    signup,
    login
    // , ageCalculator
    
  
}