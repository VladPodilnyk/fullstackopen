const Blog = require('../models/bloglist');

const initData = [
  {
    title: 'test1',
    author: 'author1',
    url: 'dummy-url1',
    likes: 5,
  },
  {
    title: 'test1',
    author: 'author1',
    url: 'dummy-url1',
    likes: 5,
  }
];

const getAllBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map(value => value.toJSON());
};

module.exports = {
  initData: initData,
  getAllBlogs: getAllBlogs
};