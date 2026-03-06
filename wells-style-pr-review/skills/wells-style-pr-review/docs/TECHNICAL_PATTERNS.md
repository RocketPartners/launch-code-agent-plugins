# Technical Focus Areas

**When to use this guide:** When analyzing PR changes to identify security, performance, architecture, and code quality issues

## Overview

Wells' reviews prioritize **security first, always**. After security, the focus shifts to functionality (will it break?), then architecture (does it fit?), then quality (is it maintainable?).

This guide documents what to look for in each area, with examples from real reviews.

## Security (Priority #1)

Security issues ALWAYS come first in reviews. No exceptions.

### SQL Injection

**What to look for:**
- String concatenation or template literals in SQL queries
- User input used directly in queries
- Dynamic table/column names without validation

**Bad patterns:**
```js
// ❌ String concatenation
db.query(`SELECT * FROM users WHERE id = '${userId}'`);

// ❌ Template literal
db.query(`DELETE FROM ${tableName} WHERE id = ${id}`);
```

**Good patterns:**
```js
// ✅ Parameterized queries
db.query('SELECT * FROM users WHERE id = $1', [userId]);

// ✅ Whitelist for dynamic identifiers
const allowedTables = ['users', 'posts', 'comments'];
if (!allowedTables.includes(tableName)) throw new Error('Invalid table');
db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
```

**CUSTOMIZE THIS:** Add your ORM/database library patterns:
```js
// Sequelize (Node.js ORM)
// ✅ Good: User.findAll({ where: { id: userId } })
// ❌ Bad: User.findAll({ where: { id: `${userId}` } })

// TypeORM
// ✅ Good: repository.findOne({ where: { id: userId } })
// ❌ Bad: repository.query(`SELECT * WHERE id = '${userId}'`)

// Prisma
// ✅ Good: prisma.user.findUnique({ where: { id: userId } })
// ❌ Bad: prisma.$queryRaw`SELECT * FROM users WHERE id = ${userId}` (unsafe)
// ✅ Better: prisma.$queryRaw(Prisma.sql`SELECT * FROM users WHERE id = ${userId}`) (safe tagged template)
```

**Review language:**
```markdown
### Security

**1. SQL Injection Risk via String Interpolation (Critical)**

**File:** `backend/routes.js:47`

The query uses string concatenation with user input:
\`\`\`js
db.query(\`SELECT * FROM users WHERE email = '\${req.body.email}'\`)
\`\`\`

**Fix:** Use parameterized queries:
\`\`\`js
db.query('SELECT * FROM users WHERE email = $1', [req.body.email])
\`\`\`
```

---

### XSS (Cross-Site Scripting)

**What to look for:**
- `dangerouslySetInnerHTML` in React without sanitization
- Rendering user content without escaping
- `eval()`, `new Function()`, `innerHTML` with user data

**Bad patterns:**
```jsx
// ❌ Direct HTML rendering
<div dangerouslySetInnerHTML={{__html: userComment}} />

// ❌ eval with user input
eval(userProvidedCode);
```

**Good patterns:**
```jsx
// ✅ Sanitize first
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(userComment)}} />

// ✅ Use text content, not HTML
<div>{userComment}</div>
```

**CUSTOMIZE THIS:** Add your framework's XSS patterns:
```js
// Vue.js
// ❌ Bad: <div v-html="userComment"></div>
// ✅ Good: <div>{{ userComment }}</div> (auto-escaped)

// Angular
// ❌ Bad: <div [innerHTML]="userComment"></div>
// ✅ Good: <div>{{ userComment }}</div> (auto-escaped)
// ✅ Good: Use DomSanitizer.sanitize() for HTML content

// Svelte
// ❌ Bad: {@html userComment}
// ✅ Good: {userComment} (auto-escaped)
```

---

### Context-Appropriate Escaping

**What to look for:**
- HTML entities in plain-text contexts (email subjects, text bodies, JSON)
- Raw text in HTML contexts
- URL encoding in non-URL contexts
- SQL escaping in application code (should use parameterized queries)

**Bad patterns:**
```js
// ❌ HTML entities in plain-text email subject
const subject = `Achievement: ${escapeHtml(achievementName)}`;
// User sees: "Bob&#039;s First Kudos" instead of "Bob's First Kudos"

// ❌ Raw user input in HTML
const html = `<div>${userName}</div>`; // No escaping

// ❌ URL encoding in JSON
const json = { name: encodeURIComponent(userName) }; // Wrong context
```

