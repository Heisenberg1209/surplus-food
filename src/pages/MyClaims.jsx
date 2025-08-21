import { useEffect, useState } from "react";
import { db, auth } from "../app/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

function ClaimCard({ listing }) {
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
          🍽 <b>{listing.quantity}</b> meals
        </p>
        {listing.freshness && (
          <p className="mt-1 text-sm text-green-600">
            🧠 AI Freshness Score: <b>{listing.freshness}/10</b>
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          Donor: {listing.donorId || "Anonymous"}
        </p>
        <p className="text-sm mt-2 text-blue-600 font-semibold">
          ✅ Claimed on:{" "}
          {listing.claimedAt?.toDate
            ? listing.claimedAt.toDate().toLocaleString()
            : "Unknown"}
        </p>
      </div>
    </div>
  );
}

export default function MyClaims() {
  const [claims, setClaims] = useState([]);
  const userId = auth.currentUser ? auth.currentUser.uid : "anon";

  useEffect(() => {
    const q = query(
      collection(db, "listings"),
      where("claimedBy", "==", userId),
      orderBy("claimedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setClaims(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">My Claimed Food</h1>
      {claims.length === 0 ? (
        <p className="text-gray-600">You haven’t claimed any food yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {claims.map((listing) => (
            <ClaimCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
