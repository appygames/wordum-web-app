import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { device_id: string } }
) {
  const userRef = collection(db, "users");
  const q = query(userRef, where("device_id", "==", params.device_id));
  const snapshot = await getDocs(q);
  const userData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return NextResponse.json(userData[0] || null);
}
