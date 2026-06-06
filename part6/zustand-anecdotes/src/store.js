import { create } from "zustand";
import { getAll, createNew, update, deleted } from "./services/anecdote";
import { setNotification } from "./notificationStore";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  query: "",
  actions: {
    add: async (anecdote) => {
      const newAnecdote = await createNew(anecdote);
      set((state) => ({ anecdotes: [...state.anecdotes, newAnecdote] }));
      setNotification(`You added '${anecdote.content}'`);
    },

    votes: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);
      const updated = await update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((a) => (a.id === id ? updated : a)),
      }));
      setNotification(`You voted '${anecdote.content}'`);
    },

    setQuery: (value) => set(() => ({ query: value })),

    initialize: async () => {
      const anecdotes = await getAll();
      set(() => ({ anecdotes }));
    },

    remove: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);
      const deletedAnecdote = await deleted(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((a) => a.id !== deletedAnecdote),
      }));
      setNotification(`You removed '${anecdote.content}'`);
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const query = useAnecdoteStore((state) => state.query);
  return anecdotes
    .toSorted((a, b) => b.votes - a.votes)
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(query.toLowerCase()),
    );
};
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);

export default useAnecdoteStore;
