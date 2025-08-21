import { useState } from "react";
import { auth } from "../app/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Account created ✅");
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
        alert("Logged in ✅");
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg space-y-4">
      <h1 className="text-xl font-bold">{isSignup ? "Sign Up" : "Login"}</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSignup ? "Create Account" : "Login"}
        </button>
      </form>
      <button
        className="text-sm text-blue-600 underline"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Already have an account? Login" : "New here? Sign up"}
      </button>
    </div>
  );
}
