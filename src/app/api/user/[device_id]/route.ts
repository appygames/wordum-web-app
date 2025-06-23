// /app/api/user/[device_id]/route.ts
import { Difficulty } from "@/features/game/gameSlice";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { device_id: string } }
) {
  const { device_id } = params;

  // Fetch user
  const userQuery = query(
    collection(db, "users"),
    where("device_id", "==", device_id)
  );
  const userSnap = await getDocs(userQuery);

  if (userSnap.empty) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userData = userSnap.docs[0].data();

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
