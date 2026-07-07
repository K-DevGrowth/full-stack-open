import { useState, useEffect } from "react";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import NotFound from "./components/NotFound";
import { useNotify } from "./hooks/useNotify";
import { setToken } from "./services/blogs";
import { useLoggedUser } from "./hooks/useLoggedUser";
import Users from "./components/Users";

const App = () => {
  const { message, messageType } = useNotify();

  const { user, handleLogout } = useLoggedUser();

  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Blog App</Typography>
          <Box>
            <Button color="inherit" component={Link} to={"/"}>
              blogs
            </Button>
            <Button color="inherit" component={Link} to={"/users"}>
              users
            </Button>
            <Button color="inherit" component={Link} to="/create">
              new blogs
            </Button>

            {!user ? (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {message && (
        <Alert
          sx={{ margin: "10px 0" }}
          severity={`${messageType === "success" ? "success" : "error"}`}
        >
          {message || null}
        </Alert>
      )}

      <Routes>
        <Route
          path="/create"
          element={
            <ErrorBoundary
              fallback={
                <div>
                  <h1>Something went wrong :(</h1>
                  <p>Please make a bug report to mluukkai in Discord</p>
                </div>
              }
            >
              <BlogForm />
            </ErrorBoundary>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary
              fallback={
                <div>
                  <h1>Something went wrong :(</h1>
                  <p>Please make a bug report to mluukkai in Discord</p>
                </div>
              }
            >
              <Blog user={user} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/"
          element={
            <ErrorBoundary
              fallback={
                <div>
                  <h1>Something went wrong :(</h1>
                  <p>Please make a bug report to mluukkai in Discord</p>
                </div>
              }
            >
              <BlogList />
            </ErrorBoundary>
          }
        />
        <Route
          path="/users"
          element={
            <ErrorBoundary
              fallback={
                <div>
                  <h1>Something went wrong :(</h1>
                  <p>Please make a bug report to mluukkai in Discord</p>
                </div>
              }
            >
              <Users />
            </ErrorBoundary>
          }
        />
        <Route
          path="/login"
          element={
            <ErrorBoundary
              fallback={
                <div>
                  <h1>Something went wrong :(</h1>
                  <p>Please make a bug report to mluukkai in Discord</p>
                </div>
              }
            >
              <Login />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
