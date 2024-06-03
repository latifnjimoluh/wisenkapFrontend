import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';

const Settings = ({ navigation }) => {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Paramètres</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PARAMÈTRES DE L'APPLICATION</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('BankAccounts')}>
          <Text style={styles.itemText}>Comptes bancaires</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CurrencySettings')}>
          <Text style={styles.itemText}>Devises et formats de montant</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SÉCURITÉ</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SecuritySettings')}>
          <Text style={styles.itemText}>Code de sécurité et Face ID</Text>
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.itemText}>Cacher les soldes</Text>
          <Switch
            value={isBalanceHidden}
            onValueChange={setIsBalanceHidden}
            thumbColor={isBalanceHidden ? "#34C759" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <Text style={styles.note}>Utilisez cette option pour montrer WiseNkap' à des amis sans dévoiler les soldes</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABONNEMENT</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Subscription')}>
          <Text style={styles.itemText}>Actualiser mon abonnement</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFIL</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProfileSettings')}>
          <Text style={styles.itemText}>Profil et mot de passe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Logout')}>
          <Text style={styles.itemText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>version 1.0.2 (2)</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  itemText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  note: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 10,
  },
  version: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Settings;
