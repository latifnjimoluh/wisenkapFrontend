// frontend/src/api/index.js
import axios from 'axios';

const API_URL = 'http://172.20.10.5:3000/api';

const getToken = () => {
  // Assurez-vous d'obtenir le token JWT stocké
  return localStorage.getItem('token');
};

export const creerUsers = async ({ nom, prenom, email, motDePasse }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { nom, prenom, email, motDePasse });
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
  }
};

export const verifierUsers = async (email, motDePasse) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, motDePasse });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'utilisateur :', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { 'x-access-token': getToken() },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    throw error;
  }
};

export const deconnecterUtilisateur = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, {
      headers: { 'x-access-token': getToken() },
    });
    console.log('Utilisateur déconnecté avec succès');
  } catch (error) {
    console.error('Erreur lors de la déconnexion de l\'utilisateur :', error);
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`, {
      headers: { 'x-access-token': getToken() },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions :', error);
    throw error;
  }
};

export const addTransaction = async (transaction) => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transaction, {
      headers: { 'x-access-token': getToken() },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la transaction :', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`, {
      headers: { 'x-access-token': getToken() },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, category, {
      headers: { 'x-access-token': getToken() },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la catégorie :', error);
    throw error;
  }
};

export const getBudgets = async () => {
  try {
    const response = await axios.get(`${API_URL}/budgets`, {
      headers: { 'x-access-token': getToken() },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des budgets :', error);
    throw error;
  }
};

export const addBudget = async (budget) => {
  try {
    const response = await axios.post(`${API_URL}/budgets`, budget, {
      headers: { 'x-access-token': getToken() },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du budget :', error);
    throw error;
  }
};
