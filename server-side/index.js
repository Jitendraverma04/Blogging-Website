import express from 'express';
import bodyParser from "body-parser"
import cors from 'cors';
import DBConnection from "./DataBase/db.js"
const app = express();
import { allAuthors, homeData, updateData, createPost, deletePost } from "./Routes/route.js"
import {middleware} from './Middleware/Auth.js';
import {verifyToken} from './Middleware/Auth.js';
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('uploads'))



DBConnection();

// import {} from 'dotenv/config'

import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.post('/createPost', upload.single('thumbnail'), verifyToken,createPost);


app.post("/register",middleware);
app.post("/login",middleware);
app.get("/allauthors",verifyToken,allAuthors)
app.get("/homedata",verifyToken,homeData)
// app.get("/uploads/:imageId",createPost);
app.post("/updatedata",verifyToken,updateData);

app.delete("/deletePost/:postId",verifyToken,deletePost);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));