**Good patterns:**
```js
// ✅ Context-appropriate escaping
const subject = achievementName; // Plain text - no escaping
const textBody = `You earned: ${achievementName}`; // Plain text - no escaping
const htmlBody = `<p>You earned: ${escapeHtml(achievementName)}</p>`; // HTML - escape

// ✅ URL encoding only in URLs
const url = `/user/${encodeURIComponent(userName)}`;
const json = { name: userName }; // JSON handles escaping
```

**Review language:**
```markdown
**Must fix: HTML entities in plain-text email subject**

**File:** `email-service.js:45`

\`safeAchievementName\` has HTML-escaped entities, but email subjects are plain text, not HTML. Users will see \`Bob&amp;#039;s First\` instead of \`Bob's First\`.

Use raw values for subject and text body; only escape for the HTML body:
\`\`\`js
const subject = achievementName; // Plain text
const htmlBody = \`<p>You earned: \${escapeHtml(achievementName)}</p>\`; // HTML
\`\`\`
```

---

### Authentication & Authorization

**What to look for:**
- Missing authentication checks on endpoints
- Authorization bypasses (checking wrong user ID)
- RLS policy bypasses (queries without proper context)
- Token validation skipped
- Permission checks in wrong order

**Bad patterns:**
```js
// ❌ No auth check
app.get('/api/user/:id', async (req, res) => {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.json(user);
});

// ❌ Wrong user ID check
if (resource.userId === req.body.userId) { // User can pass any ID!
  // allow access
}
```

**Good patterns:**
```js
// ✅ Auth middleware + proper ID check
app.get('/api/user/:id', requireAuth, async (req, res) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).json({error: 'Forbidden'});
  }
  const user = await db.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
  res.json(user);
});
```

**CUSTOMIZE THIS:** Add your authentication/authorization patterns:
```js
// JWT-based auth
// ✅ Good: Verify token signature, check expiry, use req.user from middleware
// ❌ Bad: Trust client-provided user IDs without token verification

// Session-based auth
// ✅ Good: Check req.session.userId, regenerate session on privilege escalation
// ❌ Bad: Store sensitive data in client-side cookies

// OAuth/OIDC
// ✅ Good: Validate access tokens with provider, check scopes
// ❌ Bad: Skip token validation, trust client-provided claims

// API Keys
// ✅ Good: Store hashed keys, rotate regularly, scope to specific resources
// ❌ Bad: Store plain-text keys in database, never rotate
```

**Review language:**
```markdown
**2. Authorization Bypass (Security)**

**File:** `api.js:123`

The check uses `req.body.userId` which the client controls:
\`\`\`js
if (resource.userId === req.body.userId) { /* allow */ }
\`\`\`

An attacker can pass any user ID. Use the authenticated user's ID:
\`\`\`js
if (resource.userId === req.user.id) { /* allow */ }
\`\`\`
```

---

### Multi-Tenant Security

**What to look for in multi-tenant apps:**
- Tenant isolation violations (queries missing tenant_id filters)
- Cross-tenant data leaks (CTEs aggregating across all tenants)
- Tenant-scoped URLs broken (using single global URL instead of tenant subdomain)
- RLS bypass needed for tenant-wide uniqueness checks (slug availability)

**Bad patterns:**
```js
// ❌ Missing tenant isolation
const counts = await db.query(`
  SELECT user_id, COUNT(*)
  FROM subscribers
  GROUP BY user_id
`); // Returns counts across ALL tenants!

// ❌ Single global URL for multi-tenant app
const appUrl = process.env.APP_URL || 'https://myapp.com';
const link = `${appUrl}/resource/${id}`;
// Should be: https://tenant-slug.myapp.com/resource/${id}
```

**Good patterns:**
```js
// ✅ Tenant-scoped aggregation
const counts = await db.query(`
  SELECT user_id, COUNT(*)
  FROM subscribers
  WHERE tenant_id = $1
  GROUP BY user_id
`, [tenantId]);

// ✅ Tenant-specific URL construction
const tenantSlug = await getTenantSlug(tenantId);
const appUrl = `https://${tenantSlug}.myapp.com`;
const link = `${appUrl}/resource/${id}`;
```

**Review language:**
```markdown
**Blocking: Tenant isolation violation in CTE**

**File:** `routes.js:253`

The `subscriber_counts` CTE aggregates across all tenants:
\`\`\`sql
SELECT user_id, COUNT(*) FROM subscribers GROUP BY user_id
\`\`\`

This leaks cross-tenant subscriber counts. Add tenant scoping:
\`\`\`sql
SELECT user_id, COUNT(*)
FROM subscribers
WHERE tenant_id = $1
GROUP BY user_id
\`\`\`
```

---

### Secrets & Credentials

