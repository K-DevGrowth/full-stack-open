const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to get anecdotes");
  }

  return res.json();
};

export const createNew = async (newAnecdote) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAnecdote),
  };

  const res = await fetch(baseUrl, options);

  if (!res.ok) {
    throw new Error("Failed to create anecdote");
  }

  return res.json();
};

export const update = async (anecdote) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  };

  const res = await fetch(`${baseUrl}/${anecdote.id}`, options);

  if (!res.ok) {
    throw new Error("Failed to update anecdote");
  }

  return res.json();
};
