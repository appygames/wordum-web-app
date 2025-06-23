import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
