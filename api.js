import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.114:3000';

// Authentification
export const signup = async (email, password) => {
    try {
        console.log('Demande d\'inscription:', { email, password });
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, { email, password });
        console.log('Réponse d\'inscription:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur d\'inscription:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

export const login = async (email, password) => {
    try {
        console.log('Demande de connexion:', { email, password });
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        console.log('Réponse de connexion:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur de connexion:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Récupérer les détails de l'utilisateur
export const getUserDetails = async () => {
    try {
        console.log('Demande des détails utilisateur');
        const response = await axios.get(`${API_BASE_URL}/auth/user`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Réponse des détails utilisateur:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des détails utilisateur:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Mettre à jour les détails de l'utilisateur
export const updateUserDetails = async (userDetails) => {
    try {
        console.log('Demande de mise à jour des détails utilisateur:', userDetails);
        const response = await axios.put(`${API_BASE_URL}/auth/user`, userDetails, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Réponse de mise à jour des détails utilisateur:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des détails utilisateur:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

export const logout = async () => {
    try {
        console.log('Demande de déconnexion');
        const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Réponse de déconnexion:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur de déconnexion:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Récupérer les budgets de l'utilisateur connecté
export const getBudgets = async () => {
    try {
        console.log('Demande de récupération des budgets');
        const response = await axios.get(`${API_BASE_URL}/budgets`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Réponse de récupération des budgets:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des budgets:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Créer un budget
export const createBudget = async (budgetData) => {
    try {
        console.log('Demande de création de budget:', budgetData);
        const response = await axios.post(`${API_BASE_URL}/budgets`, budgetData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Réponse de création de budget:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du budget:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

// Ajouter des dépenses pour un budget
export const createExpenses = async (budgetId, expenses) => {
    try {
        console.log('Demande d\'ajout de dépenses pour le budget ID:', budgetId, expenses);
        const response = await axios.post(`${API_BASE_URL}/budgets/${budgetId}/expenses`, { expenses }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Réponse d\'ajout de dépenses:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout des dépenses:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};

export const createSaving = async (savingData) => {
    try {
        console.log('Demande d\'ajout d\'épargne:', savingData);
        const response = await axios.post(`${API_BASE_URL}/savings`, savingData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Réponse d\'ajout d\'épargne:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'épargne:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
};