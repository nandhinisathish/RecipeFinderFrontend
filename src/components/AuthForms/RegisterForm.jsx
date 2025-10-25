import style from "./Forms.module.css";
import { useState } from "react";
import { useAuth } from "../../context/authContext/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm({ setNewUser }) {
  const { signUp } = useAuth();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (formData.password !== formData.password2) {
        toast.error("Passwords do not match", {toastId: "password-mismatch"});
        //throw new Error("Password Dont Match");

        return;
      }
      await signUp(formData);
      toast.success(`User ${formData.email} registered successfully! 🎉`, { toastId: "signup-success" });

      nav("/dash");
    } catch (err) {
      console.error(err.message);
      toast.error(err.response?.data?.message || "Registration failed", { toastId: "signup-failed" });
    }
  }

  const handleClick = () => {
    setNewUser(false);
  };

  return (
    <div className={style.forms}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            minLength="6"
          />{" "}
        </label>
        <input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Confirm Password"
          minLength="6"
        />
        <input type="submit" value="Sign Up" />
      </form>
      <p>
        Already have an account? <button onClick={handleClick}>Sign In</button>
      </p>
    </div>
  );
}
