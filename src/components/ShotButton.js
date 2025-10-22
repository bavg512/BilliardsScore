import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SHOT_OUTCOME_DETAILS } from '../constants/gameConstants';

/**
 * ShotButton component
 * Large, touch-friendly button for logging shot outcomes
 * @param {string} outcome - Shot outcome type
 * @param {function} onPress - Press handler
 * @param {boolean} disabled - Disabled state
 */
const ShotButton = ({ outcome, onPress, disabled = false }) => {
  const details = SHOT_OUTCOME_DETAILS[outcome];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: details.color },
        disabled && styles.buttonDisabled,
      ]}
      onPress={() => onPress(outcome)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{details.icon}</Text>
      <Text style={styles.label}>{details.label}</Text>
      <Text style={styles.description}>{details.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
});

export default ShotButton;
