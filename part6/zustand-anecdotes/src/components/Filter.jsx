import { useAnecdoteActions } from "../store";

const Filter = () => {
  const { setQuery } = useAnecdoteActions();

  const handleChange = (event) => {
    // the value of the input field is in event.target.value
    setQuery(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
