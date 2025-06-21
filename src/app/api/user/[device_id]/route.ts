import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { device_id: string } }
) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userRef = collection(db, "users");
  const q = query(userRef, where("device_id", "==", params.device_id));
  const snapshot = await getDocs(q);
  const userData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return NextResponse.json(userData[0] || null);
}
