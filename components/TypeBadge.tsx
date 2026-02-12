// components/StatusBadge.tsx
type ticketType = 'bug' | 'idea' | 'feedback';

export default function TypeBadge({ ticketType }: { ticketType: string }) {
  const colorStyles: Record<ticketType, React.CSSProperties> = {
    'bug': { backgroundColor: 'rgb(254, 226, 226)', color: 'rgb(153, 27, 27)' },
    'idea': { backgroundColor: 'rgb(237, 233, 254)', color: 'rgb(91, 33, 182)' },
    'feedback': { backgroundColor: 'rgb(219, 234, 254)', color: 'rgb(29, 78, 216)' },
  };

  // Get the color for this status, fallback to 'open' if unknown
  const colors = colorStyles[ticketType as ticketType] || colorStyles.feedback;

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

  return <span style={badgeStyle}>{ticketType}</span>;
}