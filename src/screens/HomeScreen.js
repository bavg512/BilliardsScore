import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const HomeScreen = () => {
  const { user, userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Billiards Score Tracker</Text>
        <Text style={styles.subtitle}>Welcome, {userData?.displayName || user?.email}!</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Phase 2 Complete</Text>
          <Text style={styles.infoText}>User authentication is now working!</Text>
          <Text style={styles.infoText}>
            You are successfully logged in and your session is persisted.
          </Text>
        </View>

        <View style={styles.nextSteps}>
          <Text style={styles.nextStepsTitle}>Coming Next:</Text>
          <Text style={styles.nextStepItem}>• Game setup screen</Text>
          <Text style={styles.nextStepItem}>• Shot tracking interface</Text>
          <Text style={styles.nextStepItem}>• Session management</Text>
          <Text style={styles.nextStepItem}>• Performance analytics</Text>
        </View>

        <Button title="Logout" onPress={handleLogout} variant="outline" style={styles.logoutButton} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a472a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a472a',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  nextSteps: {
    backgroundColor: '#e8f5e9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a472a',
    marginBottom: 12,
  },
  nextStepItem: {
    fontSize: 14,
    color: '#2e7d32',
    marginBottom: 6,
  },
  logoutButton: {
    marginTop: 16,
  },
});

export default HomeScreen;
