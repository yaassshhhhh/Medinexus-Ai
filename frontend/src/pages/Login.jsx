import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { backendUrl } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          toast.success("Account created successfully")
        } else {
          toast.error(data.message)
        }
      } else {
        // Login logic can be added here later if needed
      }

    } catch (error) {
      toast.error(error.message)
    }

  };
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-indigo-50 rounded-2xl bg-white text-zinc-600 text-sm shadow-xl"
      >
        <p className="text-2xl font-bold text-gray-800">
          {state === "Sign Up" ? "Create Account" : "Welcome Back"}
        </p>
        <p className="text-gray-500 mb-2">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          an appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p className="font-medium text-gray-700 mb-1">Full Name</p>
            <input
              className="border border-zinc-300 rounded-lg w-full p-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="font-medium text-gray-700 mb-1">Email</p>
          <input
            className="border border-zinc-300 rounded-lg w-full p-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p className="font-medium text-gray-700 mb-1">Password</p>
          <input
            className="border border-zinc-300 rounded-lg w-full p-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="bg-primary text-white w-full py-2.5 rounded-lg text-base font-semibold shadow-md mt-2"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </motion.button>

        {state === "Sign Up" ? (
          <p className="text-center w-full mt-2">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary font-bold underline cursor-pointer hover:text-indigo-700"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center w-full mt-2">
            Create an new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary font-bold underline cursor-pointer hover:text-indigo-700"
            >
              Click here
            </span>
          </p>
        )}
      </motion.div>
    </form>
  );
};

export default Login;
