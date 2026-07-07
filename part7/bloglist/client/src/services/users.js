const baseUrl = "/api/users";

export const getAllUsers = async () => {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to load users");
  }

  return res.json();
};

export const getUser = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to load user");
  }

  return res.json();
};
