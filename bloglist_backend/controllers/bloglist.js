const jwt = require('jsonwebtoken');
const bloglistRouter = require('express').Router();
const verifier = require('../domain/verifier');
const Blog = require('../models/bloglist');
const User = require('../models/users');

// TODO: refactor it to middleware (ex. 4.20-4.21)
const getWebTokenFromRequest = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

bloglistRouter.get('/', async (_, response) => {
  const result = await Blog.find({});
  response.json(result);
});

bloglistRouter.post('/', async (request, response) => {
  const data = request.body;
  const decodedToken = jwt.verify(getWebTokenFromRequest(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }


  if (verifier.isTitleAndUrlDefined(data)) {
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: data.title,
      url: data.url,
      likes: data?.likes ? data.likes : 0,
      user: user._id,
    });

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } else {
    response.status(400).end();
  }
});

bloglistRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const data = {
    ...body
  };

  const updatedData = await Blog.findByIdAndUpdate(id, data, { new: true });
  response.json(updatedData);
});

bloglistRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  console.log(`Blog with id ${request.params.id} was successfully removed`);
  response.status(204).end();
});

module.exports = bloglistRouter;