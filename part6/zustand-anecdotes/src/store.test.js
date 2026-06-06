import { vi, describe, expect, it, beforeEach } from "vitest";
import { renderHook, act, render } from "@testing-library/react";

vi.mock("./services/anecdote", () => ({
  getAll: vi.fn(),
  createNew: vi.fn(),
  update: vi.fn(),
  deleted: vi.fn(),
}));

import { getAll, createNew, update, deleted } from "./services/anecdote";
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], query: "" });
  vi.clearAllMocks();
});

describe("useAnecdoteActions", () => {
  it("initialize loads anecdotes from service", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }];
    getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });

  it("displaying anecdotes receives the anecdotes from the store sorted by votes", async () => {
    const anecdotes = [
      { id: 1, content: "A", votes: 2 },
      { id: 2, content: "B", votes: 4 },
    ];

    useAnecdoteStore.setState({ anecdotes });

    const { result } = renderHook(() => useAnecdotes());
    expect(result.current[0]).toEqual(anecdotes[1]);
  });

  it("voting increases the number of votes for an anecdote", async () => {
    const anecdote = { id: 1, content: "Test", votes: 0 };
    useAnecdoteStore.setState({ anecdotes: [anecdote] });
    update.mockResolvedValue({ ...anecdote, votes: 1 });

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.votes(1);
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current[0].votes).toEqual(1);
  });
});

describe("useAnecdotes query", () => {
  const anecdotes = [
    { id: 1, content: "A", votes: 0 },
    { id: 2, content: "B", votes: 1 },
  ];

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes });
  });

  it("returns all anecdote with no query", () => {
    const { result } = renderHook(() => useAnecdotes());
    expect(result.current).toHaveLength(2);
  });

  it("query A notes", () => {
    useAnecdoteStore.setState({ anecdotes, query: "A" });
    const { result } = renderHook(() => useAnecdotes());
    expect(result.current).toEqual([anecdotes[0]]);
  });

  it("query B notes", () => {
    useAnecdoteStore.setState({ anecdotes, query: "B" });
    const { result } = renderHook(() => useAnecdotes());
    expect(result.current).toEqual([anecdotes[1]]);
  });
});
