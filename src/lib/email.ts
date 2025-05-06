import nodemailer from "nodemailer";

interface EmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail({ name, email, message }: EmailData): Promise<void> {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.example.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Configure email content
  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@yourjewelrysite.com",
    to: process.env.EMAIL_TO || "contact@yourjewelrysite.com",
    replyTo: email,
    subject: `Contact Form: Message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}