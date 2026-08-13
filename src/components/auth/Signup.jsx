import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import Input from "../reusable/input/input";
import Button from "../reusable/button/button";

function Signup({ onSignupComplete }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [justSignedUp, setJustSignedUp] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    onSignupComplete?.(name, email);
    setName("");
    setEmail("");
    setPassword("");
    setJustSignedUp(true);
  }

  if (isAuthenticated) return null;

  return (
    <div>
      <h2>Sign up</h2>
      {justSignedUp && (
        <p role="status" className="auth-page__status">
          Account created — your details are filled in on the left, just log in.
        </p>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <Input label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
        <Input label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        <Input label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Choose a password" required />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
}

export default Signup;
