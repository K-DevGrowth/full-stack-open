import { useAnecdoteActions } from "../store";

const Anecdote = ({ anecdote }) => {
  const { votes } = useAnecdoteActions();

  const vote = (id) => {
    votes(id);
    console.log("vote", id);
  };

  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
