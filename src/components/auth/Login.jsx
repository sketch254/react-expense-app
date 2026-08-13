import Input from "../reusable/input/input";
import Button from "../reusable/button/button";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login({ prefillName = "", prefillEmail = "" }) {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (prefillName || prefillEmail) {
      if (prefillName) setName(prefillName);
      if (prefillEmail) setEmail(prefillEmail);
      submitButtonRef.current?.focus();
    }
  }, [prefillName, prefillEmail]);

  function handleSubmit(e) {
    e.preventDefault();
    login({
      id: 1,
      name: name || "User",
      email: email || "user@example.com",
    });
    navigate("/");
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <Button type="submit" ref={submitButtonRef}>
          Log in
        </Button>
      </form>
    </div>
  );
}

export default Login;
