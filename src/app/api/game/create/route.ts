import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetWords, coins, length, level } = body;

    const docRef = await addDoc(collection(db, "userGames"), {
      targetWords,
      coins,
      length,
      level,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ gameCode: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create game:", error);
    return NextResponse.json(
      { message: "Failed to create game" },
      { status: 500 }
    );
  }
}