**What to look for:**
- API keys, passwords, tokens in code
- `.env` files committed to git
- Credentials in logs or error messages
- Hardcoded connection strings

**Bad patterns:**
```js
// ❌ Hardcoded API key
const API_KEY = 'sk-abc123def456';

// ❌ Credentials in connection string
const db = new Database('postgres://admin:password123@localhost/db');
```

**Good patterns:**
```js
// ✅ Environment variables
const API_KEY = process.env.API_KEY;

// ✅ Masked in logs
console.log('API key:', API_KEY.substring(0, 5) + '...');
```

---

## Blockers (Priority #2)

Issues that break functionality or violate critical requirements.

### Runtime Errors

**What to look for:**
- Undefined variable references
- Null pointer dereferences
- Type errors (calling non-function, accessing property of undefined)
- Missing required parameters
- Unhandled promise rejections

**Example from real review:**
```markdown
**1. Variable Name Mismatch Causes ReferenceError (Critical Bug)**

**File:** `ProjectDetail.jsx:236`

Line 236:
\`\`\`js
const [selectedUserId, setSelectedProfileUserId] = useState(null);
\`\`\`

You defined the setter as \`setSelectedProfileUserId\`, but then call it as \`setSelectedUserId\` at lines 901 and 963. This will crash when users click member names.

**Fix:**
\`\`\`js
const [selectedUserId, setSelectedUserId] = useState(null);
\`\`\`
```

---

### Accessibility Violations (WCAG 2.1)

**What to look for:**
- Buttons without `type="button"` (will submit forms)
- Missing ARIA labels on interactive elements
- Nested interactive elements (button inside button/link)
- No keyboard navigation support
- Color contrast below 4.5:1 ratio
- Images without alt text

**Example from real review:**
```markdown
**1. Accessibility violation: button inside clickable div (WCAG 2.1.1 Failure)**

**File:** `RecentActivityWidget.jsx:98-108`

You have a `<button>` nested inside a `<div onClick={...}>`. This breaks keyboard navigation and confuses screen readers.

**Fix:** Use individual buttons for each clickable element:
\`\`\`jsx
<button onClick={() => onUserClick(item.user_id)}>
  {item.user_name}
</button>
<button onClick={onClick}>
  {item.target_name}
</button>
\`\`\`
```

---

### Breaking API Changes

**What to look for:**
- Renamed endpoints without deprecation path
- Changed response format without version bump
- Removed required fields
- Changed parameter types

**Example from real review:**
```markdown
**3. Breaking change not mitigated**

You renamed `/team-plugins` to `/project-plugins` but didn't provide a deprecation path. External clients calling the old endpoint will get 404 errors.

**Options:**
1. Add a deprecated alias that redirects
2. Document the breaking change in CHANGELOG.md
3. Verify no clients are using the old endpoint
```

---

## Should-Fix (Priority #3)

Quality issues that impact maintainability but don't break functionality.

### Pattern Violations

**What to look for:**
- Code that doesn't follow established conventions
- Inconsistent API helper patterns
- Different error handling approach than rest of codebase
- Non-standard file organization

**Example from real review:**
```markdown
**2. Inconsistent API helper pattern (Pattern Violation)**

**File:** `sync-files/api.js:1086-1089`

You're building query strings manually:
\`\`\`js
const params = new URLSearchParams(opts).toString();
return request('GET', \`/api/endpoint?\${params}\`);
\`\`\`

But \`getTeamAchievements\` (line 1083) doesn't do this. Check how other functions in this file handle query params and match the pattern.
```

**CUSTOMIZE THIS:** Document your team's patterns:
- **React components:** Functional vs class, hooks conventions, prop naming
- **Backend routes:** Middleware usage, error handling, validation
- **Database access:** Query builders vs raw SQL, transaction patterns
- **Testing:** Describe blocks, assertion style, mock strategies

---

### Code Duplication

**What to look for:**
- Copy-pasted functions (could be extracted)
- Duplicated logic across files
- Similar components that could be abstracted
- Repeated validation/formatting code

**Example:**
```markdown
**4. Date parsing duplicated between FiltersContext and E2E tests**

**Files:** `chats.test.js:1420`, `FiltersContext.jsx:36`

Your E2E tests define `formatDate` inline, but this is identical to `formatDateLocal()` from `utils/dateUtils.js`. Import and reuse instead of duplicating.
```

---

### Performance Issues (Non-Critical)

**What to look for:**
- N+1 queries (query in a loop)
- Missing indexes on queried fields
- Inefficient algorithms (O(n²) when O(n) exists)
- Unnecessary re-renders in React
- Large bundle sizes

