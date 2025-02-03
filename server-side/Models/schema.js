import mongoose from "mongoose";

const BlogUSerRegisterSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
})

const formdata = mongoose.model('formdata', BlogUSerRegisterSchema);

export default formdata;