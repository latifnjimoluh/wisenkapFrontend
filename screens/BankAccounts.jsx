import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, BackHandler } from 'react-native';

const BankAccounts = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const banks = [
    { id: '1', name: 'Banque 1' },
    { id: '2', name: 'Banque 2' },
    { id: '3', name: 'Banque 3' },
    // Ajouter plus de banques ici
  ];

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Profile'); // Rediriger vers la page d'accueil
      return true; // Prévenir le comportement par défaut
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Retirer l'écouteur lors du démontage du composant
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.bankItem} onPress={() => setModalVisible(false)}>
      <Text style={styles.bankName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Comptes Bancaires</Text>

      <TouchableOpacity style={styles.addBankButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addBankText}>+ Ajouter ma banque</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Sélectionner une banque</Text>
            <FlatList
              data={banks}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.bankList}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
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
  addBankButton: {
    borderWidth: 1,
    borderColor: '#00A8E8',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  addBankText: {
    color: '#00A8E8',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A8E8',
    marginBottom: 20,
  },
  bankList: {
    width: '100%',
  },
  bankItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  bankName: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  closeButton: {
    backgroundColor: '#00A8E8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BankAccounts;
