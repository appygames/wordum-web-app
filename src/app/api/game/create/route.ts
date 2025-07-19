import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface Word {
  text: string;
}

interface CreateGameRequest {
  device_id: string;
  words: Word[];
  reveal_letters: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateGameRequest = await req.json();
    const { device_id, words, reveal_letters } = body;

    // Extract just the text from the words array
    const targetWords = words.map(word => word.text);

    const docRef = await addDoc(collection(db, "userGames"), {
      device_id,
      targetWords,
      reveal_letters,
      length: targetWords.length,
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
