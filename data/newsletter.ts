import { NewsletterConfig } from "@/types/newsletter";

export const newsletterConfig: NewsletterConfig = {
  label: "NEWSLETTER",
  title: "Receive each new Market Letter and major research publication.",
  description: "No spam. No noise. Just thoughtful research.",
  formName: "newsletter",
  action: "/thank-you",
  buttonText: "Subscribe →"
};
