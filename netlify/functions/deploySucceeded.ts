import type { NetlifyFunction } from "@netlify/functions";
import { runPublicationAlerts } from "@/lib/mailerlite/publication-alerts";

/**
 * Fires once per successful Netlify deploy. Everything here is fail-safe:
 * a normal deploy (wrong branch/context, the manual switch off, a missing
 * env var, an unexpected error) always resolves to "log and do nothing" —
 * never to sending mail it shouldn't. The deploy itself has already
 * finished by the time this runs, so nothing here can block or roll it
 * back; the worst case of a bug in this file is a missed or duplicated log
 * line, not a broken deploy.
 *
 * Logs only the commit SHA and aggregate counts — never a subscriber
 * email, an API token, a request body, or a MailerLite response body.
 */
const netlifyFunction: NetlifyFunction = {
  deploySucceeded: async (event) => {
    const { deploy } = event;
    const commitSha = deploy.commitRef ?? "unknown";

    if (deploy.context !== "production" || deploy.branch !== "nextjs-migration") {
      console.log(
        `publication-alerts: skipped (context=${deploy.context} branch=${deploy.branch ?? "unknown"} commit=${commitSha})`
      );
      return;
    }

    if (process.env.PUBLICATION_ALERTS_ENABLED !== "true") {
      console.log(`publication-alerts: disabled (commit=${commitSha})`);
      return;
    }

    console.log(`publication-alerts: starting (commit=${commitSha})`);

    try {
      const results = await runPublicationAlerts();
      for (const r of results) {
        const skipped = r.skipped ? ` skipped="${r.skipped}"` : "";
        console.log(
          `publication-alerts: ${r.type}=${r.latestId ?? "none"} eligible=${r.eligible} triggered=${r.triggered} failed=${r.failed}${skipped}`
        );
      }
    } catch (err) {
      const reason = err instanceof Error ? err.message : "unknown error";
      console.error(`publication-alerts: unexpected error (commit=${commitSha}): ${reason}`);
    }
  },
};

export default netlifyFunction;
