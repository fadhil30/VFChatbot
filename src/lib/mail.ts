import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  // This is the link user clicks: localhost:3000/new-verification?token=...
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev", // Resend gives you this default testing email
    to: email,
    subject: "Confirm your email - Chatty",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
  });
};