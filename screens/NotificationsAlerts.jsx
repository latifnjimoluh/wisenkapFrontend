
import React from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const reminders = [
  { id: '1', time: '03:00', repeat: 'Dim, Lun, Mar, Mer, Jeu, Ven, Sam' }
];

const NotificationsAlerts = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderCard}>
            <Text style={styles.time}>{item.time}</Text>
            <View style={styles.repeatContainer}>
              <Text style={styles.repeatLabel}>Répéter</Text>
              <Text style={styles.repeatText}>{item.repeat}</Text>
            </View>
            <Switch value={true} style={styles.switch} />
            <TouchableOpacity style={styles.trashButton}>
              <Icon name="delete" size={24} color="grey" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AlertConfigScreen')}
      >
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  repeatContainer: {
    flex: 2,
    marginLeft: 16,
  },
  repeatLabel: {
    fontSize: 14,
    color: 'grey',
  },
  repeatText: {
    fontSize: 14,
    color: 'grey',
  },
  switch: {
    marginRight: 16,
  },
  trashButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007BFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
});

export default NotificationsAlerts;
