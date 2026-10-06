/**
 * Axios instance and API request wrappers.
 *
 * The backend base URL is read from the VITE_API_BASE_URL environment
 * variable (see .env.example) and falls back to http://localhost:5000.
 */
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

/** Send an expression to the backend for calculation. */
export const calculateExpression = (expression) =>
  apiClient.post('/api/calculate', { expression });

/** Fetch a page of calculation history. */
export const fetchHistory = (params = {}) =>
  apiClient.get('/api/history', { params });

/** Toggle the favorite flag of a history record. */
export const toggleFavorite = (id) =>
  apiClient.patch(`/api/history/${id}/favorite`);

/** Delete a single history record by id. */
export const deleteHistoryRecord = (id) =>
  apiClient.delete(`/api/history/${id}`);

/** Delete every history record. */
export const clearHistory = () => apiClient.delete('/api/history');

/** Check that the backend service is alive. */
export const checkHealth = () => apiClient.get('/api/health');

export default apiClient;
