const express = require('express');
const router = express.Router();
const PostModel = require('./model')
const cors = require('cors')

router.use(cors())

router.post('/posts', async (req, res) => {

    const post = new PostModel(req.body)
    
    await post.save();
    res.send(post);

})

router.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;

    const post = await PostModel.findById(postId)

    res.send(post);

})

router.get('/allposts', async (req, res) => {

    const post = await PostModel.find({})

    res.send(post);

})
// Add a comment to a post
router.post('/posts/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId;
        const comment = req.body.comment;

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.comments.push({ text: comment });
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a reply to a comment
router.post('/posts/:postId/comments/:commentId/replies', async (req, res) => {

    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const reply = req.body.reply;

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        comment.replies.push({ text: reply });
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;