**Example:**
```markdown
**5. Potential N+1 query pattern**

**File:** `users.js:45-50`

You're querying posts inside a user loop:
\`\`\`js
for (const user of users) {
  user.posts = await db.query('SELECT * FROM posts WHERE user_id = $1', [user.id]);
}
\`\`\`

**Fix:** Use a single query with JOIN or WHERE IN:
\`\`\`js
const posts = await db.query('SELECT * FROM posts WHERE user_id = ANY($1)', [userIds]);
// Group by user_id
\`\`\`
```

**CUSTOMIZE THIS:** Add performance issues specific to your stack:
- **React:** useMemo/useCallback overuse, context performance, virtual scrolling
- **Go:** Goroutine leaks, channel blocking, inefficient JSON marshaling
- **Database:** Missing indexes, full table scans, inefficient JOINs
- **Mobile:** Memory leaks, battery drain, network usage

---

### Deployment & Migration Issues

**What to look for:**
- Migration number collisions (same number as existing migration)
- `CREATE INDEX CONCURRENTLY` inside transaction (will fail)
- Missing rollback migrations
- Breaking schema changes without data migration
- Environment-specific config hardcoded

**Bad patterns:**
```sql
-- ❌ Migration 0058 already exists on main
-- migrations/0058-plugin-usage-index.sql

-- ❌ CONCURRENTLY requires no transaction, but SQL migrations auto-wrap
-- no-transaction
CREATE INDEX CONCURRENTLY idx_plugin_usage ON plugins(usage_count);
```

**Good patterns:**
```sql
-- ✅ Renumbered to avoid collision
-- migrations/0059-plugin-usage-index.sql

-- ✅ Convert to JavaScript migration for noTransaction support
exports.up = (pgm) => {
  pgm.noTransaction();
  pgm.createIndex('plugins', 'usage_count', {
    name: 'idx_plugin_usage',
    method: 'CONCURRENTLY'
  });
};
```

**Review language:**
```markdown
**Blocking: Migration will fail on deploy (2 issues)**

1. **Migration number collision**: PR creates `0058-plugin-usage-index.sql`, but `0058-add-cost-to-activity-streaks.sql` already exists on `main`. Must renumber to `0059`.

2. **`CREATE INDEX CONCURRENTLY` cannot run inside transaction**: The `-- no-transaction` comment is NOT recognized by `node-pg-migrate` for `.sql` files. Since SQL migrations are auto-wrapped in `BEGIN/COMMIT`, this will fail at runtime with: `ERROR: CREATE INDEX CONCURRENTLY cannot run inside a transaction block`.

Either convert to `.js` migration using `pgm.noTransaction()`, or drop `CONCURRENTLY`.

Since the backend auto-applies migrations on restart, a failed migration would prevent the backend from starting.
```

---

### Architectural Issues

**What to look for:**
- Circular dependencies (module A imports B, B imports A)
- Tight coupling (changes cascade across many files)
- Violation of separation of concerns
- Business logic in wrong layer (UI, database triggers)
- Import depth issues (deep nested imports)

**Circular dependency example:**
```markdown
**Blocking: Circular import**

**Files:** `achievement-service.js` ↔ `gamification-routes.js`

`achievement-service.js` imports `invalidateFeaturedBadgesCache` from `gamification-routes.js`, while `gamification-routes.js` already imports from `achievement-service.js`.

In Node.js ESM, this can cause `invalidateFeaturedBadgesCache` to be `undefined` at call time.

**Fix:** Extract the cache into a separate module (`featured-badges-cache.js`) that both can import, or use an event emitter pattern.
```

**Runtime environment issues:**
```markdown
**Blocking: E2E tests directly import backend modules**

Every test does:
\`\`\`js
const extractorModule = await import('../../../backend/src/modules/core/admin/tasks/chat-analytics-extractor.js');
await extractorModule.extractChatUsageEvents({}, {});
\`\`\`

This imports backend source into the Vitest test runner. The extractor calls `getSystemDB()` internally, which requires the backend's DB pool to be initialized. No other E2E test in this project imports backend source modules—they all operate through HTTP API calls via the test harness.

Either:
1. Trigger extraction through an API/test-harness endpoint (matching existing E2E patterns), or
2. Confirm the tests pass and explain how DB pool init works in this context
```

**Rate limiting & unbounded operations:**
```markdown
**Should fix: Unbounded parallelism**

**File:** `email-service.js:89`

\`Promise.allSettled(toSend.map(...))\` fires all emails with no concurrency limit. SES has rate limits (1-14 emails/sec depending on account).

Consider chunking (e.g., batches of 10) or using a rate-limiting library like `p-limit`.
```

