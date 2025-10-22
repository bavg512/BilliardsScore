# Phase 3: Core Shot Tracking - Testing Guide

Comprehensive testing documentation for the shot tracking system.

## Table of Contents
1. [Test Environment Setup](#test-environment-setup)
2. [Test Cases Overview](#test-cases-overview)
3. [Manual Test Cases](#manual-test-cases)
4. [Edge Cases](#edge-cases)
5. [Firestore Integration Tests](#firestore-integration-tests)
6. [User Acceptance Criteria](#user-acceptance-criteria)
7. [Known Issues](#known-issues)
8. [Test Results Log](#test-results-log)

---

## Test Environment Setup

### Prerequisites
- Firebase project configured and connected
- App running on physical device or simulator
- User account created and logged in
- Firestore database accessible

### Test Data Requirements
- Valid Firebase credentials in `app.json`
- Firestore security rules configured
- Test user account credentials

### Testing Tools
- React Native Debugger (optional)
- Firebase Console (for database verification)
- Device: iOS Simulator, Android Emulator, or Physical Device

---

## Test Cases Overview

| ID | Category | Test Case | Priority | Status |
|----|----------|-----------|----------|--------|
| TC-1 | Navigation | Navigate to Game Setup | High | ⬜ |
| TC-2 | Game Setup | Select Game Type | High | ⬜ |
| TC-3 | Game Setup | Start Practice Session | High | ⬜ |
| TC-4 | Shot Tracking | Record Make Shot | High | ⬜ |
| TC-5 | Shot Tracking | Record Miss Shot | High | ⬜ |
| TC-6 | Shot Tracking | Record Foul | High | ⬜ |
| TC-7 | Shot Tracking | Record Defense | High | ⬜ |
| TC-8 | Player Switching | Player Switch on Miss | High | ⬜ |
| TC-9 | Player Switching | Player Continue on Make | High | ⬜ |
| TC-10 | Statistics | Real-time Stat Update | High | ⬜ |
| TC-11 | Statistics | Success Rate Calculation | High | ⬜ |
| TC-12 | Undo | Undo Last Shot | High | ⬜ |
| TC-13 | Undo | Undo with No Shots | Medium | ⬜ |
| TC-14 | Session | End Session | High | ⬜ |
| TC-15 | Session | Session Persistence | High | ⬜ |
| TC-16 | History | Shot History Display | Medium | ⬜ |
| TC-17 | UI | Touch Target Size | Medium | ⬜ |
| TC-18 | Firestore | Shot Saved to Database | High | ⬜ |
| TC-19 | Firestore | Session Saved to Database | High | ⬜ |
| TC-20 | Edge Cases | Multiple Rapid Shots | Medium | ⬜ |

---

## Manual Test Cases

### TC-1: Navigate to Game Setup

**Objective:** Verify navigation from Home to Game Setup screen

**Prerequisites:**
- User logged in
- On Home screen

**Steps:**
1. Open app and log in
2. Verify Home screen loads
3. Tap "Start Practice Session" button
4. Verify Game Setup screen loads

**Expected Results:**
- ✅ "Start Practice Session" button is visible
- ✅ Button tap navigates to Game Setup screen
- ✅ Game Setup screen displays 6 game types
- ✅ Navigation is smooth without errors

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-2: Select Game Type

**Objective:** Verify game type selection and visual feedback

**Prerequisites:**
- On Game Setup screen

**Steps:**
1. Observe default selection (should be 8-Ball)
2. Tap on "9-Ball" card
3. Verify visual change (green background)
4. Tap on different game types
5. Verify only one can be selected at a time

**Expected Results:**
- ✅ 8-Ball selected by default (green background)
- ✅ Tapping a game type selects it
- ✅ Previous selection is deselected
- ✅ Selected card has green background and border
- ✅ All 6 game types are visible and tappable

**Game Types to Test:**
- [ ] 8-Ball 🎱
- [ ] 9-Ball 9️⃣
- [ ] 10-Ball 🔟
- [ ] Straight Pool ♾️
- [ ] One Pocket 1️⃣
- [ ] Bank Pool ↗️

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-3: Start Practice Session

**Objective:** Verify session creation and navigation to Active Game screen

**Prerequisites:**
- On Game Setup screen
- Game type selected

**Steps:**
1. Select "8-Ball" game type
2. Tap "Start Practice Session" button
3. Observe loading indicator (if any)
4. Verify navigation to Active Game screen
5. Verify game type displayed in header

**Expected Results:**
- ✅ Button shows loading state briefly
- ✅ Navigates to Active Game screen
- ✅ Header shows "🎱 8-Ball"
- ✅ Player 1 is marked as current player
- ✅ All stats show 0
- ✅ Shot buttons are enabled
- ✅ Shot history shows "No shots yet"

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-4: Record Make Shot

**Objective:** Verify Make shot is recorded correctly

**Prerequisites:**
- Active game session
- Player 1 is current player
- No shots recorded yet

**Steps:**
1. Tap the green "Make" button (✅)
2. Observe immediate UI updates
3. Check statistics
4. Check shot history
5. Check current player indicator

**Expected Results:**
- ✅ Total shots: 1
- ✅ Player 1 stats: Makes = 1, Total = 1
- ✅ Player 1 success rate: 100.0%
- ✅ Current player: Still Player 1 (make continues)
- ✅ Shot history shows: #1 ✅ Make, Player 1
- ✅ No errors in console

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-5: Record Miss Shot

**Objective:** Verify Miss shot is recorded and player switches

**Prerequisites:**
- Active game session
- Player 1 is current player

**Steps:**
1. Tap the red "Miss" button (❌)
2. Observe UI updates
3. Check statistics
4. Check current player
5. Check shot history

**Expected Results:**
- ✅ Total shots incremented
- ✅ Player 1 stats: Misses +1, Total +1
- ✅ Current player switches to Player 2
- ✅ Player 2 card highlighted with "SHOOTING" badge
- ✅ Shot history shows Miss entry
- ✅ Success rate recalculated correctly

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-6: Record Foul

**Objective:** Verify Foul is recorded and player switches

**Prerequisites:**
- Active game session
- Any player is current player

**Steps:**
1. Note current player number
2. Tap the orange "Foul" button (⚠️)
3. Verify player switch
4. Check statistics

**Expected Results:**
- ✅ Total shots incremented
- ✅ Current player's Foul count +1
- ✅ Player switches to other player
- ✅ Shot history shows Foul entry with correct player

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-7: Record Defense Shot

**Objective:** Verify Defense shot is recorded and player switches

**Prerequisites:**
- Active game session

**Steps:**
1. Note current player
2. Tap the blue "Defense" button (🛡️)
3. Verify player switch
4. Check statistics

**Expected Results:**
- ✅ Total shots incremented
- ✅ Current player's Defense count +1
- ✅ Player switches to other player
- ✅ Shot history shows Defense entry

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-8: Player Switching on Miss/Foul/Defense

**Objective:** Verify player automatically switches on appropriate shots

**Prerequisites:**
- Active game session

**Steps:**
1. Record a Make (Player should continue)
2. Record another Make (Player should continue)
3. Record a Miss (Player should switch)
4. Record a Make (Current player continues)
5. Record a Foul (Player should switch)
6. Record a Defense (Player should switch)

**Expected Results:**

| Shot # | Outcome | Before | After |
|--------|---------|--------|-------|
| 1 | Make | Player 1 | Player 1 |
| 2 | Make | Player 1 | Player 1 |
| 3 | Miss | Player 1 | Player 2 |
| 4 | Make | Player 2 | Player 2 |
| 5 | Foul | Player 2 | Player 1 |
| 6 | Defense | Player 1 | Player 2 |

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-9: Player Continue on Make

**Objective:** Verify player continues shooting after Make

**Prerequisites:**
- Active game session
- Player 1 is current

**Steps:**
1. Record 5 consecutive Makes
2. Verify Player 1 remains current throughout

**Expected Results:**
- ✅ All 5 Makes attributed to Player 1
- ✅ Player 1 stats: Makes = 5, Total = 5
- ✅ Player 2 stats: All zeros
- ✅ Current player remains Player 1
- ✅ Success rate = 100.0%

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-10: Real-time Statistics Update

**Objective:** Verify statistics update immediately after each shot

**Prerequisites:**
- Active game session

**Steps:**
1. Record: Make (P1)
2. Record: Miss (P1 → P2)
3. Record: Make (P2)
4. Record: Foul (P2 → P1)
5. Verify all statistics are correct

**Expected Results:**

**Total Shots:** 4

**Player 1:**
- Makes: 1
- Misses: 1
- Fouls: 0
- Defense: 0
- Total: 2
- Success Rate: 50.0%

**Player 2:**
- Makes: 1
- Misses: 0
- Fouls: 1
- Defense: 0
- Total: 2
- Success Rate: 50.0%

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-11: Success Rate Calculation

**Objective:** Verify success rate percentage is calculated correctly

**Prerequisites:**
- Active game session

**Test Scenarios:**

**Scenario 1: 100% Success**
- Record 5 Makes
- Expected: 100.0%

**Scenario 2: 0% Success**
- Record 5 Misses
- Expected: 0.0%

**Scenario 3: 50% Success**
- Record 3 Makes, 3 Misses
- Expected: 50.0%

**Scenario 4: Mixed Shots**
- Record 2 Makes, 1 Miss, 1 Foul, 1 Defense
- Expected: 40.0% (2 makes out of 5 total)

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-12: Undo Last Shot

**Objective:** Verify undo functionality works correctly

**Prerequisites:**
- Active game session with shots recorded

**Steps:**
1. Record sequence: Make, Miss, Make
2. Note current statistics
3. Tap "Undo" button
4. Confirm undo in dialog
5. Verify statistics rolled back

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ Last shot removed from history
- ✅ Total shots decremented by 1
- ✅ Player stats updated correctly
- ✅ Current player reverted to previous state
- ✅ Success rate recalculated

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-13: Undo with No Shots

**Objective:** Verify undo handles edge case of no shots

**Prerequisites:**
- Active game session
- No shots recorded

**Steps:**
1. Tap "Undo" button
2. Observe alert/dialog

**Expected Results:**
- ✅ Alert shows "No Shots" or "There are no shots to undo"
- ✅ No crash or error
- ✅ Statistics remain at zero
- ✅ No database operations attempted

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-14: End Session

**Objective:** Verify session can be ended properly

**Prerequisites:**
- Active game session with shots

**Steps:**
1. Record at least 5 shots
2. Tap "End" button
3. Verify confirmation dialog
4. Tap "End Session" in dialog
5. Verify navigation back to Home screen

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ Dialog shows "Are you sure you want to end this practice session?"
- ✅ Two options: "Cancel" and "End Session"
- ✅ Tapping "Cancel" keeps session active
- ✅ Tapping "End Session" closes session
- ✅ Navigates to Home screen
- ✅ Session saved to Firestore with status "completed"

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-15: Session Persistence in Firestore

**Objective:** Verify session data is persisted to Firestore

**Prerequisites:**
- Active game session
- Access to Firebase Console

**Steps:**
1. Start a new session (8-Ball)
2. Record several shots
3. Open Firebase Console → Firestore
4. Navigate to "sessions" collection
5. Find the active session document
6. Verify session data

**Expected Results:**

**Session Document Should Contain:**
- ✅ `userId`: Current user's UID
- ✅ `gameType`: "8-ball"
- ✅ `status`: "active"
- ✅ `startTime`: Timestamp
- ✅ `currentPlayer`: 1 or 2
- ✅ `totalShots`: Number of shots recorded
- ✅ `player1Stats`: Object with makes, misses, fouls, defense, total
- ✅ `player2Stats`: Object with makes, misses, fouls, defense, total
- ✅ `createdAt`: Timestamp

**Shots Collection:**
- ✅ Each shot has a document in "shots" collection
- ✅ Each shot has: sessionId, player, outcome, timestamp

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-16: Shot History Display

**Objective:** Verify shot history timeline displays correctly

**Prerequisites:**
- Active game session

**Steps:**
1. Record 15 shots with various outcomes
2. Scroll shot history
3. Verify display and order

**Expected Results:**
- ✅ Shows last 10 shots (most recent at top)
- ✅ Each shot shows: shot number, icon, outcome, player
- ✅ Shots are color-coded by outcome
- ✅ "Showing last 10 of 15 shots" message appears
- ✅ Scrollable if more than fits on screen
- ✅ Shot numbers are sequential (#15, #14, #13...)

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

### TC-17: Touch Target Size

**Objective:** Verify shot buttons are easy to tap (accessibility)

**Prerequisites:**
- Active game session

**Steps:**
1. Hold device as if standing at pool table
2. Attempt to tap each shot button with thumb
3. Test one-handed operation
4. Test rapid consecutive taps

**Expected Results:**
- ✅ All buttons are large enough to tap easily
- ✅ Sufficient spacing between buttons to avoid mis-taps
- ✅ Buttons respond immediately to tap
- ✅ Visual feedback on tap (opacity change)
- ✅ Can operate with one hand

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

**Notes:**
_[Add any observations]_

---

## Edge Cases

### EC-1: Rapid Shot Recording

**Objective:** Verify app handles rapid consecutive shots

**Steps:**
1. Tap Make button 10 times rapidly
2. Verify all shots recorded
3. Check Firestore for all documents

**Expected Results:**
- ✅ All 10 shots recorded
- ✅ No duplicate shots
- ✅ Statistics accurate
- ✅ No race conditions

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

---

### EC-2: Network Failure During Shot

**Objective:** Verify behavior when network is unavailable

**Steps:**
1. Start session
2. Enable airplane mode
3. Record shots
4. Disable airplane mode
5. Verify sync

**Expected Results:**
- ✅ Shots recorded locally
- ✅ No crash or error
- ✅ Shots sync when online
- ✅ User notified if sync fails

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

---

### EC-3: Long Session (100+ Shots)

**Objective:** Verify app handles long practice sessions

**Steps:**
1. Record 100+ shots
2. Monitor performance
3. Check memory usage
4. Verify all data saved

**Expected Results:**
- ✅ No performance degradation
- ✅ All shots saved to Firestore
- ✅ Statistics remain accurate
- ✅ No memory leaks

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

---

### EC-4: Multiple Undo Operations

**Objective:** Verify multiple consecutive undos work correctly

**Steps:**
1. Record 10 shots
2. Undo 5 times consecutively
3. Verify statistics
4. Record new shots

**Expected Results:**
- ✅ Each undo removes one shot
- ✅ Statistics accurate after each undo
- ✅ Current player correct after undos
- ✅ Can continue recording after undos

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

---

### EC-5: App Backgrounded During Session

**Objective:** Verify session persists when app is backgrounded

**Steps:**
1. Start session and record shots
2. Background app (home button / app switcher)
3. Wait 30 seconds
4. Return to app
5. Verify session state

**Expected Results:**
- ✅ Session still active
- ✅ Statistics preserved
- ✅ Can continue recording shots
- ✅ No data loss

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

---

### EC-6: End Session with Undo Dialog Open

**Objective:** Verify handling of simultaneous dialogs

**Steps:**
1. Record shots
2. Tap Undo
3. While dialog open, somehow trigger End Session

**Expected Results:**
- ✅ One dialog at a time
- ✅ No crash
- ✅ Graceful handling

**Actual Results:**
- [ ] Pass ⬜ Fail ⬜ Blocked

---

## Firestore Integration Tests

### FIT-1: Session Creation

**Verify:**
- [ ] Session document created in Firestore
- [ ] Contains all required fields
- [ ] Timestamps are server timestamps
- [ ] userId matches current user

---

### FIT-2: Shot Creation

**Verify:**
- [ ] Shot documents created in Firestore
- [ ] SessionId correctly references session
- [ ] Timestamp is server timestamp
- [ ] Outcome is valid enum value

---

### FIT-3: Session Update

**Verify:**
- [ ] Session stats update after each shot
- [ ] currentPlayer updates correctly
- [ ] totalShots increments

---

### FIT-4: Shot Deletion (Undo)

**Verify:**
- [ ] Shot document removed from Firestore
- [ ] Session stats updated correctly
- [ ] No orphaned data

---

### FIT-5: Session End

**Verify:**
- [ ] Session status changed to "completed"
- [ ] endTime timestamp added
- [ ] All shots remain in database

---

## User Acceptance Criteria

### Must Have (Critical)
- [ ] User can select game type
- [ ] User can start practice session
- [ ] User can record all 4 shot types
- [ ] Player switches automatically on miss/foul/defense
- [ ] Statistics update in real-time
- [ ] User can undo last shot
- [ ] User can end session
- [ ] All data persists to Firestore

### Should Have (Important)
- [ ] Shot history displays last 10 shots
- [ ] Success rate calculated correctly
- [ ] Visual feedback for current player
- [ ] Confirmation dialogs prevent accidents
- [ ] Smooth animations and transitions

### Nice to Have (Optional)
- [ ] Session survives app backgrounding
- [ ] Works offline with sync when online
- [ ] Handles rapid input without lag
- [ ] Clear empty states

---

## Known Issues

### Issue 1: [Add any discovered issues]
**Description:**
**Steps to Reproduce:**
**Expected:**
**Actual:**
**Severity:**
**Workaround:**

---

## Test Results Log

### Test Session 1
**Date:**
**Tester:**
**Device:**
**OS Version:**
**App Version:**

**Summary:**
- Total Test Cases: 20
- Passed:
- Failed:
- Blocked:
- Pass Rate:

**Critical Issues Found:**

**Notes:**

---

### Test Session 2
**Date:**
**Tester:**
**Device:**
**OS Version:**
**App Version:**

**Summary:**
- Total Test Cases: 20
- Passed:
- Failed:
- Blocked:
- Pass Rate:

**Critical Issues Found:**

**Notes:**

---

## Testing Checklist

Before marking Phase 3 as complete, verify:

**Functionality:**
- [ ] All shot types record correctly
- [ ] Player switching works
- [ ] Statistics calculate correctly
- [ ] Undo works
- [ ] Session lifecycle works

**Data Persistence:**
- [ ] Sessions save to Firestore
- [ ] Shots save to Firestore
- [ ] Data survives app restart
- [ ] Firestore security rules enforced

**User Experience:**
- [ ] UI is responsive
- [ ] No crashes
- [ ] Error messages are clear
- [ ] Touch targets are accessible
- [ ] Navigation is intuitive

**Edge Cases:**
- [ ] Handles rapid input
- [ ] Works with poor network
- [ ] Survives backgrounding
- [ ] Handles long sessions

---

## Next Steps After Testing

1. **If all tests pass:**
   - Mark Phase 3 as complete
   - Update documentation
   - Proceed to Phase 4

2. **If tests fail:**
   - Document failures
   - Create bug reports
   - Fix critical issues
   - Retest

3. **Improvements identified:**
   - Create enhancement tickets
   - Prioritize for future phases

---

**Last Updated:** 2025-10-22
**Phase:** 3 - Core Shot Tracking
**Status:** Ready for Testing
