import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { device_id, avatar } = await req.json();
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userRef = collection(db, "users");
  const q = query(userRef, where("device_id", "==", device_id));
  const snapshot = await getDocs(q);
  if (snapshot.empty)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const docRef = snapshot.docs[0].ref;
  await updateDoc(docRef, { avatar });

  return NextResponse.json({ success: true });
}
