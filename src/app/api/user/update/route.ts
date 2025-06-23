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

  const userRef = collection(db, "users");
  const q = query(userRef, where("device_id", "==", device_id));
  const snapshot = await getDocs(q);
  if (snapshot.empty)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const docRef = snapshot.docs[0].ref;
  await updateDoc(docRef, { avatar });

  return NextResponse.json({ success: true });
}
