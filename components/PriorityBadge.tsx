type Priority = 'low' | 'medium' | 'high'

export default function PriorityBadge({ priority }: { priority: string}) {
    const colorStyles: Record<Priority, React.CSSProperties> = {
        'low': { backgroundColor: 'rgb(28, 134, 220)', color: 'rgb(255, 255, 255)' },
        'medium': { backgroundColor: 'rgb(239, 168, 61)', color: 'rgb(255, 255, 255)' },
        'high': { backgroundColor: 'rgb(241, 71, 10)', color: 'rgb(255, 255, 255)' }
    };

    const colors = colorStyles[priority as Priority] || colorStyles.low;

    const badgeStyle: React.CSSProperties = {
    ...colors,
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'inline-block',
    textTransform: 'capitalize',
  };

  return <span style={badgeStyle}>{priority}</span>
}
