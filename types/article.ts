import { PrimaryTopic } from "./taxonomy";

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  primaryTopic?: PrimaryTopic;
  /** "FRAMEWORK" removed — frameworks are their own content type now
   *  (types/framework.ts), not an Article subtype. This array used to
   *  hold both, under two different slug schemes, which is exactly the
   *  "letters must never change and frameworks must keep changing, they
   *  cannot share one system" problem the Architecture doc (§2) warns
   *  about, just one level up (Notes and Frameworks sharing one list). */
  type: "RESEARCH NOTE" | "CASE STUDY" | "MARKET LETTER";
  publishedDate: string;
  readingTime: string;
  featured: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  slug: string;
  /** Full note body. Undefined = not yet written. */
  body?: string;
  /** Hand-picked, never auto-generated (§5.3). Undefined until chosen. */
  relatedSlugs?: string[];
}
