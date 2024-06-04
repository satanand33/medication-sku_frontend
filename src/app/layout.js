// src/app/layout.js
"use client";
import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import MedicationForm from "./components/MedicationForm";
import { useRouter } from "next/navigation";
import { fetchMedications,addMedication } from "./ApiService"; 
import styles from "./layout.module.css";

export default function RootLayout({ children }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [medications, setMedications] = useState([]); 
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meds = await fetchMedications();
        setMedications(meds);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddMedication = async (medication) => {
    try {
      const newMedication = await addMedication(medication); 
      setMedications([...medications, newMedication]);
      setModalOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };


  return (
    <html lang="en">
      <head>
        <title>Medication SKU Manager</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <button onClick={() => setModalOpen(true)} className={styles.addButton}>
          Add Medication
        </button>
        <main>{children}</main>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h1 className={styles.heading}>Add Medication</h1>
          <MedicationForm onSubmit={handleAddMedication} />
        </Modal>
      </body>
    </html>
  );
}
