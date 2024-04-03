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





const updateContent= async (req, res, next)=>{
    const {title, description, image}=req.body
    const placeId=req.params.pid 
    let content;
    try{
      content= await contentModel.findById(placeId)
 
 
         }
         catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Something went wrong, could not update Content.' });
            return next(error);
        }

        if (content.creator.toString() !== req.userData.userId) {
          res.status(401).json({ msg: 'You are not allowed to edit this place.' });
          return next(error);
        }
        content.title=title
        content.description=description
        content.image=image
        try{
            await content.save()
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Something went wrong, could not update Content.' });
            return next(error);
        }
        res.status(200).json({ place: content.toObject({ getters: true }) });
 
    }



    
const deletContent = async (req, res, next) => {
  const conteId = req.params.pid;

  let conte;
  try {
    conte = await contentModel.findById(conteId).populate('creator');
  }catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong, could not delete Content.' });
    return next(error);
} 

  if (!conte) {
    const error = new Error('Could not find place for this id.', 404);
    return next(error);
  }

  if (conte.creator.id !== req.userData.userId) {
    const error = new Error(
      'You are not allowed to delete this Content.',
      401
    );
    return next(error);
  }

  //const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await conte.remove({ session: sess });
    conte.creator.content.pull(conte);
    await conte.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new Error(
      'Something went wrong, could not delete Content.',
      500
    );
    return next(error);
  }

//  fs.unlink(imagePath, err => {
  //  console.log(err);
 // });

  res.status(200).json({ message: 'Deleted Content.' });
};




export {createContent, updateContent, getContentByUserId , deletContent}