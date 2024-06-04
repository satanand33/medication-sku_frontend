"use client";

import React, { useEffect, useState } from "react";
import {
  fetchMedications,
  deleteMedication,
  updateMedication,
} from "./ApiService";
import styles from "./Medication.module.css";
import Modal from "./components/Modal";
import { useRouter } from "next/navigation";
import MedicationForm from "./components/MedicationForm";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [medications, setMedications] = useState([]);
  const [medication, setMedication] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query || {};
  const handleDelete = async (id) => {
    try {
      await deleteMedication(id);
      const meds = await fetchMedications();
      setMedications(meds);
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };
  const handleUpdateMedication = async (updatedMedication) => {
    try {
      const updatedMed = await updateMedication(updatedMedication);
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meds = await fetchMedications();
        setMedications(meds);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [handleDelete, handleUpdateMedication]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Medication List</h1>
      {error && (
        <p className={styles.error}>
          Error fetching medications: {error.message}
        </p>
      )}
      <div className={styles.medicationList}>
        {medications.map((med) => (
          <div key={med.id} className={styles.medication}>
            <div
              className={`${styles.borderLeft} (
                med.medication_name`}
            />
            <div className={styles.medCard}>
            <div className={styles.medInfo}>
              <span className={styles.medName}>{med.medication_name}</span><span> ({med.presentation})</span>
              <span className={styles.dose}>{med.dose}</span>
              </div>
              <div>
              <span className={styles.dose}>Unit: {med.unit}</span>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setMedication(med);
                }}
                className={styles.editButton}
              >
                Edit
              </button>
              <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h1 className={styles.heading}>Edit Medication</h1>
                <MedicationForm
                  initialValues={medication}
                  onSubmit={handleUpdateMedication}
                />
              </Modal>
              <button
                onClick={() => handleDelete(med.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
