/**
 * The six fixed primary topics (Architecture doc §4.1) — navigation-level
 * taxonomy, don't grow. Sector/security labels are a separate, unlimited,
 * metadata-only layer (§4.2) that never appears in navigation; that layer
 * isn't built yet since it only starts mattering once there's enough
 * tagged content for the "third item earns a label" rule to apply.
 */
export const PRIMARY_TOPICS = [
  "Market Structure",
  "Risk",
  "Momentum",
  "Behaviour",
  "Macro",
  "Process",
] as const;

export type PrimaryTopic = (typeof PRIMARY_TOPICS)[number];
