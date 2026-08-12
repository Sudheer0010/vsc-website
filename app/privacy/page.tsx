import Link from "next/link";
import { StepRule } from "@/components/ui/vsc/StepRule";

/**
 * Short and honest on purpose. This exists to answer, plainly, the question
 * a visitor is actually asking when they hesitate at the enquiry form: what
 * happens to what I type here. It is not a template padded out to look
 * thorough — every section says something specific to this site.
 */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-rule py-10 first:border-t-0 first:pt-0">
      <div className="flex items-start gap-3">
        <StepRule size="sm" className="mt-2 shrink-0" />
        <div>
          <h2 className="font-display text-[22px] font-semibold tracking-tight text-ink">
            {title}
          </h2>
          <div className="mt-3 max-w-measure space-y-4 text-[16px] leading-relaxed text-ink-soft">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="relative min-h-screen w-full bg-canvas text-ink">
      <main className="relative w-full pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="container mx-auto max-w-[820px]">
          <span className="eyebrow">Privacy policy</span>
          <h1 className="font-display text-ink">What we collect, and what we don&apos;t.</h1>
          <p className="mt-5 max-w-measure text-[18px] leading-relaxed text-ink-soft">
            This page covers everything VSC Capital &amp; Advisory collects
            through this website — the enquiry form and standard site
            analytics — in the same plain language we&apos;d use if you asked
            us directly. Last updated August 2026.
          </p>

          <div className="mt-12">
            <Section title="What the enquiry form collects">
              <p>
                When you submit the form on the{" "}
                <Link href="/enquire" className="text-growth-deep underline hover:text-growth">
                  Enquire
                </Link>{" "}
                page, we receive your name, email address, phone number, and
                whatever you write in the optional &ldquo;what brings you
                here&rdquo; field. That&apos;s the complete list — we don&apos;t
                ask for income, investment capital, or trading experience on
                first contact, and we don&apos;t infer it from anywhere else.
              </p>
            </Section>

            <Section title="How it's used">
              <p>
                Every submission is read personally by our research desk,
                usually within 24 hours, to decide whether and how to reply.
                Your details are used only to have that conversation with
                you. We do not add you to a marketing list, and we do not
                pass your information to any third party for their own
                marketing purposes.
              </p>
            </Section>

            <Section title="Site analytics">
              <p>
                Like most websites, this one uses Google Analytics to
                understand aggregate traffic — which pages get read, roughly
                how many visitors, and from where. This sets standard
                analytics cookies in your browser. It doesn&apos;t identify you
                individually, and it&apos;s separate from anything you submit
                through the enquiry form.
              </p>
            </Section>

            <Section title="How long we keep it">
              <p>
                Enquiry submissions are kept for as long as needed to
                respond to you and maintain a record of the conversation. If
                you&apos;d like your information deleted, email us and
                we&apos;ll action it.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                You can ask what we hold about you, ask us to correct it, or
                ask us to delete it, at any time. Write to{" "}
                <a
                  href="mailto:sudheer@vsccapital.in"
                  className="text-growth-deep underline hover:text-growth"
                >
                  sudheer@vsccapital.in
                </a>{" "}
                and we&apos;ll handle it directly — no support ticket system,
                no automated runaround.
              </p>
            </Section>

            <Section title="Regulatory status">
              <p>
                VSC Capital &amp; Advisory is in the process of applying for
                SEBI Research Analyst (RA) registration. Until registration is
                granted, all content and communication on this site are for
                educational and research purposes only, and nothing here is
                personalised investment advice.
              </p>
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
}
