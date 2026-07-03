import useAnecdotes from "../hooks/useAnecdotes";

const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdotes();

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            {anecdote.content}
            <button type="button" onClick={() => deleteAnecdote(anecdote.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
