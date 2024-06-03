import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Profile = ({ navigation }) => {
  const userName = "Nom d'utilisateur"; // Remplacez ceci par le nom de l'utilisateur connecté

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.header}>Mon Profil</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Budgets')}>
            <Text style={styles.itemText}>Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SelectCategories')}>
            <Text style={styles.itemText}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Savings')}>
            <Text style={styles.itemText}>Épargne</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('NotificationsAlerts')}>
            <Text style={styles.itemText}>Notifications & Alertes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DataExport')}>
            <Text style={styles.itemText}>Export de données</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Coaching')}>
            <Text style={styles.itemText}>Coaching</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assistance</Text>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Support')}>
            <Text style={styles.itemText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('FAQ')}>
            <Text style={styles.itemText}>FAQ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres de mon compte</Text>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.itemText}>Réglages</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Ajouter une marge en bas pour éviter que le contenu soit masqué par le footer
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#1A1A1A',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1A1A1A',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 12,
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
});

export default Profile;
