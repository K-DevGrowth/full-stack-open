const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const likes = Math.max(...blogs.map((blog) => blog.likes));
  const blog = blogs.find((blog) => blog.likes === likes);
  return blogs.length === 0 ? 0 : blog;
};

module.exports = { dummy, totalLikes, favoriteBlog };
