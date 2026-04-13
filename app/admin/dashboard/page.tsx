'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Ticket } from '@/lib/types'
import styles from './page.module.css'

interface Stats {
  total: number;
  byStatus: {
    open: number;
    in_progress: number;
    blocked: number;
    closed: number;
  };
  byType: {
    bug: number;
    idea: number;
    feedback: number;
  };
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const response = await fetch('/api/tickets');
      const data = await response.json();
      const tickets = data.data || data;
      
      // Calculate stats
      const calculated: Stats = {
        total: tickets.length,
        byStatus: {
          open: tickets.filter((t: Ticket) => t.status === 'open').length,
          in_progress: tickets.filter((t: Ticket) => t.status === 'in_progress').length,
          blocked: tickets.filter((t: Ticket) => t.status === 'blocked').length,
          closed: tickets.filter((t: Ticket) => t.status === 'closed').length,
        },
        byType: {
          bug: tickets.filter((t: Ticket) => t.type === 'bug').length,
          idea: tickets.filter((t: Ticket) => t.type === 'idea').length,
          feedback: tickets.filter((t: Ticket) => t.type === 'feedback').length,
        },
        byPriority: {
          high: tickets.filter((t: Ticket) => t.priority === 'high').length,
          medium: tickets.filter((t: Ticket) => t.priority === 'medium').length,
          low: tickets.filter((t: Ticket) => t.priority === 'low').length,
        }
      };
      
      setStats(calculated);
      setRecentTickets(tickets.slice(0, 5));
      setIsLoading(false);
    }
    
    fetchStats();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!stats) {
    return <div className={styles.error}>Error loading dashboard</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      
      {/* Total Card */}
      <div className={styles.totalCard}>
        <span className={styles.totalNumber}>{stats.total}</span>
        <span className={styles.totalLabel}>Total Tickets</span>
      </div>

      {/* Status Cards */}
      <h2 className={styles.sectionTitle}>By Status</h2>
      <div className={styles.statsGrid}>
        <Link href="/admin/issues?status=open" className={`${styles.statCard} ${styles.open}`}>
          <span className={styles.statNumber}>{stats.byStatus.open}</span>
          <span className={styles.statLabel}>Open</span>
        </Link>
        
        <Link href="/admin/issues?status=in_progress" className={`${styles.statCard} ${styles.inProgress}`}>
          <span className={styles.statNumber}>{stats.byStatus.in_progress}</span>
          <span className={styles.statLabel}>In Progress</span>
        </Link>
        
        <Link href="/admin/issues?status=blocked" className={`${styles.statCard} ${styles.blocked}`}>
          <span className={styles.statNumber}>{stats.byStatus.blocked}</span>
          <span className={styles.statLabel}>Blocked</span>
        </Link>
        
        <Link href="/admin/issues?status=closed" className={`${styles.statCard} ${styles.closed}`}>
          <span className={styles.statNumber}>{stats.byStatus.closed}</span>
          <span className={styles.statLabel}>Closed</span>
        </Link>
      </div>

      {/* Type Cards */}
      <h2 className={styles.sectionTitle}>By Type</h2>
      <div className={styles.statsGrid}>
        <Link href="/admin/issues?type=bug" className={`${styles.statCard} ${styles.bug}`}>
          <span className={styles.statNumber}>{stats.byType.bug}</span>
          <span className={styles.statLabel}>Bugs</span>
        </Link>
        
        <Link href="/admin/issues?type=idea" className={`${styles.statCard} ${styles.idea}`}>
          <span className={styles.statNumber}>{stats.byType.idea}</span>
          <span className={styles.statLabel}>Ideas</span>
        </Link>
        
        <Link href="/admin/issues?type=feedback" className={`${styles.statCard} ${styles.feedback}`}>
          <span className={styles.statNumber}>{stats.byType.feedback}</span>
          <span className={styles.statLabel}>Feedback</span>
        </Link>
      </div>

      {/* Priority Cards */}
      <h2 className={styles.sectionTitle}>By Priority</h2>
      <div className={styles.statsGrid}>
        <Link href="/admin/issues?priority=high" className={`${styles.statCard} ${styles.high}`}>
          <span className={styles.statNumber}>{stats.byPriority.high}</span>
          <span className={styles.statLabel}>High</span>
        </Link>
        
        <Link href="/admin/issues?priority=medium" className={`${styles.statCard} ${styles.medium}`}>
          <span className={styles.statNumber}>{stats.byPriority.medium}</span>
          <span className={styles.statLabel}>Medium</span>
        </Link>
        
        <Link href="/admin/issues?priority=low" className={`${styles.statCard} ${styles.low}`}>
          <span className={styles.statNumber}>{stats.byPriority.low}</span>
          <span className={styles.statLabel}>Low</span>
        </Link>
      </div>

      {/* Recent Tickets */}
      <h2 className={styles.sectionTitle}>Recent Tickets</h2>
      <div className={styles.recentList}>
        {recentTickets.map(ticket => (
          <Link 
            key={ticket.id} 
            href={`/admin/issues/${ticket.id}`}
            className={styles.recentItem}
          >
            <span className={styles.recentTitle}>{ticket.title}</span>
            <span className={styles.recentMeta}>
              {ticket.type} • {ticket.status} • {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
          </Link>
        ))}
      </div>

      <Link href="/admin/issues" className={styles.viewAll}>
        View All Issues →
      </Link>
    </div>
  );
}