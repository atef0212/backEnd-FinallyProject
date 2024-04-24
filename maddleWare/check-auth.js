import  jwt  from "jsonwebtoken";



export function checkAuth (req, res, next){
  
    try{
          const token=req.headers.authorization.split(' ')[1]
         if(!token){
            throw new Error("authentication faild!")
        }
     const decodedToken= jwt.verify(token, "secretKey") 
        req.userData={userId: decodedToken.userId}
     next()
   
    }catch (error){
     res.status(401).json({msg:'Authentication failed!.'}) 
       return next(error);
    }
   

}