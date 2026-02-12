'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation' 
import { Ticket } from "@/lib/types"
import styles from "./page.module.css";

export default function IssuesPage() {
  const router = useRouter();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
        setIsLoading(true);
        const data = await fetch("/api/tickets")
        const getTickets = await data.json()
        console.log(getTickets)
        setTickets(getTickets) 
        setIsLoading(false);
    }
    fetchTickets();
  }, [])
  
  return (
  <div className={styles.container}>
    <h1 className={styles.header}>Issues</h1>
    
    {isLoading ? (
      <div className={styles.loading}>Loading...</div>
    ) : tickets.length === 0 ? (
      <div className={styles.empty}>No tickets yet</div>
    ) : (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr 
              key={ticket.id}
              onClick={() => router.push(`/admin/issues/${ticket.id}`)}
            >
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.firstName} {ticket.lastName}</td>
              <td>{ticket.type}</td>
              <td>{ticket.status}</td>
              <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)
}