import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // Token expires in 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // Check if a token already exists for this email
  const existingToken = await prisma.verificationToken.findFirst({
    where: { email }
  });

  // If it does, delete it (we only want one active token at a time)
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id }
    });
  }

  // Create the new token
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    }
  });

  return verificationToken;
};