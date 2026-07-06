import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, getAll, remove } from "../services/blogs";
import { useNotify } from "./useNotify";

const useBlogs = () => {
  const queryClient = useQueryClient();

  const { notifyAddBlog } = useNotify();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    createBlogMutation: (newObject) =>
      createBlogMutation.mutateAsync(newObject),
    removeBlogMutation: (id) => removeBlogMutation.mutateAsync(id),

    disableButton: createBlogMutation.isPending,
  };
};

export default useBlogs;
