# User Acceptance Testing - Phase 3

Real-world usage scenarios to validate the shot tracking system meets user needs.

## Overview

This document focuses on testing from the **end-user's perspective** - does the app actually help someone practice billiards effectively?

## User Personas

### Persona 1: Casual Player - "Weekend Warrior"
- **Name:** Alex
- **Skill Level:** Beginner/Intermediate
- **Practice Frequency:** 1-2 times per week
- **Goals:** Track improvement, understand weak areas
- **Tech Savvy:** Moderate

### Persona 2: Serious Player - "League Competitor"
- **Name:** Jordan
- **Skill Level:** Advanced
- **Practice Frequency:** 4-5 times per week
- **Goals:** Detailed analytics, performance tracking
- **Tech Savvy:** High

### Persona 3: New to Pool - "Complete Beginner"
- **Name:** Sam
- **Skill Level:** Novice
- **Practice Frequency:** Just starting
- **Goals:** Learn basics, track progress
- **Tech Savvy:** Low

---

## Real-World Scenario Testing

### Scenario 1: First Time Using the App

**User:** Sam (Beginner)
**Context:** Just installed app, wants to track first practice session

**User Story:**
> "I just learned how to play pool and want to track my practice to see if I'm getting better. I'm not sure how the app works."

**Test Steps:**

1. **Login Experience**
   - [ ] Can create account easily
   - [ ] Understands what information is needed
   - [ ] Successfully logs in

2. **First Session Setup**
   - [ ] Understands "Start Practice Session" button
   - [ ] Game type selection is clear
   - [ ] Knows what 8-ball, 9-ball mean (or can guess)
   - [ ] Successfully starts session

3. **During Practice**
   - [ ] Understands what each button means (Make, Miss, Foul, Defense)
   - [ ] Can tap buttons easily while holding cue
   - [ ] Understands which "player" is shooting
   - [ ] Sees stats updating and understands them

4. **Ending Session**
   - [ ] Knows how to end session
   - [ ] Understands what happens to data
   - [ ] Feels accomplished seeing stats

**Success Criteria:**
- ✅ Completes first session without confusion
- ✅ Understands basic statistics
- ✅ Wants to use app again

**Observed Issues:**
_[Document any confusion or pain points]_

---

### Scenario 2: Typical Practice Session

**User:** Alex (Casual)
**Context:** Regular practice at local pool hall

**User Story:**
> "I practice 8-ball once a week. I want to quickly track my shots without it feeling like work. I'm at the table, phone is on the rail."

**Test Steps:**

1. **Quick Start**
   - [ ] Can start session in under 30 seconds
   - [ ] Selects 8-ball quickly
   - [ ] Phone stays unlocked during session

2. **During Play**
   - Practices for 30 minutes, recording shots
   - [ ] Can log shots one-handed
   - [ ] Doesn't need to look at phone much
   - [ ] Buttons are large enough to tap quickly
   - [ ] No accidental taps
   - [ ] Battery usage acceptable

3. **Occasional Mistakes**
   - Accidentally taps wrong button twice
   - [ ] Can undo easily
   - [ ] Undo is quick and clear

4. **End of Session**
   - [ ] Can end session quickly
   - [ ] Glances at stats and feels satisfied
   - [ ] Understands improvement (or lack thereof)

**Success Criteria:**
- ✅ Shot logging feels natural, not disruptive
- ✅ One-handed operation works well
- ✅ Quick glance at stats is informative
- ✅ Doesn't slow down practice

**Observed Issues:**
_[Document any friction in the flow]_

---

### Scenario 3: Serious Training Session

**User:** Jordan (Advanced)
**Context:** Focused 2-hour practice session, tracking everything

**User Story:**
> "I'm training for a tournament. I want detailed data on every shot to identify patterns in my mistakes."

**Test Steps:**

1. **Session Setup**
   - [ ] Chooses correct game type (10-ball)
   - [ ] Starts session quickly

2. **Intense Practice**
   - Records 150+ shots over 2 hours
   - [ ] App performance stays smooth
   - [ ] No lag or delays
   - [ ] Battery lasts entire session
   - [ ] Data doesn't get lost

3. **Detailed Analysis**
   - [ ] Can see overall success rate
   - [ ] Can identify patterns (e.g., Player 1 has better stats)
   - [ ] Understands which situations cause misses
   - [ ] Shot history provides useful timeline

4. **Data Integrity**
   - [ ] All 150 shots recorded
   - [ ] Statistics are accurate
   - [ ] No missing data
   - [ ] Firestore has all data

**Success Criteria:**
- ✅ Handles long sessions without issues
- ✅ Statistics are detailed enough to be useful
- ✅ No data loss
- ✅ Performance stays consistent

**Observed Issues:**
_[Document any performance or data issues]_

---

### Scenario 4: Learning from Mistakes

**User:** Alex (Casual)
**Context:** Noticed low success rate, wants to understand why

**User Story:**
> "My stats show I'm missing a lot. I want to understand what types of shots I'm missing so I can practice those specifically."

**Test Steps:**

1. **Review Stats**
   - [ ] Success rate is clearly displayed
   - [ ] Can see make/miss breakdown
   - [ ] Can see foul frequency

2. **Understanding Data**
   - [ ] Understands what "50% success" means
   - [ ] Can compare Player 1 vs Player 2 stats
   - [ ] Notices patterns (e.g., misses after makes)

3. **Action Items**
   - [ ] Stats help identify what to practice
   - [ ] Motivates to improve specific areas
   - [ ] Understands progress over time (future feature)

**Success Criteria:**
- ✅ Statistics are actionable
- ✅ User gains insights
- ✅ Motivates improvement

**Observed Issues:**
_[Document if stats are confusing or not useful]_

---

