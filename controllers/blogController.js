const Blog = require('../model/blogModel');
const { reading_time } = require('../algorithms/reading_time')


exports.createBlog = async (req, res) => {
    try {

        // Get Blog details from the request and destructure it
        const { title, description, tags, body } = req.body
        console.log(req.user)
        // create blog object
        const BlogObj = new Blog({
            title,
            description: description || title,
            tags,
            author: req.user._id,
            body,
            reading_time: reading_time(body)
        })
        // save to database
        const newblog = await BlogObj.save()
        // return response
        return res.status(201).json({
            status: true,
            data: newblog,
        })
        
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message)
    }
}