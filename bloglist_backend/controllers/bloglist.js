const bloglistRouter = require('express').Router();
const verifier = require('../domain/verifier');
const Blog = require('../models/bloglist');

bloglistRouter.get('/', async (_, response) => {
  const result = await Blog.find({});
  response.json(result);
});

bloglistRouter.post('/', async (request, response) => {
  let data = request.body;
  if (verifier.isTitleAndUrlDefined(data)) {
    data = verifier.setLikesDefultValue(data);
    const blog = new Blog(data);
    const result = await blog.save();
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