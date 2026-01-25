import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        chatbots: {
          include: {
            visitors: {
              include: {
                messages: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate stats
    const totalConversations = user.chatbots.reduce(
      (acc, chatbot) => acc + chatbot.visitors.length,
      0
    );

    const totalMessages = user.chatbots.reduce(
      (acc, chatbot) =>
        acc +
        chatbot.visitors.reduce(
          (vAcc, visitor) => vAcc + visitor.messages.length,
          0
        ),
      0
    );

    // Count visitors with email or phone as leads
    const leadsCount = user.chatbots.reduce(
      (acc, chatbot) =>
        acc +
        chatbot.visitors.filter((v) => v.email || v.phone).length,
      0
    );

    return NextResponse.json({
      totalConversations,
      totalMessages,
      leadsCount,
      chatbotCount: user.chatbots.length,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
