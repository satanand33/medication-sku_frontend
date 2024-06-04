"use client";

import React, { useState, useEffect } from 'react';
import styles from './MedicationForm.module.css';

const MedicationForm = ({ initialValues, onSubmit }) => {
  const [medication, setMedication] = useState({
    countries: '',
    dose: '',
    medication_name: '',
    presentation: '',
    unit: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setMedication(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedication({
      ...medication,
      [name]: value,
    });
    setErrors({ ...errors, [name]: undefined }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(); 

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(medication);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!medication.countries) {
      newErrors.countries = 'Countries is required';
    }

    if (!medication.medication_name) {
      newErrors.medication_name = 'Medication Name is required';
    }

    if (!medication.dose) {
      newErrors.dose = 'Dose is required';
    }
    if (!medication.presentation) {
      newErrors.presentation = 'Presentation is required';
    }
    if (!medication.unit) {
      newErrors.unit = 'Unit is required';
    }

    return newErrors;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Country</label>
        <input
          type="text"
          name="countries"
          placeholder="Country"
          className={styles.input}
          value={medication.countries}
          onChange={handleChange}
        />
         {errors.countries && (
          <span className={styles.errorMessage}>{errors.countries}</span>
        )}
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Medication Name</label>
        <input
          type="text"
          name="medication_name"
          placeholder="Medication Name"
          className={styles.input}
          value={medication.medication_name}
          onChange={handleChange}
        />
        {errors.medication_name && (
          <span className={styles.errorMessage}>{errors.medication_name}</span>
        )}
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Dose</label>
        <input
          type="text"
          name="dose"
          placeholder="Dose"
          className={styles.input}
          value={medication.dose}
          onChange={handleChange}
        />
        {errors.dose && <span className={styles.errorMessage}>{errors.dose}</span>}
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Presentation</label>
        <input
          type="text"
          name="presentation"
          placeholder="Presentation"
          className={styles.input}
          value={medication.presentation}
          onChange={handleChange}
        />
         {errors.presentation && (
          <span className={styles.errorMessage}>{errors.presentation}</span>
        )}
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Unit</label>
        <input
          type="text"
          name="unit"
          placeholder="Unit"
          className={styles.input}
          value={medication.unit}
          onChange={handleChange}
        />
         {errors.unit && (
          <span className={styles.errorMessage}>{errors.unit}</span>
        )}
      </div>
      <button type="submit" className={styles.submitButton}>
        {initialValues ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default MedicationForm;
