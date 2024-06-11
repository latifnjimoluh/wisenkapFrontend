
import axios from 'axios';
const API_BASE_URL = 'http://192.168.1.114:3000';


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


// Supprimer un budget
export const deleteBudget = async (budgetId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/budgets/${budgetId}`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Récupérer toutes les devises
export const getCurrencies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/currencies`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Activer une devise
export const activateCurrency = async (currencyId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/currencies/activate`, { id: currencyId }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Récupérer la devise active
export const getActiveCurrency = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/currencies/active`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Envoi d'un e-mail avec le code de réinitialisation
export const sendResetCodeEmail = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/send-reset-code`, { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Vérification du code de réinitialisation
export const verifyResetCode = async ({ resetCode, email }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-reset-code`, { resetCode, email });
    return response.data.isValid;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Mise à jour du code de sécurité
export const updateAuthCode = async (email, resetCode, newCode) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/update-code`, { email, resetCode, newCode });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};