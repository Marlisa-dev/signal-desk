"use client";
import React, { useState } from "react";
import styles from "./page.module.css";



export default function Page() {
  // const [message, setMessage] = useState('');
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      fname: formData.get("fname") as string,
      lname: formData.get("lname") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      attachment: formData.get("attachment") as File | null,
    };

    // Send to API
    const response = await fetch ("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
  const ticket = await response.json();
  setMessage({ type: 'success', text: `Success! Ticket #${ticket.id} created.` });
  setIsSubmitting(false)
  form.reset();
} else {
  setIsSubmitting(false)
  setMessage({ type: 'error', text: 'Error: Failed to submit ticket. Please try again.' });
}



    console.log("form submitted");
    console.log(data)
  }
  return (
    <div className={styles.formWrapper}>

   

    <div className={styles.ticketBody}>
      <div className={styles.intro}>
        <h1>Bug Report Form</h1>
        <p>Share your bug reports, ideas and feedback here.</p>
      </div>
      

      {message && (
  <div className={message.type === 'success' ? styles.success : styles.error}>
    {message.text}
  </div>
)}

      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="title">Title of your request</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title of your request"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Name</label>
            <div className={styles.row}>
              <input
                id="fname"
                name="fname"
                type="text"
                placeholder="First name"
                required
              />
              <input
                id="lname"
                name="lname"
                type="text"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description of your request</label>
            <textarea
              id="description"
              name="description"
              placeholder="Leave your bug reports, ideas or feedback here"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="file-upload">
              Upload supporting document (optional)
            </label>

            <input
              id="file-upload"
              name="attachment"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              className={styles.file_upload}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="ticket-type">What type of request is this?</label>
            <select id="ticket-type" name="type" required>
              <option value="">Select an option below</option>
              <option value="bug">Reporting a Bug</option>
              <option value="idea">New Idea</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
     </div>
  );
}
