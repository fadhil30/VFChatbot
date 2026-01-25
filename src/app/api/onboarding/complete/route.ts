import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST() {
  try {
    const session = await auth();
    const user = session?.user;
    
    if (!user || !user.email) {
       return new NextResponse("Unauthorized", { status: 401 });
    }

    // Update using email since auth() might not return id depending on strict session typing, 
    // but typically it does. Safest is findUnique by email which is guaranteed unique.
    await db.user.update({
      where: { email: user.email },
      data: { hasCompletedOnboarding: true },
    });

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
