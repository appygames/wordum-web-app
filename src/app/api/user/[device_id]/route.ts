import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { device_id: string } }
) {
  const { device_id } = params;

  // Reference to the users collection
  const usersRef = collection(db, "users");

  // Check if user exists
  const userQuery = query(usersRef, where("device_id", "==", device_id));
  const userSnap = await getDocs(userQuery);

  let userData;

  if (userSnap.empty) {
    // If user does not exist, create one with default avatar
    const newUser = {
      device_id,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${device_id}`, // or any default logic
      created_at: new Date().toISOString(), // optional
    };
    userData = newUser;
  } else {
    userData = userSnap.docs[0].data();
  }

  // Fetch game results
  const resultQuery = query(
    collection(db, "game_results"),
    where("device_id", "==", device_id)
  );
  const resultsSnap = await getDocs(resultQuery);

  const stats = {
    easy: { wins: 0, losses: 0 },
    medium: { wins: 0, losses: 0 },
    hard: { wins: 0, losses: 0 },
    expert: { wins: 0, losses: 0 },
  };

  resultsSnap.forEach((doc) => {
    const { difficulty, won } = doc.data();
    if (!["easy", "medium", "hard", "expert"].includes(difficulty)) return;

    if (won) {
      stats[difficulty].wins += 1;
    } else {
      stats[difficulty].losses += 1;
    }
  });

  return NextResponse.json({
    device_id,
    avatar: userData.avatar,
    stats,
  });
}
