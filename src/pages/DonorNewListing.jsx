import { useState } from "react";
import { db, auth } from "../app/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFreshnessScore } from "../app/ai"; // 👈 import AI helper

export default function DonorNewListing() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // 🧠 Get AI freshness score
      const aiScore = await getFreshnessScore(`${title} ${desc}`);
      console.log("AI Freshness Score:", aiScore);

      // Save listing to Firestore
      await addDoc(collection(db, "listings"), {
        title,
        desc,
        quantity,
        freshness: aiScore, // 👈 store score
        donorId: auth.currentUser ? auth.currentUser.uid : "anon",
        createdAt: serverTimestamp(),
      });

      alert("Listing added ✅ with AI freshness score");
      setTitle("");
      setDesc("");
      setQuantity("");
    } catch (err) {
      console.error("Error adding listing:", err);
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow space-y-4">
      <h1 className="text-2xl font-bold">Donate Surplus Food</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Food title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity (meals/plates)"
          className="w-full border p-2 rounded"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
}
