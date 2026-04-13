import Link from 'next/link'
import styles from './layout.module.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <Link href="/admin/dashboard" className={styles.logo}>
            Signal Desk
          </Link>
          
          <div className={styles.navLinks}>
            <Link href="/admin/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
            <Link href="/admin/issues" className={styles.navLink}>
              Issues
            </Link>
          </div>
        </div>
      </nav>
      
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}