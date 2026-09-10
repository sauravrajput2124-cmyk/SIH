/**
 * DEMO ML SIMULATION — NOT A MEDICAL MODEL
 * 
 * This module simulates a machine learning screening engine for the 
 * CareLink Healthcare Platform. It evaluates user responses against predefined
 * heuristic triage criteria to generate early risk indicators (Low, Moderate, High).
 * 
 * IMPORTANT SAFETY NOTICE:
 * This code strictly performs screening/triage simulation and NEVER generates
 * disease diagnoses (e.g. PCOS, Endometriosis, Anemia, Cancer).
 */

export const analyzeMenstrualSymptoms = (answers) => {
  let score = 0;
  const factors = [];

  // Q3: Regularity
  if (answers.regularity === 'No' || answers.regularity === 'q3Opt2' || answers.regularity === 'no') {
    score += 1;
    factors.push('Irregular cycle pattern detected');
  }

  // Q4: Bleeding duration
  if (answers.bleedingDuration === 'More than 7 days' || answers.bleedingDuration === 'q4Opt4' || answers.heavyDays > 7) {
    score += 2;
    factors.push('Bleeding duration exceeding 7 days');
  }

  // Q5: Bleeding intensity
  if (answers.bleedingIntensity === 'Very heavy' || answers.bleedingIntensity === 'q5Opt4') {
    score += 3;
    factors.push('Very heavy bleeding reported');
  } else if (answers.bleedingIntensity === 'Heavy' || answers.bleedingIntensity === 'q5Opt3') {
    score += 1.5;
    factors.push('Heavy bleeding reported');
  }

  // Q6: Pain score (1-10)
  const painLevel = Number(answers.painLevel || 1);
  if (painLevel >= 8) {
    score += 3;
    factors.push(`Severe dysmenorrhea pain score (${painLevel}/10)`);
  } else if (painLevel >= 6) {
    score += 1.5;
    factors.push(`Moderate dysmenorrhea pain score (${painLevel}/10)`);
  }

  // Voice / Free text symptoms processing (Multilingual: EN, HI, MR)
  const voiceText = (answers.voiceText || answers.freeText || '').toLowerCase();
  if (voiceText) {
    if (voiceText.includes('रक्तस्राव') || voiceText.includes('ब्लीडिंग') || voiceText.includes('bleeding') || voiceText.includes('blood') || voiceText.includes('heavy') || voiceText.includes('जास्त') || voiceText.includes('clot')) {
      score += 2;
      factors.push('Reported significant or heavy menstrual bleeding');
    }
    if (voiceText.includes('दुखणे') || voiceText.includes('दर्द') || voiceText.includes('pain') || voiceText.includes('cramps') || voiceText.includes('पोट') || voiceText.includes('कळा') || voiceText.includes('गोळे')) {
      score += 1.5;
      factors.push('Reported pelvic or stomach pain / cramps');
    }
    if (voiceText.includes('dizzy') || voiceText.includes('dizziness') || voiceText.includes('faint') || voiceText.includes('चक्कर') || voiceText.includes('थकवा') || voiceText.includes('fatigue')) {
      score += 1;
      factors.push('Reported dizziness or high fatigue symptoms');
    }
    if (voiceText.includes('irregular') || voiceText.includes('अनियमित') || voiceText.includes('spotting') || voiceText.includes('delay')) {
      score += 1;
      factors.push('Reported irregular pattern or unusual spotting');
    }
    if (voiceText.includes('first') || voiceText.includes('पहिली') || voiceText.includes('पहली')) {
      factors.push('First period (menarche) onset reported');
    }
  }


  // Q7: Symptoms multi-select array
  const symptoms = answers.symptoms || [];
  if (symptoms.includes('Dizziness') || symptoms.includes('symp4')) {
    score += 1;
    factors.push('Dizziness reported');
  }
  if (symptoms.includes('Abdominal cramps') || symptoms.includes('symp1')) {
    score += 0.5;
  }
  if (symptoms.includes('Fatigue') || symptoms.includes('symp3')) {
    score += 0.5;
    factors.push('High fatigue levels');
  }
  if (symptoms.includes('Unusual discharge') || symptoms.includes('symp8')) {
    score += 1;
    factors.push('Unusual vaginal discharge');
  }

  // Q8: Recurrence
  if (answers.recurrence === 'Yes' || answers.recurrence === 'q8Opt1') {
    score += 1;
    factors.push('Recurrent symptoms across previous cycles');
  }

  // Conditional Pain Impact
  if (answers.dailyImpact === 'Yes') {
    score += 1;
    factors.push('Daily activities significantly impacted by pain');
  }

  // Final Triage Classification
  let category = 'LOW';
  let color = 'emerald';

  if (score >= 6) {
    category = 'HIGH';
    color = 'rose';
  } else if (score >= 3) {
    category = 'MODERATE';
    color = 'amber';
  }

  return {
    score,
    category,
    color,
    factors,
    analyzedAt: new Date().toISOString(),
    isSimulated: true,
    disclaimer: "SIMULATED AI-ASSISTED HEALTH ANALYSIS — NOT A MEDICAL DIAGNOSIS."
  };
};
