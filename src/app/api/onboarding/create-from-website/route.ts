import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { websiteUrl, useCase } = await request.json();

    if (!websiteUrl) {
      return NextResponse.json(
        { error: "Website URL is required" },
        { status: 400 },
      );
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create the chatbot with website as training source
    const chatbot = await prisma.chatbot.create({
      data: {
        name: `Chatbot from ${new URL(websiteUrl).hostname}`,
        useCase: useCase || "GENERAL_AI_AGENT",
        userId: user.id,
        trainingSources: {
          create: {
            type: "WEBSITE",
            content: websiteUrl,
          },
        },
      },
    });

    // Mark user onboarding as complete
    await prisma.user.update({
      where: { id: user.id },
      data: { hasCompletedOnboarding: true },
    });

    return NextResponse.json({ success: true, chatbotId: chatbot.id });
  } catch (error) {
    console.error("Error creating chatbot from website:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
