const express = require('express');
const blogController = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.post('/', blogController.createBlog);



module.exports = blogRouter;