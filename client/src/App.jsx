import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Admin from "./pages/Admin";
import Question from "./pages/Questions";
import Default from "./pages/Default";
import Test from "./pages/Test";
import QuizIndex from "./pages/QuizIndex";
import TestDetails from "./pages/TestDetails";
import UserDetails from "./pages/User";
import { UserContext } from "./UserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const fetchUser = async () => {
      axios.get("/").then(({ data }) => {
        setUser(data);
      });
    };
    setStatus("loaded");
    console.log(user);
    fetchUser();
  }, []);
  if (status === "loading") return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <>
              <Admin user={user} setUser={setUser} />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              {user ? (
                <Default />
              ) : (
                <RegisterPage user={user} setUser={setUser} />
              )}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {user ? <Default /> : <LoginPage user={user} setUser={setUser} />}
            </>
          }
        />
        <Route
          path="/quiz"
          element={
            <>
              <QuizIndex user={user} setUser={setUser} />
            </>
          }
        />
        <Route
          path="/quiz/*"
          element={
            <>
              <QuizPage user={user} setUser={setUser} />
            </>
          }
        />
        <Route
          path="/question"
          element={
            <>
              {!user || !user.isAdmin ? (
                <Default />
              ) : (
                <Question user={user} setUser={setUser} />
              )}
            </>
          }
        />
        <Route
          path="/test"
          element={
            <>
              {user && user.isAdmin ? (
                <Test user={user} setUser={setUser} />
              ) : (
                <Default />
              )}
            </>
          }
        />
        <Route
          path="/test/*"
          element={
            <>
              {user && user.isAdmin ? (
                <TestDetails user={user} setUser={setUser} />
              ) : (
                <Default />
              )}
            </>
          }
        />
        <Route
          path="/user/*"
          element={<UserDetails user={user} setUser={setUser} />}
        />
        <Route
          path="/"
          element={
            <>
              <HomePage user={user} setUser={setUser} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
