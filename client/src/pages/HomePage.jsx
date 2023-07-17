/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Header from "../components/Header";
// import PropTypes from "prop-types";

const HomePage = ({ user, setUser }) => {
  return (
    <>
      <Header user={user} setUser={setUser} />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-8">Assessment Test</h1>
        <div className="space-y-4">
          {!user ? (
            <>
              <Link to="/admin">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                  Admin Page
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <Link to="/quiz">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                Start Quiz
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

// HomePage.propTypes = { user: PropTypes.object, setUser: PropTypes.func };

export default HomePage;
