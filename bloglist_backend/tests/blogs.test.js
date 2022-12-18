const listHelper = require('../utils/list_helpers');

describe('bloglist helpers', () => {
  test('dummy returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });

  test('return totalLikes for bloglist', () => {
    const listWithOneBlog = [
      {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      }
    ];

    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});