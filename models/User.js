import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact:{ type: String},
  email: { type: String, required: true, index: true, unique:true },
   profilepic: {
    url:{
      type:String
    },
    name:{
      type:String
    }
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
