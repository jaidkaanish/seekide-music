import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
    try {
      const {id , firstName , lastName , imageUrl} = req.body;
    
      const user = await User.findOne({ clerkId: id });
      if(!user) {
        const newUser = await User.create({
          fullName: `${firstName || "" } ${lastName || "" }`.trim(),
          imageUrl,
          clerkId: id,
        });
        return res.status(201).json({success: true});
      }
    
    } catch (error) {
      console.log('Error in auth route:', error);
      next(error);
    }
    }