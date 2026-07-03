import { useEffect, useState } from "react";
import anecdotesService from "../services/anecdotes";

const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  const addAnecdote = (anecdote) => {
    setAnecdotes(
      anecdotes.concat({ ...anecdote, id: Math.round(Math.random() * 10000) }),
    );
    anecdotesService.createNew(anecdote);
  };

  const deleteAnecdote = (id) => {
    setAnecdotes(anecdotes.filter((anecdote) => anecdote.id !== id));
    anecdotesService.remove(id);
  };

  useEffect(() => {
    anecdotesService.getAll().then((data) => setAnecdotes(data));
  }, []);

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  };
};

export default useAnecdotes;
