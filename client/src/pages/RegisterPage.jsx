import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(null);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      setRedirect("/login");
      toast.success("Registered Successfully!");
    } catch (error) {
      toast.error("Registration failed!");
    }
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="bg-white fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-1/3">
      <div className="p-5 flex flex-col gap-4">
        <div>
          <div>First Name</div>
          <input
            className="w-full bg-slate-200 p-1"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
          />
        </div>
        <div>
          <div>Last Name</div>
          <input
            className="w-full bg-slate-200 p-1"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
          />
        </div>
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
          Already registered?{" "}
          <Link to="/login" className="bg-slate-500 p-2 rounded-lg text-white">
            Login Now
          </Link>
        </div>
        <button className="p-2 bg-orange-500" onClick={onSubmitHandler}>
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
