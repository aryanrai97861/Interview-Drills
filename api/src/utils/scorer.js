// Simple keyword-based scorer
function scoreAnswers(drill, answers) {
  if (!drill || !drill.questions) return 0;
  let totalKeywords = 0;
  let matched = 0;

  for (let i = 0; i < drill.questions.length; i++) {
    const q = drill.questions[i];
    const kws = (q.keywords || []).map(k => k.toLowerCase());
    totalKeywords += kws.length;
    const ans = (answers[i] || '').toLowerCase();
    for (const kw of kws) {
      if (!kw) continue;
      if (ans.includes(kw)) matched++;
    }
  }

  if (totalKeywords === 0) return 0;
  return Math.round((matched / totalKeywords) * 100);
}

module.exports = { scoreAnswers };
