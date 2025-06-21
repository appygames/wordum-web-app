import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== "appykan-wordum-1234") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { device_id, won, difficulty } = await req.json();
  const ref = collection(db, "game_results");
  const doc = await addDoc(ref, {
    device_id,
    won,
    difficulty,
    created_at: Timestamp.now(),
  });

  return NextResponse.json({ success: true, id: doc.id });
}
