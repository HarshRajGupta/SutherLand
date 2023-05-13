import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const logoutHandler = async () => {
    await axios.post("/logout");
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      axios.get("/").then(({ data }) => {
        setUser(data);
      });
    };
    fetchUser();
  }, [user]);

  return (
    <header className="bg-gray-200 h-14 flex items-center justify-between p-4">
      <div className="mr-2 flex items-center">
        <Link to="/">
          <h1 className="pl-1 font-bold text-xl">Quiz-App</h1>
        </Link>
      </div>
      <div className="flex items-center flex-row gap-6 pr-10 justify-center">
        <div className="flex items-center">
          {(user && `Hello, ${user.firstName} ${user.lastName}`) ||
            "Hello User"}
        </div>
        {(!user && (
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-5 rounded">
            <Link to="/login">Login</Link>
          </button>
        )) || (
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-5 rounded"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
