"use client"
import React from "react";
import styles from "../../styles/contacts.module.css";

const EmergencyContact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Emergency Contacts</h1>
      <p className={styles.description}>
        Quick access to urgent care numbers and emergency contacts.
      </p>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>National Emergency Numbers</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong className={styles.highlight}>Ambulance:</strong> 102
          </li>
          <li className={styles.listItem}>
            <strong className={styles.highlight}>Fire Department:</strong> 101
          </li>
          <li className={styles.listItem}>
            <strong className={styles.highlight}>Police:</strong> 100
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>Hospital Helplines</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong className={styles.highlight}>City Hospital:</strong> 011-23456789
          </li>
          <li className={styles.listItem}>
            <strong className={styles.highlight}>General Health Helpline:</strong> 1800-123-456
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyContact;
