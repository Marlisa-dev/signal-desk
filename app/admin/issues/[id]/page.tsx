'use client'
import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { Ticket } from '@/lib/types'
import styles from './page.module.css'
import StatusBadge from "@/components/StatusBadge"
import PriorityBadge from "@/components/PriorityBadge"
import TypeBadge from "@/components/TypeBadge"

export default function IssueDetailPage({ 
  params 
}: {     
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchTicket() {
      setIsLoading(true);
      const data = await fetch(`/api/tickets/${id}`)
      const getTicket = await data.json()
      setTicket(getTicket)
      setIsLoading(false)
    }
    
    fetchTicket();
  }, [id]);
  
  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }
  
  if (!ticket) {
    return <div className={styles.notFound}>Ticket not found</div>
  }
  
  return (
    <div className={styles.container}>
      <Link href="/admin/issues" className={styles.backButton}>
        ← Back to Issues
      </Link>
      
      <div className={styles.header}>
        <h1>Issue #{ticket.id}: {ticket.title}</h1>
      </div>
      
      <div className={styles.section}>
        <h2>Details</h2>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Submitted by</span>
            <span className={styles.detailValue}>{ticket.firstName} {ticket.lastName}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Type</span>
            <span><TypeBadge ticketType={ticket.type} /> </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Status</span>
            <span><StatusBadge status={ticket.status} /> </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Priority</span>
            <span><PriorityBadge priority={ticket.priority} /> </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Created</span>
            <span className={styles.detailValue}>
              {new Date(ticket.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      <div className={styles.section}>
        <h2>Description</h2>
        <p className={styles.description}>{ticket.description}</p>
      </div>
      
      {ticket.attachment && (
        <div className={styles.section}>
          <h2>Attachment</h2>
          <p>{ticket.attachment}</p>
        </div>
      )}
    </div>
  )
}