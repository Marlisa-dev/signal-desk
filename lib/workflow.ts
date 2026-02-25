// lib/workflow.ts

import { TicketStatus } from "@prisma/client";

const allowedTransitions: Record<TicketStatus, TicketStatus[]> = {
  open: ["in_progress", "blocked"],
  in_progress: ["blocked", "closed"],
  blocked: ["in_progress"],
  closed: ["open"],
};

export function canTransition(
  from: TicketStatus,
  to: TicketStatus
): boolean {
  return allowedTransitions[from].includes(to);
}