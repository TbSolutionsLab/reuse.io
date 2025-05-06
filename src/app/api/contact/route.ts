import { NextResponse } from "next/server";
import { sendEmail } from "~/lib/email";


export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email using the imported function
    await sendEmail({ name, email, message });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}