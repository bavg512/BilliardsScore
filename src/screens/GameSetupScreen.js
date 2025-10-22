import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { GAME_TYPES, GAME_TYPE_DETAILS } from '../constants/gameConstants';
import Button from '../components/Button';

const GameSetupScreen = ({ navigation }) => {
  const [selectedGameType, setSelectedGameType] = useState(GAME_TYPES.EIGHT_BALL);
  const { user } = useAuth();
  const { startSession, loading } = useGame();

  const handleStartGame = async () => {
    const result = await startSession(user.uid, selectedGameType);

    if (result.success) {
      navigation.navigate('ActiveGame');
    } else {
      Alert.alert('Error', 'Failed to start game session. Please try again.');
    }
  };

  const renderGameTypeCard = gameType => {
    const details = GAME_TYPE_DETAILS[gameType];
    const isSelected = selectedGameType === gameType;

    return (
      <TouchableOpacity
        key={gameType}
        style={[styles.gameCard, isSelected && styles.gameCardSelected]}
        onPress={() => setSelectedGameType(gameType)}
        activeOpacity={0.7}
      >
        <Text style={styles.gameIcon}>{details.icon}</Text>
        <Text style={[styles.gameName, isSelected && styles.gameNameSelected]}>
          {details.name}
        </Text>
        <Text style={[styles.gameDescription, isSelected && styles.gameDescriptionSelected]}>
          {details.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Select Game Type</Text>
        <Text style={styles.subtitle}>Choose the type of billiards game you're practicing</Text>

        <View style={styles.gameGrid}>
          {Object.values(GAME_TYPES).map(gameType => renderGameTypeCard(gameType))}
        </View>

        <Button
          title="Start Practice Session"
          onPress={handleStartGame}
          loading={loading}
          style={styles.startButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a472a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  gameCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameCardSelected: {
    borderColor: '#1a472a',
    backgroundColor: '#e8f5e9',
  },
  gameIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  gameName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  gameNameSelected: {
    color: '#1a472a',
  },
  gameDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  gameDescriptionSelected: {
    color: '#2e7d32',
  },
  startButton: {
    marginTop: 16,
  },
});

export default GameSetupScreen;
