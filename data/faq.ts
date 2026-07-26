import { 
  Compass, 
  CandlestickChart, 
  Shield, 
  BookOpen, 
  Briefcase, 
  MessagesSquare 
} from "lucide-react";

export const iconComponents = {
  Compass,
  CandlestickChart,
  Shield,
  BookOpen,
  Briefcase,
  MessagesSquare
};

export interface FAQItem {
  question: string;
  answer: string;
  hasComparison?: boolean;
}

export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof iconComponents;
  questions: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "about",
    title: "About VSC",
    description: "Company philosophy, mission, and positioning.",
    iconName: "Compass",
    questions: [
      {
        question: "What is VSC Capital?",
        answer: "VSC Capital & Advisory is an MSME-registered research and investor education firm. We focus on momentum-based execution frameworks, systematic trading, and disciplined capital representation."
      },
      {
        question: "Who is VSC for?",
        answer: "VSC is for serious learners, working professionals, business owners, and long-term market participants who want to approach markets through a process-driven, rule-based execution framework."
      },
      {
        question: "What makes VSC different?",
        answer: "Unlike typical advisory services, we do not provide stock tips, guarantees, or short-term predictions. We focus entirely on teaching repeatable decision-making, strict risk management, and transparency."
      }
    ]
  },
  {
    id: "philosophy",
    title: "Trading Philosophy",
    description: "Repeatable mathematical edge and structured market approaches.",
    iconName: "CandlestickChart",
    questions: [
      {
        question: "Is trading gambling?",
        answer: "No, systematic trading is a highly disciplined business characterized by a defined process, strict risk management, a repeatable mathematical edge, calculated position sizing, and capital preservation. In contrast, gambling is outcome-driven, emotional, with uncontrolled risk, and operated without a structured process or edge.",
        hasComparison: true
      },
      {
        question: "Can trading be learned?",
        answer: "Yes. Just like any professional skill, rule-based trading can be mastered through structured study of market dynamics, disciplined execution, and adherence to proven risk management rules."
      },
      {
        question: "Why do most traders lose?",
        answer: "Most traders lose due to lack of a repeatable framework, uncontrolled risk (emotional trading or over-leveraging), and failure to preserve capital. They focus on catching the next big stock instead of building a robust process."
      }
    ]
  },
  {
    id: "risk",
    title: "Risk Framework",
    description: "How VSC approaches capital preservation, position sizing and long-term survivability.",
    iconName: "Shield",
    questions: [
      {
        question: "How do you think about risk?",
        answer: "Risk is our primary consideration. We define our exact risk—typically capped at 1% to 1.5% of trade capital—before committing a single rupee. We maintain a strict hard stop-loss on every execution."
      },
      {
        question: "What is capital preservation?",
        answer: "Capital preservation is the ultimate edge. It means protecting your trading bankroll during adverse market regimes so that you survive to participate when high-conviction momentum conditions return."
      },
      {
        question: "How much capital should someone start with?",
        answer: "We recommend a minimum deployable capital of ₹1L to properly utilize position-sizing models and build a diversified exposure without over-allocating to a single setup."
      }
    ]
  },
  {
    id: "learning-hub",
    title: "Learning Hub",
    description: "Professional trading education and systematic modules.",
    iconName: "BookOpen",
    questions: [
      {
        question: "Do I need prior experience?",
        answer: "No, prior experience is not strictly necessary. We have structured modules ranging from market foundations for beginners to advanced breakout execution setups."
      },
      {
        question: "Is this suitable for beginners?",
        answer: "Yes, beginners who are willing to learn with a serious, process-driven attitude and avoid shortcuts will find it an ideal starting point to build correct habits."
      },
      {
        question: "Is this suitable for investors or traders?",
        answer: "It is suitable for both. The core principles of breakout structures, momentum, trend tracking, and risk management apply across all active market participation strategies."
      }
    ]
  },
  {
    id: "advisory",
    title: "Advisory",
    description: "Disciplined portfolio guidance and execution parameters.",
    iconName: "Briefcase",
    questions: [
      {
        question: "Do you provide stock tips?",
        answer: "No. We never provide stock tips, advisory recommendations, or personalized buy/sell calls. All our research is strictly for educational purposes and rule-based system discussion."
      },
      {
        question: "Do you manage money?",
        answer: "No, we do not manage client funds or offer Portfolio Management Services (PMS). VSC is an educational and research-driven firm; all capital is managed by clients in their own accounts."
      },
      {
        question: "Do you guarantee returns?",
        answer: "Absolutely not. We do not guarantee any returns. Markets are probabilistic, and anyone promising guaranteed returns is operating with a lottery mindset. We focus purely on maximizing the mathematical edge and keeping risk tightly capped."
      }
    ]
  },
  {
    id: "discussions",
    title: "Strategic Discussions",
    description: "1:1 alignment discussions and custom framework compatibility.",
    iconName: "MessagesSquare",
    questions: [
      {
        question: "What happens during a strategic discussion?",
        answer: "It is a 1:1 conversation focusing on alignment. We discuss your capital goals, risk philosophy, and expectations to determine if our structured execution framework aligns with your approach."
      }
    ]
  }
];

export const bgGlows = {
  about: "rgba(255, 255, 255, 0.02)",
  philosophy: "rgba(111, 134, 183, 0.03)",
  risk: "rgba(251, 146, 60, 0.03)",
  "learning-hub": "rgba(111, 134, 183, 0.04)",
  advisory: "rgba(201, 168, 76, 0.04)",
  discussions: "rgba(93, 139, 115, 0.04)"
};
