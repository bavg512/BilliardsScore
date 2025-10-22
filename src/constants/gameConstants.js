// Game Types
export const GAME_TYPES = {
  EIGHT_BALL: '8-ball',
  NINE_BALL: '9-ball',
  TEN_BALL: '10-ball',
  STRAIGHT_POOL: 'straight-pool',
  ONE_POCKET: 'one-pocket',
  BANK_POOL: 'bank-pool',
};

export const GAME_TYPE_DETAILS = {
  [GAME_TYPES.EIGHT_BALL]: {
    id: GAME_TYPES.EIGHT_BALL,
    name: '8-Ball',
    description: 'Classic 8-ball pool',
    icon: '🎱',
    maxBalls: 15,
  },
  [GAME_TYPES.NINE_BALL]: {
    id: GAME_TYPES.NINE_BALL,
    name: '9-Ball',
    description: 'Fast-paced 9-ball',
    icon: '9️⃣',
    maxBalls: 9,
  },
  [GAME_TYPES.TEN_BALL]: {
    id: GAME_TYPES.TEN_BALL,
    name: '10-Ball',
    description: 'Call shot 10-ball',
    icon: '🔟',
    maxBalls: 10,
  },
  [GAME_TYPES.STRAIGHT_POOL]: {
    id: GAME_TYPES.STRAIGHT_POOL,
    name: 'Straight Pool',
    description: 'Continuous 14.1',
    icon: '♾️',
    maxBalls: null,
  },
  [GAME_TYPES.ONE_POCKET]: {
    id: GAME_TYPES.ONE_POCKET,
    name: 'One Pocket',
    description: 'Strategic one pocket',
    icon: '1️⃣',
    maxBalls: 15,
  },
  [GAME_TYPES.BANK_POOL]: {
    id: GAME_TYPES.BANK_POOL,
    name: 'Bank Pool',
    description: 'Bank shots only',
    icon: '↗️',
    maxBalls: 15,
  },
};

// Shot Outcomes
export const SHOT_OUTCOMES = {
  MAKE: 'make',
  MISS: 'miss',
  FOUL: 'foul',
  DEFENSE: 'defense',
};

export const SHOT_OUTCOME_DETAILS = {
  [SHOT_OUTCOMES.MAKE]: {
    id: SHOT_OUTCOMES.MAKE,
    label: 'Make',
    icon: '✅',
    color: '#4caf50',
    description: 'Successful pot',
  },
  [SHOT_OUTCOMES.MISS]: {
    id: SHOT_OUTCOMES.MISS,
    label: 'Miss',
    icon: '❌',
    color: '#f44336',
    description: 'Failed attempt',
  },
  [SHOT_OUTCOMES.FOUL]: {
    id: SHOT_OUTCOMES.FOUL,
    label: 'Foul',
    icon: '⚠️',
    color: '#ff9800',
    description: 'Rules violation',
  },
  [SHOT_OUTCOMES.DEFENSE]: {
    id: SHOT_OUTCOMES.DEFENSE,
    label: 'Defense',
    icon: '🛡️',
    color: '#2196f3',
    description: 'Safety shot',
  },
};

// Player Numbers
export const PLAYERS = {
  PLAYER_1: 1,
  PLAYER_2: 2,
};

// Session Status
export const SESSION_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

// Theme Colors
export const COLORS = {
  PRIMARY: '#1a472a',
  SECONDARY: '#2e7d32',
  BACKGROUND: '#f5f5f5',
  CARD_BACKGROUND: '#ffffff',
  TEXT_PRIMARY: '#333333',
  TEXT_SECONDARY: '#666666',
  TEXT_LIGHT: '#999999',
  SUCCESS: '#4caf50',
  ERROR: '#f44336',
  WARNING: '#ff9800',
  INFO: '#2196f3',
  BORDER: '#dddddd',
};

// Default Values
export const DEFAULTS = {
  GAME_TYPE: GAME_TYPES.EIGHT_BALL,
  CURRENT_PLAYER: PLAYERS.PLAYER_1,
};
