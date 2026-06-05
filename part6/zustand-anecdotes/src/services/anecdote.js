const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to get all anecdotes");
  }

  return res.json();
};

export const createNew = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "applicatin/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };

  const res = await fetch(baseUrl, options);

  if (!res.ok) {
    throw new Error("");
  }

  return res.json();
};

export const update = async (id, anecdote) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  };

  const res = await fetch(`${baseUrl}/${id}`, options);

  if (!res.ok) {
    throw new Error("Failed to update votes");
  }

  return res.json();
};

export const deleted = async (id) => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(`${baseUrl}/${id}`, options);

  if (!res.ok) {
    throw new Error("Failed to delete anecdote");
  }

  return id;
};
