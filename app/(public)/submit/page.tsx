"use client";
import React from "react";
import styles from "./page.module.css";

export default function Page() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)

    // Extract all fields
    const data = {
      title: formData.get("title") as string,
      fname: formData.get("fname") as string,
      lname: formData.get("lname") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      attachment: formData.get("attachment") as File | null,
    };

    console.log("form submitted");
    console.log(data)
  }
  return (
    <div className={styles.ticketBody}>
      <div className={styles.intro}>
        <h2>Share your bug reports, ideas and feedback here.</h2>
      </div>

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

          <button type="submit" className={styles.button}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
