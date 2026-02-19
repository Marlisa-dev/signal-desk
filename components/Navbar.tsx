import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="nav-list">
            <Link href="/submit">Submit a Bug</Link>
            <Link href="/admin/issues">Admin Dashboard</Link>
        </div>

    </nav>
  )
}
