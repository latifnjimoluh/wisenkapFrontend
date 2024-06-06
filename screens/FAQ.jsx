import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const FAQ = () => {
  const faqs = [
    { question: "Comment créer un compte ?", answer: "Pour créer un compte, cliquez sur 'S'inscrire' et suivez les instructions." },
    { question: "Comment réinitialiser mon mot de passe ?", answer: "Cliquez sur 'Mot de passe oublié' sur l'écran de connexion et suivez les instructions." },
    { question: "Comment ajouter un budget ?", answer: "Accédez à l'écran 'Budgets' et cliquez sur 'Créer un Budget'. Remplissez les informations requises et enregistrez." },
    { question: "Comment suivre mes transactions ?", answer: "Vous pouvez suivre vos transactions en accédant à l'écran 'Transactions' depuis le menu principal." },
    { question: "Comment paramétrer des notifications ?", answer: "Accédez à 'Notifications & Alertes' dans les paramètres et configurez les notifications selon vos préférences." },
    { question: "Comment exporter mes données ?", answer: "Rendez-vous dans 'Export de données', sélectionnez la période souhaitée et cliquez sur 'Exporter'." },
    { question: "Comment contacter le support ?", answer: "Pour contacter le support, allez dans la section 'Support' et utilisez les options disponibles pour envoyer un email ou appeler le support." },
    { question: "Quels sont les avantages de l'abonnement ?", answer: "L'abonnement offre des fonctionnalités premium telles que des conseils personnalisés, des analyses avancées et bien plus encore. Accédez à 'Coaching' pour plus de détails." },
    { question: "Comment sécuriser mon compte ?", answer: "Vous pouvez sécuriser votre compte en activant les options de sécurité dans les paramètres, telles que l'authentification à deux facteurs." },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>FAQ</Text>

      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
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
  faqContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  answer: {
    fontSize: 16,
    color: '#1A1A1A',
  },
});

export default FAQ;
