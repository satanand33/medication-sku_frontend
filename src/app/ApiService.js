import axios from 'axios';

const baseUrl = 'http://localhost:5000/medications';

const fetchMedications = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching medications:', error);
    throw error; 
  }
};

const deleteMedication = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.error('Error deleting medication:', error);
    throw error; 
  }
};

const updateMedication = async (updatedMedication) => {
  try {
    const response = await axios.put(`${baseUrl}/${updatedMedication.id}`, updatedMedication);
    return response.data; 
  } catch (error) {
    console.error('Error updating medication:', error);
    throw error; 
  }
};

const addMedication = async (medication) => {
  try {
    const response = await axios.post(baseUrl, medication);
    return response.data; 
  } catch (error) {
    console.error('Error adding medication:', error);
    throw error; 
  }
};

export { fetchMedications, deleteMedication, updateMedication, addMedication };
