import mongoose from "mongoose";

const DocSchema = new mongoose.Schema({
    email: { type: String,required:true },
    doc:[{
        alias:{type:String,unique:true},
        data:{type:String}
    }]
   
},
     { timestamps: true },
);

export default mongoose.models.Doc || mongoose.model("Doc", DocSchema);
