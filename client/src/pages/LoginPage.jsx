import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      toast.success("Login successful!");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
      console.log(e);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="bg-white fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-1/3">
      <div className="p-5 flex flex-col gap-4">
        <div>
          <div>Email</div>
          <input
            className="w-full bg-slate-200 p-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <div>Password</div>
          <input
            className="w-full bg-slate-200 p-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="text-center">
          New here?{" "}
          <Link
            to="/register"
            className="bg-slate-500 p-2 rounded-lg text-white"
          >
            Register Now
          </Link>
        </div>
        <button className="p-2 bg-orange-500" onClick={onSubmitHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
