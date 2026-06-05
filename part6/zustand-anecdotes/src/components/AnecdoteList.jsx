import { useEffect } from "react";
import { useAnecdoteActions, useAnecdotes } from "../store";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { initialize } = useAnecdoteActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      {anecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  );
};

export default AnecdoteList;
