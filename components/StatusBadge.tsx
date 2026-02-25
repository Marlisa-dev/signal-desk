import { TicketStatus } from "@prisma/client";

export default function StatusBadge({ status }: { status: TicketStatus }) {
  const colorStyles: Record<TicketStatus, React.CSSProperties> = {
    open: {
      backgroundColor: 'rgb(220, 252, 231)',
      color: 'rgb(22, 101, 52)'
    },
    in_progress: {
      backgroundColor: 'rgb(191, 219, 254)',
      color: 'rgb(30, 64, 175)'
    },
    blocked: {
      backgroundColor: 'rgb(234, 148, 148)',
      color: 'rgb(38, 36, 36)'
    },
    closed: {
      backgroundColor: 'rgb(243, 244, 246)',
      color: 'rgb(55, 65, 81)'
    },
  };

  const label = status.replace("_", " ");

  return (
    <span
      style={{
        ...colorStyles[status],
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '0.875rem',
        fontWeight: '500',
        display: 'inline-block',
        textTransform: 'capitalize',
      }}
    >
      {label}
    </span>
  );
}