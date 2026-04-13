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
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editPriority, setEditPriority] = useState('');

  useEffect(() => {
    async function fetchTicket() {
      setIsLoading(true);
      const data = await fetch(`/api/tickets/${id}`);
      const getTicket = await data.json();
      setTicket(getTicket);
      setEditStatus(getTicket.status);
      setEditPriority(getTicket.priority);
      setIsLoading(false);
    }

    if (id) fetchTicket();
  }, [id]);

  async function handleSaveStatus() {
    if (!ticket) return;
    setIsSaving(true);

    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          updatedAt: ticket.updatedAt
        })
      });

      if (response.status === 409) {
        setConflict(true);
        const fresh = await fetch(`/api/tickets/${ticket.id}`);
        const latest = await fresh.json();
        setTicket(latest);
        setEditStatus(latest.status);
        setEditPriority(latest.priority);
        return;
      }

      if (response.ok) {
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
        setEditStatus(updatedTicket.status);
        setIsEditingStatus(false);
        setConflict(false);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      alert('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSavePriority() {
    if (!ticket) return;
    setIsSaving(true);

    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priority: editPriority,
          updatedAt: ticket.updatedAt
        })
      });

      if (response.status === 409) {
        setConflict(true);
        const fresh = await fetch(`/api/tickets/${ticket.id}`);
        const latest = await fresh.json();
        setTicket(latest);
        setEditStatus(latest.status);
        setEditPriority(latest.priority);
        return;
      }

      if (response.ok) {
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
        setEditPriority(updatedTicket.priority);
        setIsEditingPriority(false);
        setConflict(false);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      alert('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
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
        <h1>Issue #{ticket.id}: {ticket.title}</h1>
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
              {!isEditingStatus ? (
                <>
                  <StatusBadge status={ticket.status} />
                  <button
                    className={styles.iconButton}
                    onClick={() => setIsEditingStatus(true)}
                  >
                    ✏️
                  </button>
                </>
              ) : (
                <div className={styles.editControls}>
                  <select
                    className={styles.select}
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="blocked">Blocked</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    className={styles.saveButton}
                    onClick={handleSaveStatus}
                    disabled={isSaving}
                  >
                    {isSaving ? '...' : '✓'}
                  </button>

                  <button
                    className={styles.cancelButton}
                    onClick={() => {
                      setEditStatus(ticket.status);
                      setIsEditingStatus(false);
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
            <div className={styles.statusRow}>
              {!isEditingPriority ? (
                <>
                  <PriorityBadge priority={ticket.priority} />
                  <button
                    className={styles.iconButton}
                    onClick={() => setIsEditingPriority(true)}
                  >
                    ✏️
                  </button>
                </>
              ) : (
                <div className={styles.editControls}>
                  <select
                    className={styles.select}
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  <button
                    className={styles.saveButton}
                    onClick={handleSavePriority}
                    disabled={isSaving}
                  >
                    {isSaving ? '...' : '✓'}
                  </button>

                  <button
                    className={styles.cancelButton}
                    onClick={() => {
                      setEditPriority(ticket.priority);
                      setIsEditingPriority(false);
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
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