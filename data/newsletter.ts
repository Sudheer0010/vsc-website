import { NewsletterConfig } from "@/types/newsletter";

export const newsletterConfig: NewsletterConfig = {
  label: "NEWSLETTER",
  title: "Never miss the next Market Letter.",
  description: "Major research and new publications, occasionally.",
  formName: "newsletter",
  action: "/thank-you",
  buttonText: "Subscribe →"
};
