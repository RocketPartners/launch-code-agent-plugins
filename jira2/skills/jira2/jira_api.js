#!/usr/bin/env node
/**
 * Jira API Skill (v2.0 — LaunchCode creds.js)
 *
 * Resolves Atlassian credentials via LaunchCode connections (creds.js).
 * No hardcoded URLs or keys — uses ~/.launchcode/credentials in prod,
 * or LAUNCHCODE_URL/LAUNCHCODE_API_KEY env vars for dev override.
 *
 * Credentials (in priority order):
 *   1. Environment variables: JIRA_URL, JIRA_EMAIL, JIRA_API_KEY (or JIRA_TOKEN for OAuth)
 *   2. LaunchCode creds.js: resolves atlassian provider → maps ATLASSIAN_* to JIRA_*
 */

import { resolveOrExit } from './resolve.js';

// ============================================================================
// CREDENTIALS VIA creds.js
// ============================================================================

// Credentials resolved via resolve.js

function getCredentials() {
  // Priority 1: Direct env var overrides
  if (process.env.JIRA_URL && (process.env.JIRA_API_KEY || process.env.JIRA_TOKEN)) {
    return {
      baseUrl: process.env.JIRA_URL.replace(/\/$/, ''),
      authType: process.env.JIRA_TOKEN ? 'bearer' : 'basic',
      email: process.env.JIRA_EMAIL,
      apiKey: process.env.JIRA_API_KEY,
      token: process.env.JIRA_TOKEN,
    };
  }

  // Priority 2: LaunchCode creds.js (resolveOrExit handles profile selection)
  const data = resolveOrExit('atlassian');

  // OAuth2 token → Bearer auth
  if (data.ATLASSIAN_TOKEN) {
    // OAuth connections may not have a URL — use Atlassian cloud API base
    const url = data.ATLASSIAN_URL || data.JIRA_URL;
    if (!url) {
      throw new Error(
        'OAuth2 credentials resolved but no ATLASSIAN_URL found.\n' +
        'Set JIRA_URL env var or use an API key connection with ATLASSIAN_URL configured.'
      );
    }
    return {
      baseUrl: url.replace(/\/$/, ''),
      authType: 'bearer',
      token: data.ATLASSIAN_TOKEN,
    };
  }

  // API key → Basic auth (map ATLASSIAN_* to JIRA_*)
  const url = data.ATLASSIAN_URL || data.JIRA_URL;
  const email = data.ATLASSIAN_EMAIL || data.JIRA_EMAIL;
  const rawKey = data.ATLASSIAN_API_KEY || data.JIRA_API_KEY;
  // Strip display label prefix if present (e.g. "Atlassian API Key ATATT...")
  const apiKey = rawKey ? rawKey.replace(/^Atlassian API Key\s+/i, '') : rawKey;

  if (!url || !email || !apiKey) {
    const resolved = Object.keys(data).filter(k => k[0] !== '_').join(', ');
    throw new Error(
      `Incomplete Atlassian credentials from creds.js.\n` +
      `Need: URL, EMAIL, API_KEY. Got: ${resolved || 'nothing'}`
    );
  }

  return {
    baseUrl: url.replace(/\/$/, ''),
    authType: 'basic',
    email,
    apiKey,
  };
}

// ============================================================================
// LOAD CREDENTIALS
// ============================================================================

const creds = getCredentials();

// ============================================================================
// HTTP CLIENT
// ============================================================================

async function request(method, path, body = null, queryParams = null) {
  let url = `${creds.baseUrl}${path}`;

  if (queryParams) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }

  const authHeader = creds.authType === 'bearer'
    ? `Bearer ${creds.token}`
    : `Basic ${Buffer.from(`${creds.email}:${creds.apiKey}`).toString('base64')}`;

  const options = {
    method,
    headers: {
      'Authorization': authHeader,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const text = await response.text();
    let errorDetail = text;
    try {
      errorDetail = JSON.stringify(JSON.parse(text), null, 2);
    } catch (e) { /* Use raw text */ }
    throw new Error(`${method} ${path} failed (${response.status}):\n${errorDetail}`);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// ============================================================================
// JIRA API
// ============================================================================

const jira = {
  projects: {
    list: (options = {}) => request('GET', '/rest/api/3/project/search', null, {
      maxResults: options.maxResults || 50,
      startAt: options.startAt || 0,
      orderBy: options.orderBy || 'name',
      expand: options.expand
    }),
    get: (key, options = {}) => request('GET', `/rest/api/3/project/${key}`, null, {
      expand: options.expand
    })
  },

  issues: {
    search: (jql, options = {}) => {
      const body = {
        jql,
        maxResults: options.maxResults || 50,
        fields: options.fields || ['key', 'summary', 'status', 'assignee', 'priority', 'created', 'updated']
      };
      if (options.nextPageToken) body.nextPageToken = options.nextPageToken;
      if (options.expand) body.expand = options.expand;
      return request('POST', '/rest/api/3/search/jql', body);
    },
    get: (key, options = {}) => request('GET', `/rest/api/3/issue/${key}`, null, {
      fields: options.fields?.join(','),
      expand: options.expand
    }),
    update: (key, fields) => request('PUT', `/rest/api/3/issue/${key}`, { fields }),
    updateWithOperations: (key, ops) => request('PUT', `/rest/api/3/issue/${key}`, { update: ops }),
    getTransitions: (key) => request('GET', `/rest/api/3/issue/${key}/transitions`),
    transition: (key, transitionId, fields = null) => {
      const body = { transition: { id: transitionId } };
      if (fields) body.fields = fields;
      return request('POST', `/rest/api/3/issue/${key}/transitions`, body);
    },
    getEditMeta: (key) => request('GET', `/rest/api/3/issue/${key}/editmeta`)
  },

  users: {
    search: (query, options = {}) => request('GET', '/rest/api/3/user/search', null, {
      query,
      maxResults: options.maxResults || 50,
      startAt: options.startAt || 0
    }),
    assignable: (project, options = {}) => request('GET', '/rest/api/3/user/assignable/search', null, {
      project,
      query: options.query || '',
      maxResults: options.maxResults || 50
    })
  },

  fields: {
    list: () => request('GET', '/rest/api/3/field')
  }
};

// ============================================================================
// EXECUTE CODE FROM STDIN
// ============================================================================

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const code = Buffer.concat(chunks).toString('utf-8');

  if (!code.trim()) {
    console.error('No code provided via stdin');
    process.exit(1);
  }

  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  const fn = new AsyncFunction('jira', code);
  await fn(jira);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
