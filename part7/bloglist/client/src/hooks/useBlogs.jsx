import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, getAll, postComment, remove, update } from "../services/blogs";
import { useNotify } from "./useNotify";

const useBlogs = () => {
  const queryClient = useQueryClient();

  const { notifyAddBlog, notifyRemoveBlog, notifyLikeBlog } = useNotify();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
  });

  const createBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newObject) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notifyAddBlog({ success: true, blog: newObject });
    },
    onError: () => {
      notifyAddBlog({ success: false });
    },
  });

  const removeBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notifyRemoveBlog({
        success: true,
        blog: result.data.find((blog) => blog.id === id),
      });
    },
    onError: () => {
      notifyRemoveBlog({ success: false });
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: ({ id, blogObject }) => update(id, blogObject),
    onSuccess: (blogObject) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notifyLikeBlog({ success: true, blog: blogObject });
    },
    onError: () => {
      notifyLikeBlog({ success: false });
    },
  });

  const postCommentToBlogMutation = useMutation({
    mutationFn: ({ id, comment }) => postComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    createBlog: (newObject) => createBlogMutation.mutateAsync(newObject),
    removeBlog: (id) => removeBlogMutation.mutateAsync(id),
    likeBlog: (payload) => likeBlogMutation.mutateAsync(payload),
    postCommentToBlog: (payload) =>
      postCommentToBlogMutation.mutateAsync(payload),
    disableButton: createBlogMutation.isPending,
  };
};

export default useBlogs;
