import contentModel from "../models/contecnt-Schema.js";
import userModel from "../models/userSchema.js";




const getContentByUserId = async (req, res) => {
    const userId = req.params.uid;
  

    let userContent;
    try {
      userContent = await userModel.findById(userId).populate('content');
    } catch  {
    
        console.error(error);
        res.status(500).json({ msg:  'Fetching Content failed, please try again later.' });

    }
  
   
    if (!userContent || userContent.content.length === 0) {
      return next(
        new Error ('Could not find places for the provided user id.', 404)
      );
    }
  
    res.json({
        content: userContent.content.map(place =>
        place.toObject({ getters: true })
      )
    });
  };
  



const createContent= async (req, res, next)=>{
    const {title, description}=req.body
    
  const createdContent = new contentModel({
    title,
    description,
 
    creator: req.userData.userId
  });
  let user;
  try {
    user = await userModel.findById(req.userData.userId);
  } catch  {
    res.status(500).json({msg:'Creating place failed, please try again.'})
      
      
  
    return next();
  }
  if(!user){
    res.status(500).json({msg:'Creating place failed, please try again.'})

  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdContent.save({ session: sess });
    user.content.push(createdContent);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch {
   
    res.status(500).json({msg:'Creating place failed, please try again.'})
    return next();
  }

  res.status(201).json({ content: createdContent });

}





const updatePlace= async (req, res)=>{
    const {title, description, image}=req.body
    const placeId=req.params.pid 
    let place;
    try{
        place= await contentModel.findById(placeId)
 
 
         }
         catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Something went wrong, could not update place.' });
        }
        place.title=title
        place.description=description
        place.image=image
        try{
            await place.save()
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Something went wrong, could not update place.' });
        }
 
    }




export {createContent, updatePlace, getContentByUserId}