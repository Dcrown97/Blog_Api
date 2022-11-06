const express = require('express');
const blogController = require('../controllers/blogController');
const userToken = require('../middleware/userToken')
const authorizationToken = require('../middleware/authorizationToken')

const blogRouter = express.Router();

blogRouter.post('/create_blog', authorizationToken, userToken, blogController.createBlog);
blogRouter.get('/all_blogs', blogController.getPublishedBlogs);
blogRouter.get('/single_blog/:id', blogController.getSinglePublishedBlog);
blogRouter.get('/user_blog', authorizationToken, userToken, blogController.getBlogByAuthor);
blogRouter.put('/edit_blog/:id', authorizationToken, userToken, blogController.editBlog);
blogRouter.delete('/delete_blog/:id', authorizationToken, userToken, blogController.deleteBlog);



module.exports = blogRouter;