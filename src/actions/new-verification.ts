"use server";

import { prisma } from "@/lib/prisma";

export const newVerification = async (token: string) => {
  // 1. Check if token exists
  const existingToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  // 2. Check if token has expired
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  // 3. Find the user
  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email },
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  // 4. Mark user as verified
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email, // Good practice to re-sync email
    },
  });

  // 5. Delete the token (cleanup)
  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};