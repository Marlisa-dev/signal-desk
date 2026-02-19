import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Signal Desk</h1>
        <p className={styles.description}>
          A full-stack bug tracking & feedback management system where users can
          submit feedback and admins can manage and track ticket status. Built
          with Next.js, TypeScript, and Prisma
        </p>

        <div className={styles.actions}>
          <Link href="/submit" className={styles.button}>
            Submit User Feedback
          </Link>
          <Link href="/admin/issues" className={styles.button}>
            View Admin Dashboard
          </Link>
        </div>

        <div className={styles.note}>
          <p>
            <span className={styles.arrow}>➜</span>Demo project - No
            authentication required.
          </p>
        </div>
      </div>
    </div>
  );
}
