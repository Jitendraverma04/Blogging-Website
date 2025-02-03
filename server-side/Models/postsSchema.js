import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        equired: true
    },
    creator_id: {
         type:String,
        required: true
    },
    thumbnail: {
       type: String, 
        required: true
    },
    createDate: {
        type: Date,
         default: Date.now
    },
    // updateDate: {
    //     type: Date,
    //     default: null
    // }
});

const postdata = mongoose.model('postdata', PostsSchema);

export default postdata;
