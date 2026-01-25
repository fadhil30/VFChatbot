import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type TrainingSourceType = "FILE" | "TEXT" | "WEBSITE" | "QNA";

interface TrainingSourceInput {
  type: TrainingSourceType;
  content: string;
  fileName?: string;
  fileSize?: number;
  question?: string;
  answer?: string;
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sources } = (await request.json()) as {
      sources: TrainingSourceInput[];
    };

    if (!sources || sources.length === 0) {
      return NextResponse.json(
        { error: "At least one source is required" },
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

    // Create the chatbot with manual training sources
    const chatbot = await prisma.chatbot.create({
      data: {
        name: "My AI Agent",
        userId: user.id,
        trainingSources: {
          create: sources.map((source) => ({
            type: source.type,
            content: source.content,
            fileName: source.fileName,
            fileSize: source.fileSize,
            question: source.question,
            answer: source.answer,
          })),
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
    console.error("Error creating chatbot manually:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
