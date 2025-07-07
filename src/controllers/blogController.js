import Blog from "../models/blogModel.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id });
    res.json(blogs);
  } catch (err) {
    res.status(500).send(`Error occurred inside getBlogs: ${err.message}`);
  }
};

export const addBlog = async (req, res) => {
  try {
    const { blog_title, blog_content, status } = req.body;
    const blog = new Blog({
      title: blog_title,
      content: blog_content,
      status,
      author: req.user.id,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).send(`Error occurred inside getBlogs: ${err.message}`);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      author: req.user.id,
    });
    if (!blog) return res.status(404).send("Blog not found");
    res.json(blog);
  } catch (err) {
    res.status(500).send(`Error occurred inside getBlogById: ${err.message}`);
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const { blog_title, blog_content, status } = req.body;
    const dataToUpdate = {
      ...(blog_title && { title: blog_title }),
      ...(blog_content && { content: blog_content }),
      ...(status && { status }),
      updatedAt: Date.now(),
    };

    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      dataToUpdate,
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).send("Blog not found");
    res.json(blog);
  } catch (err) {
    res
      .status(500)
      .send(`Error occurred inside updateBlogById: ${err.message}`);
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });
    if (!blog) return res.status(404).send("Blog not found");
    res.send("Blog deleted");
  } catch (err) {
    res
      .status(500)
      .send(`Error occurred inside updateBlogById: ${err.message}`);
  }
};
