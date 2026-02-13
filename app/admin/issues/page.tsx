'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation' 
import { Ticket } from "@/lib/types"
import styles from "./page.module.css";
import StatusBadge from "@/components/StatusBadge"
import PriorityBadge from "@/components/PriorityBadge"
import TypeBadge from "@/components/TypeBadge"

export default function IssuesPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state only (no sorting)
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterDateFrom, setFilterDateFrom] = useState<string>('');
  const [filterDateTo, setFilterDateTo] = useState<string>('');

  // Filter function (no sorting)
  function getFilteredTickets() {
    return tickets.filter(ticket => {
      if (filterType !== 'all' && ticket.type !== filterType) return false;
      if (filterStatus !== 'all' && ticket.status !== filterStatus) return false;
      if (filterPriority !== 'all' && ticket.priority !== filterPriority) return false;
      
      // Date filtering
      const ticketDate = new Date(ticket.createdAt);
      if (filterDateFrom && ticketDate < new Date(filterDateFrom)) return false;
      if (filterDateTo && ticketDate > new Date(filterDateTo)) return false;
      
      return true;
    });
  }

  function resetFilters() {
  setFilterType('all');
  setFilterStatus('all');
  setFilterPriority('all');
  setFilterDateFrom('');
  setFilterDateTo('');
}

  useEffect(() => {
    async function fetchTickets() {
      setIsLoading(true);
      const data = await fetch("/api/tickets")
      const getTickets = await data.json()
      setTickets(getTickets) 
      setIsLoading(false);
    }
    fetchTickets();
  }, [])
  
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Issues</h1>
      
      <div className={styles.filters}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="bug">Bug</option>
          <option value="idea">Idea</option>
          <option value="feedback">Feedback</option>
        </select>
        
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className={styles.dateFilters}>
          <input 
            type="date" 
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
            placeholder="From"
          />
          <span>to</span>
          <input 
            type="date" 
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
            placeholder="To"
          />
        </div>
          <button 
    onClick={resetFilters}
    className={styles.resetButton}
  >
    Reset Filters
  </button>
      </div>
      
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
              <th>Priority</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredTickets().map((ticket) => (
              <tr 
                key={ticket.id}
                onClick={() => router.push(`/admin/issues/${ticket.id}`)}
              >
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.firstName} {ticket.lastName}</td>
                <td><TypeBadge ticketType={ticket.type} /></td>
                <td><StatusBadge status={ticket.status} /></td>
                <td><PriorityBadge priority={ticket.priority} /></td>
                <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}