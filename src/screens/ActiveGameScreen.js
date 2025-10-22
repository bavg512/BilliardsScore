import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useGame } from '../context/GameContext';
import { SHOT_OUTCOMES, GAME_TYPE_DETAILS } from '../constants/gameConstants';
import ShotButton from '../components/ShotButton';
import SessionStats from '../components/SessionStats';
import ShotHistory from '../components/ShotHistory';

const ActiveGameScreen = ({ navigation }) => {
  const {
    activeSession,
    shots,
    currentPlayer,
    addShot,
    undoLastShot,
    endSession,
    pauseSession,
  } = useGame();

  if (!activeSession) {
    navigation.replace('GameSetup');
    return null;
  }

  const gameDetails = GAME_TYPE_DETAILS[activeSession.gameType];

  const handleShotPress = async outcome => {
    const result = await addShot(outcome);

    if (!result.success) {
      Alert.alert('Error', 'Failed to record shot. Please try again.');
    }
  };

  const handleUndo = () => {
    if (shots.length === 0) {
      Alert.alert('No Shots', 'There are no shots to undo.');
      return;
    }

    Alert.alert(
      'Undo Last Shot',
      'Are you sure you want to undo the last shot?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Undo',
          style: 'destructive',
          onPress: async () => {
            const result = await undoLastShot();
            if (!result.success) {
              Alert.alert('Error', 'Failed to undo shot.');
            }
          },
        },
      ]
    );
  };

  const handleEndSession = () => {
    Alert.alert(
      'End Session',
      'Are you sure you want to end this practice session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Session',
          style: 'destructive',
          onPress: async () => {
            const result = await endSession();
            if (result.success) {
              navigation.replace('Home');
            } else {
              Alert.alert('Error', 'Failed to end session.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.gameType}>
            {gameDetails.icon} {gameDetails.name}
          </Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={handleUndo} style={styles.headerButton}>
              <Text style={styles.headerButtonText}>↶ Undo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEndSession} style={styles.headerButton}>
              <Text style={[styles.headerButtonText, { color: '#f44336' }]}>⏹ End</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics */}
        <SessionStats
          player1Stats={activeSession.player1Stats}
          player2Stats={activeSession.player2Stats}
          currentPlayer={currentPlayer}
          totalShots={activeSession.totalShots}
        />

        {/* Shot Buttons */}
        <View style={styles.shotButtonsContainer}>
          <Text style={styles.sectionTitle}>Record Shot</Text>
          <View style={styles.shotButtons}>
            <ShotButton outcome={SHOT_OUTCOMES.MAKE} onPress={handleShotPress} />
            <ShotButton outcome={SHOT_OUTCOMES.MISS} onPress={handleShotPress} />
            <ShotButton outcome={SHOT_OUTCOMES.FOUL} onPress={handleShotPress} />
            <ShotButton outcome={SHOT_OUTCOMES.DEFENSE} onPress={handleShotPress} />
          </View>
        </View>

        {/* Shot History */}
        <ShotHistory shots={shots} limit={10} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  gameType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a472a',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  shotButtonsContainer: {
    marginBottom: 24,
  },
  shotButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default ActiveGameScreen;
