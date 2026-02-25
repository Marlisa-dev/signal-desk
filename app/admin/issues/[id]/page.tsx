"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Ticket } from "@/lib/types";
import styles from "./page.module.css";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import TypeBadge from "@/components/TypeBadge";

export default function IssueDetailPage() {
  const params = useParams();
  const idParam = params.id;
const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [conflict, setConflict] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTicket() {
      setIsLoading(true);

      const res = await fetch(`/api/tickets/${id}`);
      const getTicket = await res.json();

      console.log("Fetched ticket:", getTicket);

      setTicket(getTicket);
      setStatus(getTicket.status);
      setIsLoading(false);
    }

    if (id) fetchTicket();
  }, [id]);

  async function handleSave() {
    if (!ticket) return;

    
    
    console.log("Sending:", {
  status,
  updatedAt: ticket?.updatedAt
});

    const res = await fetch(`/api/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        updatedAt: ticket.updatedAt,
      }),
    });

    if (res.status === 409) {
      setConflict(true);

      const fresh = await fetch(`/api/tickets/${id}`);
      const latest = await fresh.json();

      setTicket(latest);
      setStatus(latest.status);
      return;
    }

    const updated = await res.json();
    setTicket(updated);
    setStatus(updated.status);
    setIsEditing(false);
    setConflict(false);
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!ticket) {
    return <div className={styles.notFound}>Ticket not found</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/admin/issues" className={styles.backButton}>
        ← Back to Issues
      </Link>

      <div className={styles.header}>
        <h1>
          Issue #{ticket.id}: {ticket.title}
        </h1>
      </div>

      <div className={styles.section}>
        <h2>Details</h2>

        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Submitted by</span>
            <span className={styles.detailValue}>
              {ticket.firstName} {ticket.lastName}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Type</span>
            <TypeBadge ticketType={ticket.type} />
          </div>

<div className={styles.detailItem}>
  <span className={styles.detailLabel}>Status</span>

  <div className={styles.statusRow}>
    {!isEditing ? (
      <>
        <StatusBadge status={ticket.status} />
        <button
          className={styles.iconButton}
          onClick={() => setIsEditing(true)}
        >
          ✏️
        </button>
      </>
    ) : (
      <div className={styles.editControls}>
        <select
          className={styles.select}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="closed">Closed</option>
        </select>

        <button
          className={styles.saveButton}
          onClick={handleSave}
        >
          ✓
        </button>

        <button
          className={styles.cancelButton}
          onClick={() => {
            setStatus(ticket.status);
            setIsEditing(false);
            setConflict(false);
          }}
        >
          ✕
        </button>
      </div>
    )}
  </div>
</div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Priority</span>
            <PriorityBadge priority={ticket.priority} />
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Created</span>
            <span className={styles.detailValue}>
              {new Date(ticket.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {conflict && (
        <div className={styles.conflictBanner}>
          Ticket was updated by another user. Latest version loaded.
        </div>
      )}

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
  );
}