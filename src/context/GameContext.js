import React, { createContext, useState, useContext } from 'react';
import {
  createSession,
  getSession,
  updateSession,
  addShot as addShotToDb,
  deleteShot as deleteShotFromDb,
  endSession as endSessionDb,
  pauseSession as pauseSessionDb,
  resumeSession as resumeSessionDb,
  getSessionShots,
  calculateSessionStats,
} from '../services/gameService';
import { PLAYERS, SESSION_STATUS, SHOT_OUTCOMES } from '../constants/gameConstants';

// Create Game Context
const GameContext = createContext({});

/**
 * GameProvider component
 * Manages active game session state
 */
export const GameProvider = ({ children }) => {
  const [activeSession, setActiveSession] = useState(null);
  const [shots, setShots] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.PLAYER_1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Start a new game session
   */
  const startSession = async (userId, gameType) => {
    try {
      setError(null);
      setLoading(true);

      const sessionId = await createSession(userId, gameType);
      const session = await getSession(sessionId);

      setActiveSession(session);
      setShots([]);
      setCurrentPlayer(PLAYERS.PLAYER_1);

      return { success: true, sessionId };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load an existing session
   */
  const loadSession = async sessionId => {
    try {
      setError(null);
      setLoading(true);

      const session = await getSession(sessionId);
      if (session) {
        const sessionShots = await getSessionShots(sessionId);
        setActiveSession(session);
        setShots(sessionShots);
        setCurrentPlayer(session.currentPlayer);
        return { success: true };
      }

      return { success: false, error: 'Session not found' };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a shot to the current session
   */
  const addShot = async outcome => {
    if (!activeSession) {
      return { success: false, error: 'No active session' };
    }

    try {
      setError(null);

      // Create shot data
      const shotData = {
        player: currentPlayer,
        outcome,
        ballNumber: null,
      };

      // Add to database
      const shotId = await addShotToDb(activeSession.id, shotData);

      // Add to local state
      const newShot = {
        id: shotId,
        ...shotData,
        sessionId: activeSession.id,
        timestamp: new Date(),
      };

      const updatedShots = [...shots, newShot];
      setShots(updatedShots);

      // Calculate updated stats
      const { player1Stats, player2Stats } = calculateSessionStats(updatedShots);

      // Determine next player (switch on miss, foul, or defense)
      let nextPlayer = currentPlayer;
      if (
        outcome === SHOT_OUTCOMES.MISS ||
        outcome === SHOT_OUTCOMES.FOUL ||
        outcome === SHOT_OUTCOMES.DEFENSE
      ) {
        nextPlayer = currentPlayer === PLAYERS.PLAYER_1 ? PLAYERS.PLAYER_2 : PLAYERS.PLAYER_1;
      }

      setCurrentPlayer(nextPlayer);

      // Update session in database
      await updateSession(activeSession.id, {
        totalShots: updatedShots.length,
        player1Stats,
        player2Stats,
        currentPlayer: nextPlayer,
      });

      // Update local session state
      setActiveSession({
        ...activeSession,
        totalShots: updatedShots.length,
        player1Stats,
        player2Stats,
        currentPlayer: nextPlayer,
      });

      return { success: true, shotId };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    }
  };

  /**
   * Undo the last shot
   */
  const undoLastShot = async () => {
    if (!activeSession || shots.length === 0) {
      return { success: false, error: 'No shots to undo' };
    }

    try {
      setError(null);

      const lastShot = shots[shots.length - 1];

      // Delete from database
      await deleteShotFromDb(lastShot.id);

      // Remove from local state
      const updatedShots = shots.slice(0, -1);
      setShots(updatedShots);

      // Recalculate stats
      const { player1Stats, player2Stats } = calculateSessionStats(updatedShots);

      // Determine previous player
      const previousPlayer = lastShot.player;
      setCurrentPlayer(previousPlayer);

      // Update session
      await updateSession(activeSession.id, {
        totalShots: updatedShots.length,
        player1Stats,
        player2Stats,
        currentPlayer: previousPlayer,
      });

      setActiveSession({
        ...activeSession,
        totalShots: updatedShots.length,
        player1Stats,
        player2Stats,
        currentPlayer: previousPlayer,
      });

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    }
  };

  /**
   * End the current session
   */
  const endSession = async () => {
    if (!activeSession) {
      return { success: false, error: 'No active session' };
    }

    try {
      setError(null);
      setLoading(true);

      await endSessionDb(activeSession.id);

      setActiveSession(null);
      setShots([]);
      setCurrentPlayer(PLAYERS.PLAYER_1);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Pause the current session
   */
  const pauseSession = async () => {
    if (!activeSession) {
      return { success: false, error: 'No active session' };
    }

    try {
      setError(null);
      await pauseSessionDb(activeSession.id);

      setActiveSession({
        ...activeSession,
        status: SESSION_STATUS.PAUSED,
      });

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    }
  };

  /**
   * Resume a paused session
   */
  const resumeSession = async () => {
    if (!activeSession) {
      return { success: false, error: 'No active session' };
    }

    try {
      setError(null);
      await resumeSessionDb(activeSession.id);

      setActiveSession({
        ...activeSession,
        status: SESSION_STATUS.ACTIVE,
      });

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    }
  };

  /**
   * Clear active session (without ending it)
   */
  const clearSession = () => {
    setActiveSession(null);
    setShots([]);
    setCurrentPlayer(PLAYERS.PLAYER_1);
  };

  const value = {
    activeSession,
    shots,
    currentPlayer,
    loading,
    error,
    startSession,
    loadSession,
    addShot,
    undoLastShot,
    endSession,
    pauseSession,
    resumeSession,
    clearSession,
    hasActiveSession: !!activeSession,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

/**
 * Custom hook to use game context
 */
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
