import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SHOT_OUTCOME_DETAILS } from '../constants/gameConstants';

/**
 * ShotHistory component
 * Displays timeline of shots taken in the session
 * @param {Array} shots - Array of shot objects
 * @param {number} limit - Maximum number of shots to display (default: 10)
 */
const ShotHistory = ({ shots, limit = 10 }) => {
  const recentShots = shots.slice(-limit).reverse();

  if (shots.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No shots yet</Text>
        <Text style={styles.emptySubtext}>Start shooting to see your history!</Text>
      </View>
    );
  }

  const renderShot = (shot, index) => {
    const details = SHOT_OUTCOME_DETAILS[shot.outcome];
    const shotNumber = shots.length - index;

    return (
      <View key={shot.id || index} style={styles.shotItem}>
        <View style={styles.shotNumber}>
          <Text style={styles.shotNumberText}>#{shotNumber}</Text>
        </View>

        <View style={[styles.shotBadge, { backgroundColor: details.color }]}>
          <Text style={styles.shotIcon}>{details.icon}</Text>
        </View>

        <View style={styles.shotInfo}>
          <Text style={styles.shotLabel}>{details.label}</Text>
          <Text style={styles.shotPlayer}>Player {shot.player}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shot History</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {recentShots.map((shot, index) => renderShot(shot, index))}

        {shots.length > limit && (
          <Text style={styles.moreText}>
            Showing last {limit} of {shots.length} shots
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  scrollView: {
    maxHeight: 250,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  shotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  shotNumber: {
    width: 40,
    marginRight: 12,
  },
  shotNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  shotBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shotIcon: {
    fontSize: 24,
  },
  shotInfo: {
    flex: 1,
  },
  shotLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  shotPlayer: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  moreText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});

export default ShotHistory;
