"use client";

import React from "react";

const ErrorUI: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Something went wrong</h1>
      <p style={styles.message}>
        We encountered an unexpected error. Please try again later.
      </p>
      <button style={styles.button} onClick={() => window.location.reload()}>
        Reload Page
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    textAlign: "center" as const,
    padding: "20px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#721c24",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ErrorUI;