---

### Missing Tests

**What to look for:**
- New features without tests
- Edge cases not covered
- Integration tests missing
- Critical paths untested

**Example:**
```markdown
**7. No tests for interaction behavior**

You're adding user interaction logic with \`stopPropagation\`. This is notoriously brittle and should be tested.

Add at least:
\`\`\`js
test('clicking user name opens profile modal', () => {
  const onUserClick = jest.fn();
  render(<ActivityItem item={mockItem} onUserClick={onUserClick} />);
  fireEvent.click(screen.getByText('John Doe'));
  expect(onUserClick).toHaveBeenCalledWith('user-123');
});
\`\`\`
```

---

## Low Priority (Priority #4)

Style, documentation, and future improvements.

### Style Inconsistencies

**What to look for:**
- Formatting differences (spaces vs tabs, but not enforced by linter)
- Naming inconsistencies (camelCase vs snake_case in same file)
- Comment style differences

**Example:**
```markdown
**8. Inconsistent state variable naming**

You use \`selectedUserId\` in two components but \`selectedProfileUserId\` in ProjectDetail. Pick one and use it consistently.
```

---

### File Organization

**What to look for:**
- Large files (>500 lines)
- Mixed concerns in single file
- Unclear module boundaries

**Example from real review:**
```markdown
**4. Test file size warning**

\`gamification.test.js\` is now 2,405 lines. Consider splitting in a future PR:
- \`gamification-achievements.test.js\`
- \`gamification-plugins.test.js\`

Not blocking this PR, but create a ticket to track it.
```

---

### Documentation Gaps

**What to look for:**
- Complex logic without comments
- Missing function documentation
- No README for new modules
- Undocumented breaking changes

---

## Framework-Specific Patterns

### React

**Common issues:**
- Missing dependency arrays in useEffect
- Stale closures
- Prop drilling (should use context)
- Key prop issues in lists
- Direct state mutation

### Node.js/Express

**Common issues:**
- Missing error handling middleware
- Synchronous operations blocking event loop
- Memory leaks (event listeners not cleaned up)
- Middleware order problems

### Database (PostgreSQL)

**Common issues:**
- Missing RLS policies
- Inefficient queries (SELECT *)
- Transaction handling errors
- Connection pool exhaustion

**CUSTOMIZE THIS:** Add patterns specific to your stack:
- **Vue.js:** Reactivity gotchas, computed vs methods, lifecycle hooks
- **Angular:** Change detection issues, RxJS memory leaks, zone.js problems
- **Django:** ORM N+1, middleware order, migration conflicts
- **Rails:** N+1 queries, callback hell, ActiveRecord pitfalls

---

## Review Workflow

### 1. First Pass: Security Scan

Quickly scan for:
- SQL injection patterns
- XSS vulnerabilities
- Auth/authz issues
- Secrets exposure

**Time:** 2-5 minutes

---

### 2. Second Pass: Blocker Identification

Look for:
- Runtime errors
- Broken functionality
- Accessibility violations
- Critical performance issues

**Time:** 5-10 minutes

---

### 3. Third Pass: Quality Review

Check:
- Pattern violations
- Code duplication
- Missing tests
- Documentation gaps

**Time:** 10-20 minutes

---

### 4. Fourth Pass: Nitpicks

Note:
- Style inconsistencies
- Future improvements
- File organization

**Time:** 5 minutes

---

## Checklist Template

Use this for every review:

```markdown
## Security
- [ ] SQL injection risks
- [ ] XSS vulnerabilities
- [ ] Auth/authz bypasses
- [ ] Secrets exposure
- [ ] CSRF protection

## Functionality
- [ ] Runtime errors (undefined, null reference)
- [ ] Breaking changes (API, database)
- [ ] Edge cases handled
- [ ] Error handling present

## Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] ARIA labels present
- [ ] No nested interactive elements
- [ ] Color contrast sufficient

## Code Quality
- [ ] Follows team patterns
- [ ] No code duplication
- [ ] Tests present and sufficient
- [ ] Performance acceptable
- [ ] Documentation clear

## Style
- [ ] Naming consistent
- [ ] Formatting clean
- [ ] File organization logical
```

---

## Related Documentation

- **[Review Structure](REVIEW_STRUCTURE.md)** - How to organize findings by severity
- **[Communication Style](COMMUNICATION_STYLE.md)** - How to phrase technical feedback
- **[Examples](EXAMPLES.md)** - Full reviews showing these patterns in action
- **[Main Hub](../SKILL.md)** - Return to navigation hub
