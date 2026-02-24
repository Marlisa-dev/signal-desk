import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Signal Desk</h1>
        <p className={styles.description}>
          A production-style issue management platform with workflow governance and AI-assisted triage.
        </p>
        <p className={styles.subtitle}>
  Designed to mirror real-world issue management workflows.
</p>

        <div className={styles.actions}>
          <Link href="/submit" className={styles.buttonPrimary}>
            Submit a New Ticket
          </Link>
          <Link href="/admin/issues" className={styles.buttonSecondary}>
            Enter Admin Console
          </Link>
        </div>

        <div className={styles.note}>
          <p>
            <span className={styles.arrow}>➜</span>Demo environment with
            pre-seeded data. No sign-in required.
          </p>
        </div>
      </div>
      <div className={styles.demo_info}>
        <div className={styles.capabilities}>
          <h3>Core Capabilities</h3>
          <ul>
            <li>Governed ticket lifecycle with structured transitions</li>
            <li>Clear ownership and workload visibility</li>
            <li>Resolution time tracking and SLA awareness</li>
            <li>Advanced filtering, sorting, and search</li>
            <li>Complete activity audit history</li>
            <li>AI-assisted summaries with admin review</li>
          </ul>
        </div>
        <div className={styles.tech}>
          <h3>Technical Architecture</h3>
          <ul>
            <li>Next.js App Router with REST route handlers</li>
            <li>PostgreSQL + Prisma ORM</li>
            <li>Server-driven pagination and filtering</li>
            <li>URL-synced table state</li>
            <li>TanStack Query & Table</li>
            <li>Human-in-the-loop AI integration</li>
          </ul>
        </div>
      </div>
      <div className={styles.summary}>
        <p>Signal Desk was designed to model real-world issue management workflows. The system prioritizes clear state transitions, server-driven data management, and human-reviewed AI suggestions to reflect production-grade decision-making patterns.</p>
      </div>
    </div>

  )
}
