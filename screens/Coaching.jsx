import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';

const Coaching = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptimizeBudget = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Coaching</Text>

      <Text style={styles.description}>
        Recevez des conseils personnalisés pour optimiser votre budget et améliorer votre santé financière.
      </Text>

      <TouchableOpacity style={styles.suggestionButton} onPress={handleOptimizeBudget}>
        <Text style={styles.suggestionButtonText}>Propositions pour optimiser le budget</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Prêt pour l'abonnement ?</Text>
            <Text style={styles.modalDescription}>
              Choisissez un abonnement pour recevoir des conseils personnalisés et optimiser votre budget.
            </Text>

            <View style={styles.planContainer}>
              <Text style={styles.planTitle}>Abonnement Mensuel - 9,99€</Text>
              <Text style={styles.planDescription}>• Conseils personnalisés</Text>
              <Text style={styles.planDescription}>• Suivi mensuel</Text>
              <Text style={styles.planDescription}>• Assistance prioritaire</Text>
            </View>

            <View style={styles.planContainer}>
              <Text style={styles.planTitle}>Abonnement Annuel - 99,99€</Text>
              <Text style={styles.planDescription}>• Conseils personnalisés</Text>
              <Text style={styles.planDescription}>• Suivi mensuel</Text>
              <Text style={styles.planDescription}>• Assistance prioritaire</Text>
              <Text style={styles.planDescription}>• 2 mois offerts</Text>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A8E8',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 30,
  },
  suggestionButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  suggestionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 20,
  },
  planContainer: {
    marginBottom: 20,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A8E8',
  },
  planDescription: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  closeButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Coaching;
