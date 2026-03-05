#!/usr/bin/env node
/**
 * Project Advice - UserPromptSubmit Hook
 *
 * Runs on every user prompt. Cheap regex checks for task-start or frustration
 * triggers, then calls search_advice API. Returns formatted advice as stdout.
 *
 * POC version: uses data tables for dismissals, prod API for search.
 */

const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

// === Stopwords ===
// Generic verbs, pronouns, filler. Domain nouns (deploy, migration, etc) kept.
const STOP = new Set([
  'i','a','the','to','is','it','my','me','we','do','can','you','an','of','in','on','for','with',
  'not','there','this','that','these','those','its','our','your','their','his','her',
  'let','lets',"let's",'need','want','help','should','have','has','been','was','are','be',
  'would','could','might','will','shall','may','must',
  'get','got','set','run','use','make','take','give','put','try','go','see','know','think',
  'fix','add','build','create','implement','update','remove','delete','write','change','move',
  'just','still','same','again','keep','keeps','why','what','how','when','where','then',
  'also','about','some','any','too','here','very','really','actually','currently','correctly',
  'now','well','seems','seem','looks','look','right','sure','okay','yes','yeah',
  'but','all','like','going','doing','getting','trying','having','being',
  'issue','issues','problem','problems','error','errors','thing','things','stuff','way',
  'working','work','works','broken','failing'
]);

// === Trigger Patterns ===
const TASK_START = [
  /^(let'?s|i need to|i want to|can you|help me|we need to|we should|time to)\b/i,
  /^(fix|add|build|create|implement|set up|update|refactor|migrate|deploy|remove|delete|write|change|move|configure|install|debug|test|check)\b/i,
  /\b(is broken|isn't working|doesn't work|won't start|can't connect|keeps failing|need to figure out)\b/i
];

const FRUSTRATION = [
  /\b(still broken|that didn't work|same error|try again|still not working|why is this still|this keeps|keeps happening|not working|didn't help|still failing|still getting|same issue|same problem|what the hell|wtf|ugh)\b/i
];

// === Main ===
async function main() {
  try {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim();
    let prompt;
    try {
      const parsed = JSON.parse(input);
      prompt = parsed.prompt || parsed.message || '';
    } catch {
      prompt = input;
    }

    if (!prompt || prompt.length > 500) return;

    // Check triggers (frustration first — higher priority)
    let triggerType = null;
    for (const pat of FRUSTRATION) {
      if (pat.test(prompt)) { triggerType = 'frustration'; break; }
    }
    if (!triggerType) {
      for (const pat of TASK_START) {
        if (pat.test(prompt)) { triggerType = 'task_start'; break; }
      }
    }
    if (!triggerType) return;

    // Extract keywords (max 3, domain nouns only)
    const keywords = prompt
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOP.has(w))
      .slice(0, 3)
      .join(' ');

    if (!keywords) return; // pure frustration phrase, no searchable content

    // Call search_advice API
    const creds = require(path.join(os.homedir(), '.launchcode', 'scripts', 'creds.js'));
    const searchUrl = creds.url + '/api/agents/advice?query=' + encodeURIComponent(keywords) + '&limit=3';
    const searchResp = await fetch(searchUrl, {
      headers: { 'X-API-Key': creds.key }
    });

    if (!searchResp.ok) return;
    const searchData = await searchResp.json();
    const advice = searchData.advice || searchData.data || [];
    if (advice.length === 0) return;

    // Check dismissals via data table (POC — prod uses DB filtering)
    let dismissedIds = [];
    try {
      const apiScript = path.join(os.homedir(), '.launchcode', 'scripts', 'api.js');
      const dismissResult = execSync(
        apiScript + " <<'QUERY'\nconst r = await api.tables.query('advice_dismissals', \"SELECT json->>'advice_id' as advice_id FROM advice_dismissals\");\nconsole.log(JSON.stringify(r.rows.map(x=>x.advice_id)));\nQUERY",
        { timeout: 3000, encoding: 'utf8' }
      ).trim();
      dismissedIds = JSON.parse(dismissResult);
    } catch {
      // If query fails, proceed without filtering
    }

    // Filter dismissed
    const filtered = advice.filter(a => !dismissedIds.includes(a.id));
    if (filtered.length === 0) return;

    const hit = filtered[0];
    const userName = hit.user_name || 'A teammate';
    const summary = hit.summary || hit.title;

    // Output for Claude
    if (triggerType === 'frustration') {
      console.log('💡 @' + userName + ' left advice on this: ' + summary + '\n\nadvice_id: ' + hit.id + '\n\n**[show more]** full details · **[got it]** keep working · **[dismiss]** not relevant, don\'t show again');
    } else {
      console.log('💡 Heads up — @' + userName + ' left advice about this: ' + summary + '\n\nadvice_id: ' + hit.id + '\n\n**[show more]** full details · **[got it]** keep working · **[dismiss]** not relevant, don\'t show again');
    }
  } catch {
    // Silent failure — never block Claude
  }
}

main();
