import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { device_id, won, difficulty } = await req.json();

  // Save game result
  const ref = collection(db, "game_results");
  await addDoc(ref, {
    device_id,
    won,
    difficulty,
    created_at: Timestamp.now(),
  });

  // If won, update user's coin count
  if (won) {
    const coinMap: Record<string, number> = {
      easy: 5,
      medium: 10,
      hard: 15,
      expert: 25,
    };
    const coinsToAdd = coinMap[difficulty] ?? 0;

    const userRef = collection(db, "users");
    const q = query(userRef, where("device_id", "==", device_id));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0].ref;
      await updateDoc(userDoc, {
        coins: increment(coinsToAdd),
      });
    }
  }

  return NextResponse.json({ success: true });
}
