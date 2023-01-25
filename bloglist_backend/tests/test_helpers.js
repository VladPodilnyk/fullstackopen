const Blog = require('../models/bloglist');
const User = require('../models/users');

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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initData,
  getAllBlogs,
  usersInDb
};