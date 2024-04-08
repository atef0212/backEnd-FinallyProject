// Import necessary modules
import contentModel from "../models/contecnt-Schema.js";
import userModel from "../models/userSchema.js";

// Function to get content by user ID
const getContentByUserId = async (req, res) => {
    const userId = req.params.uid;

    try {
        // Find user by ID and populate content field
        const userContent = await userModel.findById(userId).populate('content');
        
        // If user content is not found or empty, return error
        if (!userContent || userContent.content.length === 0) {
            return res.status(404).json({ msg: 'Could not find places for the provided user id.' });
        }
        
        // If content found, return content
        res.json({
            content: userContent.content.map(place => place.toObject({ getters: true }))
        });
    } catch (error) {
        // If any error occurs, handle it and return error response
        console.error(error);
        res.status(500).json({ msg: 'Fetching Content failed, please try again later.' });
    }
};

// Function to create new content
const createContent = async (req, res, next) => {
    const { title, description } = req.body;

    // Create new content instance
    const createdContent = new contentModel({
        title,
        description,
        creator: req.userData.userId
    });

    let user;
    try {
        // Find user by ID
        user = await userModel.findById(req.userData.userId);
        // If user not found, return error
        if (!user) {
            return res.status(500).json({ msg: 'Creating place failed, please try again.' });
        }

        // Start session and transaction
        const sess = await mongoose.startSession();
        sess.startTransaction();

        // Save created content and update user content list
        await createdContent.save({ session: sess });
        user.content.push(createdContent);
        await user.save({ session: sess });

        // Commit transaction
        await sess.commitTransaction();

        // Return success response
        res.status(201).json({ content: createdContent });
    } catch (error) {
        // If any error occurs, handle it and return error response
        console.error(error);
        res.status(500).json({ msg: 'Creating place failed, please try again.' });
        return next();
    }
};

// Function to update existing content
const updateContent = async (req, res, next) => {
    const { title, description, image } = req.body;
    const placeId = req.params.pid;

    let content;
    try {
        // Find content by ID
        content = await contentModel.findById(placeId);
        
        // If content not found, return error
        if (!content) {
            return res.status(404).json({ msg: 'Could not find place for the provided ID.' });
        }

        // Check if the user is authorized to update the content
        if (content.creator.toString() !== req.userData.userId) {
            return res.status(401).json({ msg: 'You are not allowed to edit this place.' });
        }

        // Update content fields
        content.title = title;
        content.description = description;
        content.image = image;

        // Save updated content
        await content.save();

        // Return success response
        res.status(200).json({ place: content.toObject({ getters: true }) });
    } catch (error) {
        // If any error occurs, handle it and return error response
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong, could not update Content.' });
        return next(error);
    }
};

// Function to delete content
const deletContent = async (req, res, next) => {
    const conteId = req.params.pid;

    let conte;
    try {
        // Find content by ID and populate creator field
        conte = await contentModel.findById(conteId).populate('creator');
        
        // If content not found, return error
        if (!conte) {
            return res.status(404).json({ msg: 'Could not find place for this id.' });
        }

        // Check if the user is authorized to delete the content
        if (conte.creator.id !== req.userData.userId) {
            return res.status(401).json({ msg: 'You are not allowed to delete this Content.' });
        }

        // Start session and transaction
        const sess = await mongoose.startSession();
        sess.startTransaction();

        // Remove content and update user content list
        await conte.remove({ session: sess });
        conte.creator.content.pull(conte);
        await conte.creator.save({ session: sess });

        // Commit transaction
        await sess.commitTransaction();

        // Return success response
        res.status(200).json({ message: 'Deleted Content.' });
    } catch (error) {
        // If any error occurs, handle it and return error response
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong, could not delete Content.' });
        return next(error);
    }
};

// Export functions
export { createContent, updateContent, getContentByUserId, deletContent };
