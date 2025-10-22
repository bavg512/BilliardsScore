import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { SESSION_STATUS, PLAYERS } from '../constants/gameConstants';

/**
 * Create a new game session
 * @param {string} userId - User's ID
 * @param {string} gameType - Type of game
 * @returns {Promise<string>} Session ID
 */
export const createSession = async (userId, gameType) => {
  try {
    const sessionData = {
      userId,
      gameType,
      startTime: serverTimestamp(),
      endTime: null,
      status: SESSION_STATUS.ACTIVE,
      currentPlayer: PLAYERS.PLAYER_1,
      totalShots: 0,
      player1Stats: {
        makes: 0,
        misses: 0,
        fouls: 0,
        defense: 0,
        total: 0,
      },
      player2Stats: {
        makes: 0,
        misses: 0,
        fouls: 0,
        defense: 0,
        total: 0,
      },
      shots: [],
      createdAt: serverTimestamp(),
    };

    const sessionRef = await addDoc(collection(db, 'sessions'), sessionData);
    return sessionRef.id;
  } catch (error) {
    console.error('Create session error:', error);
    throw error;
  }
};

/**
 * Get session by ID
 * @param {string} sessionId - Session ID
 * @returns {Promise<Object>} Session data
 */
export const getSession = async sessionId => {
  try {
    const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
    if (sessionDoc.exists()) {
      return { id: sessionDoc.id, ...sessionDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Get session error:', error);
    throw error;
  }
};

/**
 * Update session
 * @param {string} sessionId - Session ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export const updateSession = async (sessionId, updates) => {
  try {
    await updateDoc(doc(db, 'sessions', sessionId), updates);
  } catch (error) {
    console.error('Update session error:', error);
    throw error;
  }
};

/**
 * Add a shot to the session
 * @param {string} sessionId - Session ID
 * @param {Object} shotData - Shot data (outcome, player, timestamp)
 * @returns {Promise<string>} Shot ID
 */
export const addShot = async (sessionId, shotData) => {
  try {
    const shot = {
      sessionId,
      player: shotData.player,
      outcome: shotData.outcome,
      ballNumber: shotData.ballNumber || null,
      timestamp: serverTimestamp(),
    };

    const shotRef = await addDoc(collection(db, 'shots'), shot);
    return shotRef.id;
  } catch (error) {
    console.error('Add shot error:', error);
    throw error;
  }
};

/**
 * Get shots for a session
 * @param {string} sessionId - Session ID
 * @returns {Promise<Array>} Array of shots
 */
export const getSessionShots = async sessionId => {
  try {
    const q = query(
      collection(db, 'shots'),
      where('sessionId', '==', sessionId),
      orderBy('timestamp', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const shots = [];
    querySnapshot.forEach(doc => {
      shots.push({ id: doc.id, ...doc.data() });
    });
    return shots;
  } catch (error) {
    console.error('Get session shots error:', error);
    throw error;
  }
};

/**
 * Delete a shot
 * @param {string} shotId - Shot ID
 * @returns {Promise<void>}
 */
export const deleteShot = async shotId => {
  try {
    await deleteDoc(doc(db, 'shots', shotId));
  } catch (error) {
    console.error('Delete shot error:', error);
    throw error;
  }
};

/**
 * End a session
 * @param {string} sessionId - Session ID
 * @returns {Promise<void>}
 */
export const endSession = async sessionId => {
  try {
    await updateDoc(doc(db, 'sessions', sessionId), {
      endTime: serverTimestamp(),
      status: SESSION_STATUS.COMPLETED,
    });
  } catch (error) {
    console.error('End session error:', error);
    throw error;
  }
};

/**
 * Pause a session
 * @param {string} sessionId - Session ID
 * @returns {Promise<void>}
 */
export const pauseSession = async sessionId => {
  try {
    await updateDoc(doc(db, 'sessions', sessionId), {
      status: SESSION_STATUS.PAUSED,
    });
  } catch (error) {
    console.error('Pause session error:', error);
    throw error;
  }
};

/**
 * Resume a session
 * @param {string} sessionId - Session ID
 * @returns {Promise<void>}
 */
export const resumeSession = async sessionId => {
  try {
    await updateDoc(doc(db, 'sessions', sessionId), {
      status: SESSION_STATUS.ACTIVE,
    });
  } catch (error) {
    console.error('Resume session error:', error);
    throw error;
  }
};

/**
 * Get user's sessions
 * @param {string} userId - User ID
 * @param {number} limitCount - Number of sessions to retrieve
 * @returns {Promise<Array>} Array of sessions
 */
export const getUserSessions = async (userId, limitCount = 20) => {
  try {
    const q = query(
      collection(db, 'sessions'),
      where('userId', '==', userId),
      orderBy('startTime', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const sessions = [];
    querySnapshot.forEach(doc => {
      sessions.push({ id: doc.id, ...doc.data() });
    });
    return sessions;
  } catch (error) {
    console.error('Get user sessions error:', error);
    throw error;
  }
};

/**
 * Calculate statistics for a session
 * @param {Array} shots - Array of shots
 * @returns {Object} Statistics for both players
 */
export const calculateSessionStats = shots => {
  const player1Stats = { makes: 0, misses: 0, fouls: 0, defense: 0, total: 0 };
  const player2Stats = { makes: 0, misses: 0, fouls: 0, defense: 0, total: 0 };

  shots.forEach(shot => {
    const stats = shot.player === PLAYERS.PLAYER_1 ? player1Stats : player2Stats;
    stats[shot.outcome] = (stats[shot.outcome] || 0) + 1;
    stats.total += 1;
  });

  return { player1Stats, player2Stats };
};
