import { useAnecdoteActions } from "../store";

const Anecdote = ({ anecdote }) => {
  const { votes, remove } = useAnecdoteActions();

  const vote = (id) => {
    votes(id);
  };

  const handleRemove = (id) => {
    remove(id);
  };

  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
        {anecdote.votes === 0 ? (
          <button onClick={() => handleRemove(anecdote.id)}>delete</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Anecdote;
