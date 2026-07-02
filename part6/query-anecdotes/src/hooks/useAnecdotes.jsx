import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNew, getAnecdotes, update } from "../requests";
import useNotify from "./useNotify";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { displayVoteNotification, displayAddNotification } = useNotify();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  const createAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      displayAddNotification(newAnecdote.content);
    },
    onError: () => {
      displayAddNotification(null);
    },
  });

  const updatedAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries(["anecdotes"]);
      displayVoteNotification(anecdote.content);
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) =>
      createAnecdoteMutation.mutate({ content, votes: 0 }),
    voteAnecdote: (anecdote) =>
      updatedAnecdoteMutation.mutate({
        ...anecdote,
        votes: anecdote.votes + 1,
      }),
  };
};
