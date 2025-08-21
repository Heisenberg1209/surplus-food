import { useEffect, useState } from "react";
import { db, auth } from "../app/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

function ListingCard({ listing }) {
  async function handleClaim() {
    try {
      const docRef = doc(db, "listings", listing.id);
      await updateDoc(docRef, {
        claimed: true,
        claimedBy: auth.currentUser ? auth.currentUser.uid : "anon",
        claimedAt: serverTimestamp(),
      });
      alert("Food claimed successfully ✅");
    } catch (err) {
      console.error("Error claiming food:", err);
      alert("Error claiming food: " + err.message);
    }
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {listing.imageUrl && listing.imageUrl !== "" && (
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold">{listing.title}</h2>
        <p className="text-sm text-gray-600">{listing.desc}</p>
        <p className="mt-2 text-sm">
          🍽 <b>{listing.quantity}</b> meals available
        </p>

        {listing.freshness && (
          <p className="mt-1 text-sm text-green-600">
            🧠 AI Freshness Score: <b>{listing.freshness}/10</b>
          </p>
        )}

        <p className="text-xs text-gray-400 mt-1">
          Donor: {listing.donorId || "Anonymous"}
        </p>

        {/* 👇 Claim button */}
        <div className="mt-3">
          {listing.claimed ? (
            <p className="text-red-500 font-semibold">❌ Already Claimed</p>
          ) : (
            <button
              onClick={handleClaim}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Claim Food
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Feed() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "listings"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setListings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Available Surplus Food</h1>
      {listings.length === 0 ? (
        <p className="text-gray-600">No food available right now.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
