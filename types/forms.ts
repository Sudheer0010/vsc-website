export interface EnquiryFormData {
  name: string;
  phone: string;
  email?: string;
  capital: "₹1L–₹5L" | "₹5L–₹25L" | "₹25L–₹1Cr" | "₹1Cr+";
  experience?: "Beginner" | "Intermediate" | "Advanced";
  goal?: string;
}

export interface NewsletterFormData {
  email: string;
}
