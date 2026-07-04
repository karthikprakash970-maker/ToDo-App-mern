import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>About Todo App</h1>

        <div style={styles.highlightBox}>
          Welcome to the <strong>Todo MERN App</strong> — a simple and efficient
          task management tool built using MongoDB, Express, React, and Node.js.
        </div>

        <p style={styles.text}>
          This app helps you organize your daily tasks, track your progress, and
          stay productive with a clean and minimal interface.
        </p>

        <p style={styles.footer}>
          Simple. Fast. Efficient task management for everyone.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background: "#f3f4f6",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    maxWidth: "650px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    textAlign: "center",
    borderTop: "6px solid #2a41ef",
  },

  title: {
    fontSize: "34px",
    marginBottom: "15px",
    color: "#111827",
  },

  highlightBox: {
    background: "linear-gradient(135deg, #6397f1, #2a41ef)",
    color: "#fff",
    padding: "15px",
    borderRadius: "10px",
    fontSize: "15px",
    marginBottom: "15px",
    lineHeight: "1.6",
  },

  text: {
    fontSize: "16px",
    color: "#4b5563",
    lineHeight: "1.7",
    marginBottom: "10px",
  },

  footer: {
    marginTop: "25px",
    fontSize: "14px",
    color: "#6b7280",
    fontStyle: "italic",
  },
};

export default About;