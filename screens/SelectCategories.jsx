import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const SelectCategories = ({ navigation }) => {
  const [categories, setCategories] = useState([
    { name: 'Loyer', selected: false, image: require('../assets/loyer.png') },
    { name: 'Internet', selected: false, image: require('../assets/internet.png') },
    { name: 'Téléphone', selected: false, image: require('../assets/telephone.png') },
    { name: 'Nourriture', selected: false, image: require('../assets/nourriture.png') },
    { name: 'Vêtements', selected: false, image: require('../assets/vetements.png') },
    { name: 'Sports', selected: false, image: require('../assets/Sport.png') },
  ]);
  const [other, setOther] = useState({ amount: '', comment: '', selected: false });

  const toggleCategorySelection = (index) => {
    const newCategories = [...categories];
    newCategories[index].selected = !newCategories[index].selected;
    setCategories(newCategories);
  };

  const handleOtherChange = (field, value) => {
    setOther({ ...other, [field]: value });
  };

  const handleSubmit = () => {
    console.log({ categories, other });
  };

  return (
    <SafeAreaView style={styles.safeContainer}> 
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/retour.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>Transactions</Text>
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <CheckBox
              value={category.selected}
              onValueChange={() => toggleCategorySelection(index)}
              tintColors={{ true: '#00A8E8', false: '#8E8E93' }}
            />
            <Image source={category.image} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}

        <View style={styles.categoryContainer}>
          <CheckBox
            value={other.selected}
            onValueChange={() => setOther({ ...other, selected: !other.selected })}
            tintColors={{ true: '#00A8E8', false: '#8E8E93' }}
          />
          <Image source={require('../assets/autres.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>Autre</Text>
        </View>

        {other.selected && (
          <View style={styles.otherContainer}>
            <View style={styles.amountContainer}>
              <TextInput
                style={styles.input}
                placeholder="Montant"
                value={other.amount}
                onChangeText={(value) => handleOtherChange('amount', value)}
                keyboardType="numeric"
                placeholderTextColor="#8E8E93"
              />
              <Text style={styles.currencyText}>FCFA</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Commentaire"
              value={other.comment}
              onChangeText={(value) => handleOtherChange('comment', value)}
              placeholderTextColor="#8E8E93"
            />
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Valider</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: '#00A8E8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  header: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  otherContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    color: '#1A1A1A',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  currencyText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1A1A1A',
  },
  submitButton: {
    backgroundColor: '#005D8C',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectCategories;
