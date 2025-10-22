import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  const { user, userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const handleStartPractice = () => {
    navigation.navigate('GameSetup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🎱 Billiards Score Tracker</Text>
        <Text style={styles.subtitle}>Welcome, {userData?.displayName || user?.email}!</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ready to Practice?</Text>
          <Text style={styles.cardText}>
            Start a new practice session to track your shots, monitor your progress, and improve
            your game.
          </Text>
          <Button
            title="Start Practice Session"
            onPress={handleStartPractice}
            style={styles.startButton}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Coming Soon</Text>
          <Text style={styles.featureItem}>📊 Session history and analytics</Text>
          <Text style={styles.featureItem}>📈 Performance trends over time</Text>
          <Text style={styles.featureItem}>🏆 Personal records and achievements</Text>
          <Text style={styles.featureItem}>📸 Table layout photo capture</Text>
        </View>

        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
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
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a472a',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  startButton: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 12,
  },
});

export default HomeScreen;
