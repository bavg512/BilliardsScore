# Phase 3 Testing - Quick Reference Guide

Quick checklist for manual testing of shot tracking functionality.

## Pre-Test Setup ✅

- [ ] Firebase configured and connected
- [ ] App running on device/simulator
- [ ] User logged in
- [ ] Firebase Console open (for verification)

---

## 15-Minute Quick Test

### 1. Navigation (2 min)
- [ ] Home screen loads
- [ ] "Start Practice Session" button works
- [ ] Game Setup screen appears

### 2. Game Setup (2 min)
- [ ] All 6 game types visible
- [ ] Can select different game types
- [ ] Selected game highlighted (green)
- [ ] "Start Practice Session" creates session
- [ ] Active Game screen loads

### 3. Shot Recording (5 min)
Record this sequence and verify after each shot:

| Shot | Type | Expected Player After | ✓ |
|------|------|----------------------|---|
| 1 | Make | Player 1 | ⬜ |
| 2 | Make | Player 1 | ⬜ |
| 3 | Miss | Player 2 | ⬜ |
| 4 | Make | Player 2 | ⬜ |
| 5 | Foul | Player 1 | ⬜ |
| 6 | Defense | Player 2 | ⬜ |
| 7 | Miss | Player 1 | ⬜ |

**Verify:**
- [ ] Total shots = 7
- [ ] Player 1: 2 makes, 1 miss, 0 fouls, 0 defense, 1 foul
- [ ] Player 2: 1 make, 1 miss, 1 foul, 1 defense
- [ ] Success rates calculated correctly

### 4. Statistics (2 min)
- [ ] Total shots counter correct
- [ ] Individual stats correct for each player
- [ ] Success rate percentages accurate
- [ ] Current player badge shows "SHOOTING"

### 5. Shot History (1 min)
- [ ] Last shots visible in timeline
- [ ] Correct icons and colors
- [ ] Shot numbers sequential
- [ ] Player numbers correct

### 6. Undo (1 min)
- [ ] Undo button shows confirmation
- [ ] Last shot removed
- [ ] Stats recalculated correctly
- [ ] Player reverted correctly

### 7. End Session (2 min)
- [ ] End button shows confirmation
- [ ] Session ends successfully
- [ ] Returns to Home screen
- [ ] Session saved to Firestore

---

## Critical Path Test (30 min)

### Complete Practice Session Simulation

**Scenario:** Practice a full 8-ball game

**Setup:**
1. Select 8-Ball
2. Start session

**Rack 1: Player 1 runs the table**
- Record 7 consecutive Makes
- Verify: Player 1 stays current, 7/7 = 100% success

**Rack 2: Back and forth**
- Make (P1), Miss (→P2), Make (P2), Miss (→P1), Miss (→P2), Make (P2)
- Verify player switches correctly

**Rack 3: With fouls**
- Make (P2), Make (P2), Foul (→P1), Defense (→P2), Make (P2)

**Verify Final Stats:**
- Total shots should match expectations
- Each player's stats accurate
- Success rates calculated correctly

**End Session:**
- End and verify save to Firestore
- Check Firebase Console

**Firestore Verification:**
- [ ] Session document exists
- [ ] All shots saved
- [ ] Stats match UI
- [ ] Timestamps present

---

## Rapid Fire Test (10 min)

### Stress Test the System

1. **Rapid Tapping**
   - Tap Make button 20 times quickly
   - Verify all 20 recorded
   - No duplicates
   - Player stayed current

2. **Rapid Switching**
   - Alternate Make and Miss 10 times
   - Verify player switches correctly each time
   - All 20 shots recorded

3. **Rapid Undo**
   - Record 10 shots
   - Undo 5 times quickly
   - Verify stats correct
   - Verify shot history correct

---

## Edge Cases Checklist (15 min)

### Test These Scenarios

- [ ] **Empty Session Undo**
  - Start session, immediately try undo
  - Should show alert, no crash

- [ ] **Long Session**
  - Record 50+ shots
  - Performance acceptable
  - All data saved

- [ ] **Network Loss**
  - Enable airplane mode
  - Record shots
  - Re-enable network
  - Shots should sync

- [ ] **Background App**
  - Record shots
  - Background app for 1 minute
  - Return to app
  - Session still active

- [ ] **End Without Shots**
  - Start session
  - Immediately end
  - Should work without errors

- [ ] **Success Rate Edge Cases**
  - All Makes → 100%
  - All Misses → 0%
  - All Fouls → 0%
  - All Defense → 0%

---

## Bug Report Template

If you find a bug, document it:

```
**Bug ID:** BUG-001
**Title:** [Short description]
**Severity:** Critical / High / Medium / Low
**Device:** [iOS/Android, version]
**Date Found:** YYYY-MM-DD

**Steps to Reproduce:**
1.
2.
3.

**Expected Result:**

**Actual Result:**

**Screenshots/Logs:**

**Workaround:**
```

---

## Pass/Fail Criteria

### ✅ PASS if:
- All shots record correctly
- Player switching works 100% of time
- Statistics always accurate
- Undo always works
- No crashes
- Data persists to Firestore

### ❌ FAIL if:
- Shots don't record
- Player switching fails
- Statistics incorrect
- Crashes occur
- Data loss happens
- Firestore save fails

---

## Quick Firestore Verification

### Check in Firebase Console:

**Sessions Collection:**
```
sessions/
  {sessionId}/
    ✓ userId: [user-uid]
    ✓ gameType: "8-ball"
    ✓ status: "active" or "completed"
    ✓ startTime: [timestamp]
    ✓ currentPlayer: 1 or 2
    ✓ totalShots: [number]
    ✓ player1Stats: { makes, misses, fouls, defense, total }
    ✓ player2Stats: { makes, misses, fouls, defense, total }
```

**Shots Collection:**
```
shots/
  {shotId}/
    ✓ sessionId: [session-id]
    ✓ player: 1 or 2
    ✓ outcome: "make"|"miss"|"foul"|"defense"
    ✓ timestamp: [timestamp]
```

---

## Common Issues & Solutions

### Issue: Stats don't update
**Solution:** Check console for errors, verify Firestore connection

### Issue: Player doesn't switch
**Solution:** Verify shot outcome is miss/foul/defense

### Issue: Undo doesn't work
**Solution:** Check if shots exist, verify Firestore permissions

### Issue: Session won't end
**Solution:** Check network connection, verify Firestore rules

### Issue: Shot history empty
**Solution:** Verify shots array populated, check component rendering

---

## Testing Completion Checklist

Before declaring testing complete:

**Core Functionality:**
- [ ] All 4 shot types work
- [ ] Player switching logic correct
- [ ] Statistics accurate
- [ ] Undo works
- [ ] Session lifecycle works

**UI/UX:**
- [ ] Responsive buttons
- [ ] Clear visual feedback
- [ ] No confusing states
- [ ] Smooth animations

**Data:**
- [ ] Firestore saves correctly
- [ ] Data survives app restart
- [ ] No data loss

**Edge Cases:**
- [ ] Handles rapid input
- [ ] Works offline
- [ ] Long sessions work
- [ ] Error cases handled

**Signed Off By:**
- Tester: _______________
- Date: _______________

---

## Next Steps

✅ **All Tests Pass?**
→ Mark Phase 3 complete
→ Update documentation
→ Proceed to Phase 4

❌ **Tests Fail?**
→ Create bug reports
→ Fix critical issues
→ Re-test

---

**Quick Reference Version:** 1.0
**Last Updated:** 2025-10-22
**Testing Phase:** Phase 3 - Core Shot Tracking
