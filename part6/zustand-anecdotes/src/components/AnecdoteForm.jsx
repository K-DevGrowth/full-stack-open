import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();

  const handleAdd = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    add(content);
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
