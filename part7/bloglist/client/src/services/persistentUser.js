export const getUser = () => window.localStorage.getItem("loggedBlogappUser");

export const saveUser = (user) =>
  window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

export const removeUser = () =>
  window.localStorage.removeItem("loggedBlogappUser");
