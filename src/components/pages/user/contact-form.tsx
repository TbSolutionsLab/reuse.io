"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { TextAnimate } from "~/components/shared/text-animate";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative h-full w-full shrink-0 grow py-16"
    >
      <div className="flex w-full flex-col items-center justify-center px-10 md:px-40">
        <TextAnimate
          by="word"
          animation="blurInUp"
          duration={2500}
          as="h1"
          className="text-balance text-center font-italiana text-5xl font-semibold leading-tight md:text-7xl"
        >
          Get in{" "}
          <span className="bg-primary px-6 py-2 font-bold text-secondary">
            Touch
          </span>
        </TextAnimate>

        <p className="mt-8 max-w-[50ch] text-balance text-center font-italiana text-xl md:text-2xl">
          Have questions or want to discuss a custom piece? We'd love to hear from you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 flex w-full max-w-2xl flex-col space-y-6"
        >
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name" className="font-italiana text-lg">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="rounded-md border border-foreground/20 bg-secondary/10 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-primary/10"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="email" className="font-italiana text-lg">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-md border border-foreground/20 bg-secondary/10 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-primary/10"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="message" className="font-italiana text-lg">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="rounded-md border border-foreground/20 bg-secondary/10 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-primary/10"
            />
          </div>

          {submitStatus.type && (
            <div
              className={`rounded-md p-4 text-center ${
                submitStatus.type === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center justify-center space-x-2 rounded-md bg-primary px-6 py-3 font-italiana text-lg font-medium text-secondary transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            <ChevronRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>
        </form>
      </div>
    </section>
  );
}