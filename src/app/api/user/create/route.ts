import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { device_id, avatar } = await req.json();

  const userRef = collection(db, "users");
  const doc = await addDoc(userRef, { device_id, avatar, coins: 0 });

  return NextResponse.json({ id: doc.id, device_id, avatar });
}