### Scenario 5: Interrupted Practice

**User:** Sam (Beginner)
**Context:** Recording shots but gets interrupted

**User Story:**
> "I'm practicing and my friend calls. I need to take a break but don't want to lose my data."

**Test Steps:**

1. **Mid-Session Interruption**
   - Recording shots when phone rings
   - [ ] Answers phone call
   - [ ] App backgrounds gracefully
   - [ ] Session data preserved

2. **Return After 10 Minutes**
   - [ ] App resumes where left off
   - [ ] All shots still recorded
   - [ ] Can continue recording
   - [ ] No data lost

3. **Alternative: End Early**
   - Decides to end session early
   - [ ] Can end session with partial data
   - [ ] Data still saved
   - [ ] Can review partial session stats

**Success Criteria:**
- ✅ Session survives interruptions
- ✅ No data loss
- ✅ Can resume or end gracefully

**Observed Issues:**
_[Document any data loss or state issues]_

---

### Scenario 6: Network Issues

**User:** Jordan (Advanced)
**Context:** Practice hall has poor WiFi

**User Story:**
> "The pool hall's WiFi is terrible. I need the app to work anyway and save my data when I get home."

**Test Steps:**

1. **Offline Practice**
   - Starts session with WiFi off
   - [ ] Session starts successfully
   - [ ] Can record shots
   - [ ] No error messages
   - [ ] UI remains responsive

2. **Recording Offline**
   - Records 50 shots without network
   - [ ] All shots recorded locally
   - [ ] Statistics calculate correctly
   - [ ] No crashes

3. **Return to Network**
   - Reconnects to WiFi
   - [ ] Data syncs automatically
   - [ ] All shots appear in Firestore
   - [ ] No duplicate data
   - [ ] User notified of sync (optional)

**Success Criteria:**
- ✅ Works completely offline
- ✅ Data syncs when online
- ✅ No data loss or corruption
- ✅ User confident data is saved

**Observed Issues:**
_[Document sync issues or errors]_

---

## Usability Testing Checklist

Test with real users (not developers):

### Onboarding
- [ ] First-time user understands purpose
- [ ] Can create account without help
- [ ] Understands how to start session
- [ ] Knows what each button does

### Core Usage
- [ ] Can record shots while playing
- [ ] Doesn't disrupt practice flow
- [ ] Touch targets are accessible
- [ ] Visual feedback is clear

### Understanding Stats
- [ ] Success rate makes sense
- [ ] Understands player 1 vs player 2
- [ ] Can identify improvement areas
- [ ] Stats are motivating

### Error Recovery
- [ ] Can undo mistakes easily
- [ ] Knows how to end session
- [ ] Confident data is saved
- [ ] Knows where to find help

---

## A/B Testing Ideas (Future)

### Test 1: Button Layout
- **A:** 2x2 grid (current)
- **B:** Horizontal row
- **Measure:** Accuracy of taps, speed of recording

### Test 2: Player Labels
- **A:** "Player 1" / "Player 2"
- **B:** "Solids" / "Stripes" (for 8-ball)
- **C:** "Me practicing both sides"
- **Measure:** User comprehension

### Test 3: Statistics Display
- **A:** Current format
- **B:** Chart/graph format
- **Measure:** Usefulness, comprehension

---

## Accessibility Testing

### Vision
- [ ] Text is readable at arm's length
- [ ] Colors have sufficient contrast
- [ ] Icons are recognizable

### Motor Skills
- [ ] Buttons large enough for large fingers
- [ ] Works with gloves (winter)
- [ ] Single-tap actions (no double-tap needed)

### Cognitive
- [ ] Interface is self-explanatory
- [ ] Terminology is clear
- [ ] Limited choices (not overwhelming)

---

## User Feedback Questions

Ask testers:

1. **Overall Experience**
   - "How easy was it to start your first session?"
   - "Did recording shots feel natural or disruptive?"
   - "Would you use this during regular practice?"

2. **Specific Features**
   - "Were the shot buttons easy to tap?"
   - "Did you understand the player switching?"
   - "Were the statistics useful?"

3. **Improvements**
   - "What was confusing?"
   - "What would you change?"
   - "What features are missing?"

4. **Value**
   - "Does this help you practice better?"
   - "Would you recommend to friends?"
   - "Would you pay for this?"

---

## User Acceptance Criteria

### ✅ Accept if:
- 4/5 users complete first session without help
- 5/5 users can record shots easily
- 4/5 users understand statistics
- 5/5 users say it helps their practice
- 3/5 users would recommend to friends

### ❌ Reject if:
- Users confused about basic functionality
- Shot recording disrupts practice flow
- Statistics are not useful
- Frequent crashes or errors
- Users don't want to use it again

---

## Test Results Summary

### Session 1: [Date]

**Testers:**
1. [Name, Skill Level]
2. [Name, Skill Level]
3. [Name, Skill Level]

**Scenarios Tested:**
- [ ] First time use
- [ ] Typical session
- [ ] Serious training
- [ ] Learning from stats
- [ ] Interrupted session
- [ ] Network issues

**Key Findings:**

**Positive Feedback:**

**Issues Discovered:**

**Recommended Changes:**

**Accept/Reject:** ⬜ Accept ⬜ Reject ⬜ Needs Work

---

## Next Steps Based on Results

### If Accepted:
- Document user feedback
- Note improvement ideas for Phase 4+
- Proceed with development

### If Rejected:
- Prioritize critical issues
- Redesign problematic features
- Retest with same scenarios

### If Needs Work:
- Fix specific issues identified
- Limited retest on changed features
- Get user sign-off

---

**UAT Version:** 1.0
**Last Updated:** 2025-10-22
**Phase:** 3 - Core Shot Tracking
**Status:** Ready for User Testing
