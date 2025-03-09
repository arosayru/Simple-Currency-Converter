import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const convertCurrency = async (data) => {
    const response = await axios.post(`${API_URL}/convert`, data);
    return response.data;
};

export const getTransfers = async () => {
    const response = await axios.get(`${API_URL}/transfers`);
    return response.data;
};

export const deleteTransfer = async (id) => {
    await axios.delete(`${API_URL}/transfer/${id}`);
};
