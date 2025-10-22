import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PLAYERS } from '../constants/gameConstants';

/**
 * SessionStats component
 * Displays real-time statistics for both players
 * @param {Object} player1Stats - Player 1 statistics
 * @param {Object} player2Stats - Player 2 statistics
 * @param {number} currentPlayer - Current player number
 * @param {number} totalShots - Total shots in session
 */
const SessionStats = ({ player1Stats, player2Stats, currentPlayer, totalShots }) => {
  const calculateSuccessRate = stats => {
    if (stats.total === 0) return 0;
    return ((stats.makes / stats.total) * 100).toFixed(1);
  };

  const renderPlayerStats = (playerNum, stats) => {
    const isCurrentPlayer = currentPlayer === playerNum;

    return (
      <View
        style={[
          styles.playerCard,
          isCurrentPlayer && styles.playerCardActive,
        ]}
      >
        <View style={styles.playerHeader}>
          <Text style={[styles.playerTitle, isCurrentPlayer && styles.playerTitleActive]}>
            Player {playerNum}
          </Text>
          {isCurrentPlayer && <Text style={styles.activeBadge}>SHOOTING</Text>}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>

          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: '#4caf50' }]}>{stats.makes}</Text>
            <Text style={styles.statLabel}>Makes</Text>
          </View>

          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: '#f44336' }]}>{stats.misses}</Text>
            <Text style={styles.statLabel}>Misses</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: '#ff9800' }]}>{stats.fouls}</Text>
            <Text style={styles.statLabel}>Fouls</Text>
          </View>

          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: '#2196f3' }]}>{stats.defense}</Text>
            <Text style={styles.statLabel}>Defense</Text>
          </View>

          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: '#1a472a' }]}>
              {calculateSuccessRate(stats)}%
            </Text>
            <Text style={styles.statLabel}>Success</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalShots}>
        <Text style={styles.totalShotsValue}>{totalShots}</Text>
        <Text style={styles.totalShotsLabel}>Total Shots</Text>
      </View>

      {renderPlayerStats(PLAYERS.PLAYER_1, player1Stats)}
      {renderPlayerStats(PLAYERS.PLAYER_2, player2Stats)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  totalShots: {
    backgroundColor: '#1a472a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  totalShotsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalShotsLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  playerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerCardActive: {
    borderColor: '#1a472a',
    backgroundColor: '#e8f5e9',
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  playerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  playerTitleActive: {
    color: '#1a472a',
  },
  activeBadge: {
    backgroundColor: '#1a472a',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default SessionStats;
