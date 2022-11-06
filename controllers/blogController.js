const Blog = require('../model/blogModel');
const { reading_time } = require('../algorithms/reading_time')
const { sort } = require('../algorithms/sort')


exports.createBlog = async (req, res) => {
    try {
        // Get Blog details from the request and destructure it
        const { title, description, tags, body } = req.body
        //check if the blog title exist before
        const checkTitle = await Blog.findOne({ title })
        if (checkTitle) {
            return res.status(400).send('Title Already Exist');
        }
        // create blog object
        const BlogObj = new Blog({
            title,
            description: description || title,
            tags,
            author: req.user._id,
            body,
            reading_time: reading_time(body)
        })
        // save blog to database
        const newblog = await BlogObj.save()
        // return response
        return res.status(200).json({
            message: "Blog created successfully",
            data: newblog,
        })

    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message)
    }
}

exports.getPublishedBlogs = async (req, res) => {
    try {
        //query request object
        let { author, page, title, tags, order_by } = req.query;
        //default limit to 20per page
        const limit = 20;
        page = page ? page : 1;
        //filter object and push to an array
        const filterObj = [{ state: "published" }];
        if (author) {
            filterObj.push({ author: author })
        }
        if (title) {
            filterObj.push({ "title": { $regex: `${title}` }, })
        }
        if (tags?.length > 0) {
            filterObj.push({ tags: { $all: tags } })
        }
        let sort_by = {};
        sort_by[order_by] = -1

        // get blog that belongs filter by obj and sort
        const publishedBlogs = await Blog.find(
            {
                $and: filterObj
            }
        ).limit(limit).skip(+page == 1 ? 0 : (+page - 1) * limit).sort(sort_by);
        // return error
        if (!publishedBlogs) {
            return res.status(400).json({ status: false, blog: publishedBlogs })
        }
        //return response
        return res.json({ status: true, publishedBlogs })
    } catch (error) {
        return res.status(404).send(error)
    }
}


exports.getSinglePublishedBlog = async (req, res) => {
    try {
        //Get a single published blog
        const id = req.params.id
        const getSingleBlog = await Blog.findOne({ _id: id, state: 'published' }).populate({ path: 'author', select: ['first_name', 'last_name', 'email'] })
        await Blog.updateOne({ _id: id }, { read_count: getSingleBlog.read_count + 1 })
        if (!getSingleBlog) {
            return res.status(404).send('Blog not found');
        }
        // return response
        return res.status(200).json({
            status: true,
            data: getSingleBlog,
        })

    } catch (err) {
        return res.status(400).send(err.message)
    }
}

exports.getBlogByAuthor = async (req, res) => {
    try {
        // geet user from request
        const user = req.user;
        // query the request object
        let { state, page } = req.query;
        // paginate
        const limit = 5;
        page = page ? page : 1
        // get blog that belongs to a author
        const blog = await Blog.find(state ? {
            author: user._id,
            state
        } : { author: user._id, },
        ).limit(limit).skip(+page == 1 ? 0 : (+page - 1) * limit)

        return res.json({ status: true, blog })
    } catch (error) {
        return res.status(400).send(error)
    }
}

exports.editBlog = async (req, res) => {
    try {
        // Get Blog details from the request and destructure it
        const { title, description, tags, body, state } = req.body
        // get the blog id
        const id = req.params.id
        // find blog with the id
        const checkId = await Blog.findOne({ _id: id })
        // find blog by title 
        const checkTitle = await Blog.findOne({ title })
        //get user from request
        const user = req.user;
        //check if blog exist
        if (!checkId) {
            return res.status(400).send('Blog not found');
        }

        // check if user is the owner of the blog
        if (checkId.author.toString() !== user._id.toString()) {
            return res.status(400).send('Not authorized to update blog');
        }
        // check if the new title does not equal to the previous title
        if (checkTitle && checkId.title !== title) {
            return res.status(400).send('Title already exist');
        }

        //update blog
        await Blog.updateOne({ _id: id }, {
            title: title ?? checkId.title,
            state: state ?? checkId.state,
            description: description ?? checkId.description,
            tags: tags ?? checkId.tags,
            body: body ?? checkId.body,
            reading_time: reading_time(body) ?? checkId.reading_time
        });

        // fetch and return updated blog
        const updatedBlog = await Blog.findOne({ _id: id })

        // return response
        return res.status(200).json({
            message: "Blog Updated Successfully",
            data: updatedBlog,
        })

    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message)
    }
}


exports.deleteBlog = async (req, res) => {
    try {
        //get requuest id
        const id = req.params.id
        //find blog by id
        const checkId = await Blog.findOne({ _id: id })
        //get user from request
        const user = req.user;
        //check if blog exist
        if (!checkId) {
            return res.status(400).send('Blog not found');
        }
        // check if user is the owner of the blog
        if (checkId.author.toString() !== user._id.toString()) {
            return res.status(400).send('Not authorized to delete blog');
        }
        //delete blog
        await Blog.deleteOne({ _id: id })

        // return response
        return res.status(200).json({
            status: true,
            message: 'Blog deleted successful'
        })

    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message)
    }
}