// const jwtToken = require('jsonwebtoken')
// const ensureAuthentication=(req, res, next)=>{

//      const auth = req.headers['Authorization'];
//      if(!auth){
//         return res.status(403)
//         .json({message:'Unauthorized, JWT Token is required'});
//      }
//      try{
//         const decoded = jwtToken.verify(auth, process.env.JWT_SECRETE);
//         req.user = decoded;
//         next();
//      }catch(err){
//         return res.status(403)
//         .json({message:'Unauthorized, JWT Token is wrong or expired'});

//      }
// }

// module.exports = ensureAuthentication;