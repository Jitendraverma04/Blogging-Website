
import bcrypt from 'bcrypt';
import express from 'express';
import formdata from '../Models/schema.js';
import postdata from '../Models/postsSchema.js';
import cors from 'cors';

import bodyParser from "body-parser"

const route = express();
route.use(cors());

route.use(bodyParser.json());






const allAuthors = (async (req, res) => {
    console.log("authors:::-")
    try {
        const authors = await formdata.find();
        const posts = await postdata.find();

        if (authors.length > 0) {
            const authorPostsCount = {};

            posts.forEach(post => {
                if (authorPostsCount[post.creator_id]) {
                    authorPostsCount[post.creator_id]++;
                } else {
                    authorPostsCount[post.creator_id] = 1;
                }
            });

            const authorsWithPostsCount = authors.map(author => {
                return {
                    _id: author._id,
                    name: author.name,
                    email: author.email,
                    post_count: authorPostsCount[author._id.toString()] || 0
                };
            });

            res.status(200).json(authorsWithPostsCount);

        } else {
            res.status(404).json("No authors found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Failed to fetch data.");
    }
});





const createPost = async (req, res) => {
    console.log("createpost")

    const { title, category, description, creator_id, createDate } = req.body;
    
    const thumbnailPath = req.file.path;
    try {
        const dataObj = {
            title: title,
            category: category,
            description: description,
            creator_id: creator_id,
            thumbnail: thumbnailPath,
            createDate: createDate,
        };
        await postdata.insertMany([dataObj]);
        res.statusCode = 200;
        res.json("Post successfully stored");
    } catch (e) {
        res.statusCode = 500;
        console.error(e);
        res.json("Failed to store post");
    }
};






const homeData = (async (req, res) => {
    console.log("homedata")

    try {
        const authors = await formdata.find();
        const posts = await postdata.find();

        if (authors.length > 0) {
            const authorPostsCount = {};

            posts.forEach(post => {
                if (authorPostsCount[post.creator_id]) {
                    authorPostsCount[post.creator_id]++;
                } else {
                    authorPostsCount[post.creator_id] = 1;
                }
            });

            const authorsWithPostsCount = authors.map(author => {
                return {
                    _id: author._id,
                    name: author.name,
                    email: author.email,
                    post_count: authorPostsCount[author._id.toString()] || 0
                };
            });



            res.status(200).json({ authorsWithPostsCount, posts });

        } else {
            res.status(404).json("No authors found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Failed to fetch data.");
    }
})







const updateData = (async (req, res) => {
    console.log("updateData")
    const { email, password, name, id } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    try {

        await formdata.updateOne({ _id: id }, {
            $set: {
                name: name,
                email: email,
                password: hashedPassword
            }
        }

        )

        const updateDataCheck = await formdata.findOne({ email: email })
        res.status(200);
        res.json({ updateDataCheck })
    }
    catch (e) {
        res.statusCode = 500;
        res.json("fail")
        console.log(e)
    }
})





const deletePost = (async (req, res) => {
    try {
        const { postId } = req.params;

        const deletedPost = await postdata.deleteOne({ _id: postId });
        res.status(200).json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json("Failed to delete post.");
    }
});






// route.get("/uploads/:imageId", (req, res)=>{
//     const imageId = req.params.imageId;
//     const filePath = path.join(__dirname, `../uploads/${imageId}`);
//     console.log(filePath);

//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//           if (err.code === 'ENOENT') {
//             res.status(404).json({ error: 'File not found' });
//           } else {
//             res.status(500).json({ error: 'Internal server error' });
//           }
//         } else {
//           res.set('Content-Type', 'image/jpeg'); // Set the MIME type for JPEG images
//           res.send(data);
//         }
//       });
// })

// export default route;

export { allAuthors, homeData, updateData, createPost, deletePost };