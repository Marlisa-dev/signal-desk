// components/StatusBadge.tsx
type Status = 'open' | 'in-progress' | 'closed';

export default function StatusBadge({ status }: { status: string }) {
  const colorStyles: Record<Status, React.CSSProperties> = {
    'open': { backgroundColor: 'rgb(220, 252, 231)', color: 'rgb(22, 101, 52)' },
    'in-progress': { backgroundColor: 'rgb(191, 219, 254)', color: 'rgb(30, 64, 175)' },
    'closed': { backgroundColor: 'rgb(243, 244, 246)', color: 'rgb(55, 65, 81)' },
  };

  // Get the color for this status, fallback to 'open' if unknown
  const colors = colorStyles[status as Status] || colorStyles.open;

  // Badge styling
  const badgeStyle: React.CSSProperties = {
    ...colors,
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'inline-block',
    textTransform: 'capitalize',
  };

  return <span style={badgeStyle}>{status}</span>;
}