const mongoose = require('mongoose');
const supertest = require('supertest');
const testHelpers = require('./test_helpers');

const Blog = require('../models/bloglist');

const app = require('../app');
const api = supertest(app);

describe('bloglist API', () => {

  beforeEach(async () => {
    // clean up DB before running tests
    await Blog.deleteMany({});

    // create Blogs objects to insert into a DB.
    const blogs = testHelpers.initData.map(blog => new Blog(blog));
    const promises = blogs.map(value => value.save());
    // await all async tasks to complete
    await Promise.all(promises);
  });

  test('responds with json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('created object has property id', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body[0].id).toBeDefined();
  });

  test('allow add a bloglist', async () => {
    const data = {
      title: 'rnd-title',
      author: 'rnd-author',
      url: 'some url',
      likes: 5
    };

    await api.post('/api/blogs')
      .send(data)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const updatedData = await testHelpers.getAllBlogs();
    expect(updatedData).toHaveLength(testHelpers.initData.length + 1);

    const titles = updatedData.map(value => value.title);
    expect(titles).toContain('rnd-title');
  });

  test('likes property set to zero by defult', async () => {
    const data = {
      title: 'rnd-title2',
      author: 'rnd-author2',
      url: 'some url2',
    };

    const result = await api.post('/api/blogs')
      .send(data)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(result.body.likes).toBeDefined();
    expect(result.body.likes).toBe(0);

    const updatedData = await testHelpers.getAllBlogs();
    expect(updatedData).toHaveLength(testHelpers.initData.length + 1);
  });

  test('title and url fields are mandatory', async () => {
    const data = {
      author: 'rnd-author2',
      likes: 200,
    };

    await api.post('/api/blogs')
      .send(data)
      .expect(400);


    const updatedData = await testHelpers.getAllBlogs();
    expect(updatedData).toHaveLength(testHelpers.initData.length);
  });

  test('allows delete blog by id', async () => {
    let blogs = await testHelpers.getAllBlogs();

    await api.delete(`/api/blogs/${blogs[0].id}`).expect(204);
    blogs = await testHelpers.getAllBlogs();
    expect(blogs).toHaveLength(testHelpers.initData.length - 1);
  });

  test('allows update blog by id', async () => {
    let blogs = await testHelpers.getAllBlogs();
    const blogToUpdate = blogs[0];
    //const etalon = testHelpers.initData.find(value => value.title === blogToUpdate.title);

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 100 })
      .expect(200);

    blogs = await testHelpers.getAllBlogs();
    const udpatedBlog = blogs.find(value => value.id === blogToUpdate.id);
    expect(udpatedBlog.likes).toBe(100);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
