"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Ticket } from "@/lib/types";
import styles from "./page.module.css";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import TypeBadge from "@/components/TypeBadge";

export default function IssuesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const filterType = searchParams.get("type") ?? "all";
  const filterStatus = searchParams.get("status") ?? "all";
  const filterPriority = searchParams.get("priority") ?? "all";
  const filterDateFrom = searchParams.get("dateFrom") ?? "";
  const filterDateTo = searchParams.get("dateTo") ?? "";

  const [searchQuery, setSearchQuery] = useState("");

  const rawPage = Number(searchParams.get("page"));
  const currentPage = !isNaN(rawPage) && rawPage > 0 ? rawPage : 1;

  const limit = 10;

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set("page", "1");
    router.push(`/admin/issues?${params.toString()}`);
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchTickets(showLoader = false) {
      try {
        if (showLoader) setIsLoading(true);

        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", String(limit));

        const res = await fetch(`/api/tickets?${params.toString()}`);

        if (!res.ok) throw new Error("Failed to fetch tickets");

        const data = await res.json();

        if (!isMounted) return;

        setTickets(data.data);
        setTotal(data.total);
        setError(null);

        const totalPages = Math.ceil(data.total / limit);

        if (currentPage > totalPages && totalPages > 0) {
          const updatedParams = new URLSearchParams(searchParams.toString());
          updatedParams.set("page", String(totalPages));
          router.replace(`/admin/issues?${updatedParams.toString()}`);
          return;
        }
      } catch (error) {
        if (!isMounted) return;
        setError("Unable to load tickets");
        console.error(error);
      } finally {
        if (showLoader && isMounted) setIsLoading(false);
      }
    }

    // Initial load (show loader)
    fetchTickets(tickets.length === 0);
    // setIsLoading(true)
    // Polling (no loader)
    const interval = setInterval(() => {
      fetchTickets(false);
    }, 50000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [searchParams.toString()]);

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`/admin/issues?${params.toString()}`);
  }

  function resetFilters() {
    router.push("/admin/issues");
  }

  // Search Feature
  function getFilteredTickets() {
    return tickets.filter((ticket) => {
      // Search filter
      if (
        searchQuery &&
        !ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Existing filters
      if (filterType !== "all" && ticket.type !== filterType) return false;
      if (filterStatus !== "all" && ticket.status !== filterStatus)
        return false;
      if (filterPriority !== "all" && ticket.priority !== filterPriority)
        return false;

      const ticketDate = new Date(ticket.createdAt);
      if (filterDateFrom && ticketDate < new Date(filterDateFrom)) return false;
      if (filterDateTo && ticketDate > new Date(filterDateTo)) return false;

      return true;
    });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Issues</h1>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filters}>
        <select
          value={filterType}
          onChange={(e) => updateParam("type", e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="bug">Bug</option>
          <option value="idea">Idea</option>
          <option value="feedback">Feedback</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => updateParam("status", e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => updateParam("priority", e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className={styles.dateFilters}>
          <input
            type="date"
            value={filterDateFrom}
            onChange={(e) => updateParam("dateFrom", e.target.value)}
            placeholder="From"
          />
          <span>to</span>
          <input
            type="date"
            value={filterDateTo}
            onChange={(e) => updateParam("dateTo", e.target.value)}
            placeholder="To"
          />
        </div>
        <button onClick={resetFilters} className={styles.resetButton}>
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
              <th>Title</th>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredTickets().map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() => router.push(`/admin/issues/${ticket.id}`)}
              >
                <td>{ticket.title}</td>
                <td>
                  {ticket.firstName} {ticket.lastName}
                </td>
                <td>
                  <TypeBadge ticketType={ticket.type} />
                </td>
                <td>
                  <StatusBadge status={ticket.status} />
                </td>
                <td>
                  <PriorityBadge priority={ticket.priority} />
                </td>
                <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {total > 0 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            Previous
          </button>

          <span className={styles.pageCount}>
            Page {currentPage} of {Math.ceil(total / limit)}
          </span>

          <button
            className={styles.pageButton}
            disabled={currentPage >= Math.ceil(total / limit)}
            onClick={() => changePage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
