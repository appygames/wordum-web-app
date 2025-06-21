import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { device_id, avatar } = await req.json();
  const apiKey = req.headers.get("x-api-key");

  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userRef = collection(db, "users");
  const doc = await addDoc(userRef, { device_id, avatar });

  return NextResponse.json({ id: doc.id, device_id, avatar });
}
