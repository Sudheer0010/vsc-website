export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "RESEARCH NOTE" | "FRAMEWORK" | "CASE STUDY" | "MARKET LETTER";
  publishedDate: string;
  readingTime: string;
  featured: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  slug: string;
}
