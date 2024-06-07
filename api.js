// File path: /path/to/api.js
import axios from 'axios';
import PushNotification from 'react-native-push-notification';
const API_BASE_URL = 'http://192.168.1.114:3000';

// Fonction pour programmer une notification locale
const scheduleNotification = (alert) => {
  const [hours, minutes] = alert.time.split(':').map(Number);
  const now = new Date();
  const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

  if (notificationTime <= now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }

  PushNotification.localNotificationSchedule({
    id: alert.id.toString(), // Assurez-vous que l'ID est unique
    channelId: "alerts-channel",
    title: "Alerte",
    message: alert.comment || "Notification de votre alerte",
    date: notificationTime,
    allowWhileIdle: true,
  });
};
// Authentification
export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Récupérer les détails de l'utilisateur
export const getUserDetails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/user`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Mettre à jour les détails de l'utilisateur
export const updateUserDetails = async (userDetails) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/auth/user`, userDetails, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Récupérer les budgets de l'utilisateur connecté
export const getBudgets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/budgets`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Récupérer les dépenses par budget
export const getExpensesByBudget = async (budgetId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/budgets/${budgetId}/expenses`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Créer un budget
export const createBudget = async (budgetData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/budgets`, budgetData, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Ajouter des dépenses pour un budget
export const createExpenses = async (budgetId, expenses) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/budgets/${budgetId}/expenses`, { expenses }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Ajouter des transactions
export const createTransactions = async (budgetId, transactions) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transactions`, { budgetId, transactions }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Ajouter une épargne
export const createSaving = async (savingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/savings`, savingData, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Récupérer l'historique des épargnes
export const getSavingsHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/savings`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Récupérer l'historique des transactions
export const getTransactionHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Récupérer les alertes
export const getAlerts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Créer une alerte
export const createAlert = async (alertData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/alerts`, alertData, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    scheduleNotification(alertData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Mettre à jour une alerte
export const updateAlert = async (alertId, alertData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/alerts/${alertId}`, alertData, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    scheduleNotification(alertData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Supprimer une alerte
export const deleteAlert = async (alertId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/alerts/${alertId}`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    PushNotification.cancelLocalNotifications({ id: alertId.toString() });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
