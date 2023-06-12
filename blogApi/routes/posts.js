const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const mongoose = require('mongoose');
//CREATE POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });

                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('Sadece kendi gönderilerinizi güncelleyebilirsiniz.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json('Gönderi silindi.');
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('Sadece kendi gönderilerinizi silebilirsiniz !');
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET ALL POST
router.get('/', async (req, res) => {
    const userName = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (userName) {
            posts = await Post.find({ username: userName })
        }
        else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            })
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Add comment
router.put('/:id/comments', async (req, res) => {
    try {
        let addComment = await Post.findByIdAndUpdate(req.params.id, {
            $push: {
                comments: { username: req.body.username, content: req.body.content,profilePic:req.body.profilePic }
            }
        }, { new: true });

        res.status(200).json(addComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE COMMENT
router.delete('/:id/comments/:cId/delete', async (req, res) => {
    try {
        await Post.findById(req.params.id, async (err, post) => {
            const filteredComments = post.comments.filter(e => {
                if (mongoose.Types.ObjectId(e._id).toString() !== req.params.cId) {
                    return e;
                }
            })
            post.comments = filteredComments
            await post.save();
            res.status(200).json(post);

        }).clone().catch(err => res.status(500).json(err))
    } catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE COMMENT
// router.put('/:id/comments/:cId/update', async (req, res) => {
//     try {
//         await Post.findById(req.params.id, async (err, post) => {
//             const filteredComments = post.comments.filter(e => {
//                 if (mongoose.Types.ObjectId(e._id).toString() === req.params.cId) {
//                  return e.content = req.body.content
//                 }
//             })
//             // post.comments.push(filteredComments[0]);
//             // await post.save();
//             // res.status(200).json(post);

//         }).clone().catch(err => res.status(500).json(err))
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

//GET ALL COMMENTS
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Post.findById(req.params.id);
        res.status(200).json(comments.comments);
    } catch (err) {
        res.status(500).json(err);
    }
})

//ADD VIEWS
router.put('/:id/view', async (req, res) => {
    try {
        let addView = await Post.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        }, { new: true });

        res.status(200).json(addView);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;