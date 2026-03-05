# Commit Message Templates

**When to use this guide:** You need a template for a specific type of commit (feature, fix, refactor, etc.) or want to understand when to use each type.

## Overview

This guide provides ready-to-use templates for different types of commits. Each template includes:
- When to use it
- Required fields
- Example filled out
- Common variations

## Template Structure

All contextual commits follow this base structure:

```
[Type]: Brief summary (under 50 chars)

Problem: What issue are you solving?
Approach: How did you solve it?
Status: [Complete|WIP|Blocked]
Next: What's the next step?
Note: Any gotchas or insights

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## Commit Types Reference

| Type | When to Use | Example |
|------|-------------|---------|
| `Fix:` | Bug fixes | "Fix: Login fails with empty password" |
| `Feature:` | New functionality | "Feature: Add password reset flow" |
| `Refactor:` | Code restructuring | "Refactor: Extract auth logic to service" |
| `Docs:` | Documentation | "Docs: Add API authentication guide" |
| `Test:` | Test changes | "Test: Add coverage for edge cases" |
| `Perf:` | Performance | "Perf: Cache dashboard queries" |
| `WIP:` | Work in progress | "WIP: Implement user profile page" |
| `Blocked:` | Work is blocked | "Blocked: Add EU payment processing" |
| `Hotfix:` | Emergency fix | "Hotfix: Payment processing down" |
| `Chore:` | Maintenance | "Chore: Update dependencies" |
| `Security:` | Security | "Security: Fix SQL injection in search" |
| `Build:` | Build system | "Build: Add webpack caching" |
| `CI:` | CI/CD changes | "CI: Add automated deployment" |

---

## 1. Bug Fix Template

### When to Use
- Fixing broken functionality
- Resolving errors or exceptions
- Correcting unexpected behavior

### Template

```
Fix: [Brief description of bug]

Problem: [What was broken? What was the impact?]
Approach: [How did you fix it? What code changed?]
Status: [Complete - Fix verified|WIP - Partial fix|Blocked - Can't complete]
Next: [Add tests|Monitor for recurrence|Fix related issues]
Note: [How you found it|Why it happened|What you tried that didn't work]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example

```
Fix: Shopping cart total incorrect with multiple promos

Problem: Users reported wrong totals when stacking 3+ promotional codes
Approach: Fixed discount calculation order in PromoEngine.applyDiscounts() - sort by priority before applying
Status: Complete - Fix deployed, monitoring error rates
Next: Add comprehensive tests for all promo combinations (currently only testing 2 promos)
Note: Bug existed since v2.1.0 launch, discovered via support tickets not automated tests

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Variations

**Critical Production Bug:**
```
Fix: [URGENT] Payment processing returning 500 errors

Problem: All payments failing since 3pm, blocking $50K/hour in revenue
Approach: Database connection pool exhausted, increased max connections from 20 to 100
Status: Complete - Payments restored, system stable
Next: Add connection pool monitoring and alerting
Note: Triggered by traffic spike from marketing campaign (not communicated to engineering)
Urgency: P0 - Revenue impacting
Downtime: 45 minutes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Bug Fix with Known Limitation:**
```
Fix: File upload fails for files over 5MB

Problem: Users unable to upload large documents, getting timeout errors
Approach: Increased nginx upload limit to 50MB and added chunked upload support
Status: Complete - Working for up to 50MB files
Next: Implement proper progress bar for large uploads
Note: 50MB is a temporary limit, will need S3 direct upload for larger files
Limitation: Files over 50MB still not supported

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 2. New Feature Template

### When to Use
- Adding new functionality
- Implementing user-requested features
- Creating new components or services

### Template

```
Feature: [Brief description of feature]

Problem: [What user need does this address? What was missing?]
Approach: [How did you implement it? What technologies/patterns used?]
Status: [Complete - Feature ready|WIP - Partial implementation|Blocked - Dependencies needed]
Next: [Add tests|Get user feedback|Implement phase 2]
Note: [Technical decisions|Trade-offs made|Future considerations]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example

```
Feature: Add real-time order status notifications

Problem: Customers had to refresh page to see order updates, support received many "where's my order?" inquiries
Approach: Implemented WebSocket connection via Socket.io with OrderStatusService pushing updates to subscribed clients
Status: Complete - Notifications working for all order states
Next: Add browser notification permission prompt and desktop notifications
Note: Using Redis pub/sub for multi-server support, handles server restarts gracefully with auto-reconnect

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Variations

**Multi-Part Feature (Part 1 of N):**
```
Feature: User dashboard (part 1/3) - layout and navigation

Problem: Users need centralized place to manage account, orders, settings
Approach: Created Dashboard component with sidebar navigation and route structure using React Router
Status: WIP - Layout complete, individual sections need implementation
Next: Implement account settings section (part 2)
Note: Using responsive design, works on mobile/tablet/desktop

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Feature with External Dependency:**
```
Feature: Add Stripe payment processing

Problem: Need to accept credit card payments for premium subscriptions
Approach: Integrated Stripe Checkout with webhook handling for payment events
Status: Complete - Payments working in test mode
Next: Complete Stripe verification process and enable live mode
Note: Webhook signing verification required, added STRIPE_WEBHOOK_SECRET to env vars

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 3. Refactoring Template

### When to Use
- Restructuring code without changing behavior
- Improving code quality or maintainability
- Extracting reusable components

### Template

```
Refactor: [What you refactored]

Problem: [Why was refactoring needed? What was wrong with old approach?]
Approach: [How did you restructure it? What pattern did you apply?]
Status: [Complete - Tests passing, behavior unchanged|WIP - Partial refactor|Blocked - Tests need updating]
Next: [Refactor related areas|Update documentation|Apply pattern elsewhere]
Note: [What you preserved|Breaking changes (if any)|Performance impact]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example

```
Refactor: Extract authentication logic into AuthService

Problem: Auth logic scattered across 5 controllers (800+ lines), hard to test and maintain
Approach: Created AuthService class with login(), logout(), refresh(), validate() methods, injected into controllers
Status: Complete - All tests passing, behavior unchanged
Next: Apply same service pattern to PaymentController and NotificationController
Note: Maintained backward compatibility, no API contract changes, all existing tests still pass

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Variations

**Performance Refactor:**
```
Refactor: Optimize dashboard data fetching with GraphQL

Problem: Dashboard made 15 separate API calls on load, taking 8+ seconds
Approach: Replaced multiple REST calls with single GraphQL query using DataLoader for batching
Status: Complete - Load time reduced from 8s to 1.2s
Next: Apply GraphQL pattern to other data-heavy pages
Note: Required adding graphql-yoga and writing new schema, backward compatible with REST API

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Type Safety Refactor:**
```
Refactor: Add TypeScript types to API layer

Problem: API responses untyped, causing runtime errors from unexpected data shapes
Approach: Generated TypeScript interfaces from OpenAPI spec, added to all API client methods
Status: Complete - All API calls now type-safe
Next: Add runtime validation with Zod to catch API contract changes
Note: Found 12 bugs during type addition where code assumed wrong data shape

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 4. Work in Progress Template

### When to Use
- End of day with unfinished work
- Need to switch tasks mid-work
- Checkpoint during large implementation

### Template

```
WIP: [What you're working on]

Problem: [What are you trying to achieve?]
Approach: [What have you done so far? What's the plan?]
Status: WIP - [Percentage complete or what's done vs. remaining]
Next: [Specific next steps to continue]
Note: [Current blockers|Known issues|Things to be careful about]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example

```
WIP: Implement email notification system

Problem: Users need email alerts for important account events
Approach: Set up SendGrid integration, created EmailService with template rendering, implemented for password resets
Status: WIP - Email sending working, need to add more event types and unsubscribe flow
Next: Add notification preferences page and implement order confirmation emails
Note: SendGrid API key in env vars, templates in /emails directory using MJML for rendering

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Variations

**WIP with Known Issues:**
```
WIP: Add CSV export functionality to reports

Problem: Users need to export large datasets for offline analysis
Approach: Implemented streaming CSV generator to handle large datasets without memory issues
Status: WIP - Export working but formatting needs improvement (dates not formatted, numbers have too many decimals)
Next: Add proper number and date formatting, add column headers
Note: Using fast-csv library, streams directly to response to avoid loading all data in memory
Known Issues: Export button disabled if dataset > 100K rows (need to implement background job for large exports)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 5. Blocked Work Template

### When to Use
- Work stopped waiting for external dependency
- Need approval or decision from others
- Technical blocker you can't resolve

### Template

```
Blocked: [What you're trying to do]

Problem: [What needs to happen?]
Approach: [What have you done so far? What's the plan once unblocked?]
Status: Blocked - [What specifically is blocking? Who/what is needed?]
Next: [What happens once unblocked?]
Note: [Workarounds considered|Estimated time to unblock|Impact of delay]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example

```
Blocked: Add payment processing for European customers

Problem: Need to support EUR, GBP currencies for EU market expansion
Approach: Implemented multi-currency logic in PaymentService, added currency converter with ECB exchange rates
Status: Blocked - Waiting for legal team to complete GDPR compliance review (ETA: 2 weeks)
Next: Enable EU payment processing in production once legal approval received
Note: All code ready and tested in staging, just needs production config flip after approval
Blocker: Legal approval (Jane Smith owns, jane@company.com)
Impact: Delayed EU launch by 2 weeks, affecting Q1 revenue targets

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Variations

**Technical Blocker:**
```
Blocked: Implement real-time sync with external API

Problem: Need to sync order data in real-time with warehouse management system
Approach: Started building webhook receiver and event handler
Status: Blocked - Vendor API doesn't support webhooks, waiting for them to add it (ETA: Q2)
Next: Switch to polling approach as workaround, revisit webhooks in Q2
Note: Polling every 5min is acceptable for MVP, webhook support needed for scale
Blocker: Vendor API limitation (ticket #12345 with vendor)
Workaround: Implemented polling approach in separate branch

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 6. Documentation Template

### When to Use
- Adding or updating documentation
- Writing guides or READMEs
- Documenting APIs or processes

### Template

```
Docs: [What you documented]

Problem: [What was unclear or undocumented?]
Approach: [What did you document? Where is it?]
Status: [Complete - Docs published|WIP - Partial documentation|Blocked - Need SME review]
Next: [Add examples|Get feedback|Document related topics]
Note: [Who's the audience|Where to find it|Related docs]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example

```
Docs: Add API authentication guide for partners

Problem: Partners struggling to integrate with our API, support fielding repetitive questions about auth
Approach: Created comprehensive auth guide with examples for OAuth2 flow, token refresh, error handling
Status: Complete - Published to developer portal
Next: Add video walkthrough based on partner feedback
Note: Includes code samples in 3 languages (JS, Python, Ruby), covers all common error scenarios
Location: docs/api-authentication.md and developer.company.com/auth

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 7. Test Template

### When to Use
- Adding test coverage
- Fixing failing tests
- Improving test quality

### Template

```
Test: [What you tested]

Problem: [What was untested? Why add tests now?]
Approach: [What tests did you add? What do they cover?]
Status: [Complete - Coverage improved|WIP - Partial coverage|Blocked - Need test data]
Next: [Test more edge cases|Add integration tests|Set up CI]
Note: [Coverage metrics|Testing approach|Known gaps]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example

```
Test: Add comprehensive auth service tests

Problem: AuthService had 0% test coverage, production bug slipped through
Approach: Added unit tests with Vitest covering login, logout, token refresh, error cases
Status: Complete - Coverage increased from 0% to 95%
Next: Add integration tests for full auth flow with real database
Note: Using mock JWT library for token validation tests, test database for user queries
Coverage: 95% (missing edge case for expired refresh tokens - added to backlog)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 8. Hotfix Template

### When to Use
- Emergency production fixes
- Critical bugs affecting users
- Security vulnerabilities

### Template

```
Hotfix: [Brief urgent issue description]

Problem: [What's broken in production? What's the impact?]
Approach: [What's the quick fix? Is this temporary or permanent?]
Status: [Complete - Issue resolved|WIP - Mitigation deployed|Blocked - Need approval]
Next: [Monitor metrics|Implement proper fix|Post-mortem]
Note: [Root cause|Why it happened|How to prevent|Proper fix plan]
Urgency: [P0/P1/P2] - [Impact description]
Downtime: [Duration if applicable]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example

```
Hotfix: Database connection pool exhausted causing 500 errors

Problem: All API requests failing with 500 errors since 2pm, affecting all users
Approach: Emergency increase of database max_connections from 100 to 500, restarted app servers
Status: Complete - API restored, monitoring connection usage
Next: Implement proper connection pooling with retry logic and alerting
Note: Caused by traffic spike from email campaign (3x normal traffic), connection leaks in old code
Urgency: P0 - All users affected
Downtime: 23 minutes
Root Cause: Connection leaks in PaymentService (not closing connections on error)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 9. Performance Template

### When to Use
- Optimizing slow code
- Reducing resource usage
- Improving scalability

### Template

```
Perf: [What you optimized]

Problem: [What was slow? What were the metrics?]
Approach: [How did you optimize it? What changed?]
Status: [Complete - Verified faster|WIP - Partial optimization|Blocked - Need profiling]
Next: [Monitor metrics|Optimize related areas|Load test]
Note: [Before/after metrics|Trade-offs|Why this approach]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example

```
Perf: Cache product catalog queries with Redis

Problem: Product catalog page taking 5-8 seconds to load, high database CPU usage
Approach: Implemented Redis caching for catalog queries with 10min TTL, cache invalidation on product updates
Status: Complete - Load time reduced from 6s to 800ms
Next: Monitor cache hit rate, adjust TTL if needed, apply to other data-heavy pages
Note: Before: 6s avg, After: 800ms avg (88% improvement), cache hit rate: 94%
Trade-off: 10min staleness acceptable for product catalog

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 10. Security Template

### When to Use
- Fixing security vulnerabilities
- Implementing security features
- Addressing audit findings

### Template

```
Security: [What security issue you addressed]

Problem: [What's the vulnerability or security gap?]
Approach: [How did you fix it? What security measures added?]
Status: [Complete - Vulnerability patched|WIP - Partial mitigation|Blocked - Need security review]
Next: [Audit other areas|Add monitoring|Document security practices]
Note: [Severity|How discovered|Impact|Related vulnerabilities]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example

```
Security: Fix SQL injection in search endpoint

Problem: User search vulnerable to SQL injection via unsanitized query parameter
Approach: Replaced string concatenation with parameterized queries using prepared statements
Status: Complete - Vulnerability patched, security team verified
Next: Audit all other database queries for similar issues
Note: Severity: High (CVSS 8.2), discovered in security audit, no evidence of exploitation
Impact: Could have leaked user PII data

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## Choosing the Right Template

**Decision Tree:**

```
Is it fixing broken functionality?
├─ Yes → Use "Fix" template
└─ No → Is it adding new functionality?
    ├─ Yes → Use "Feature" template
    └─ No → Is it restructuring code?
        ├─ Yes → Use "Refactor" template
        └─ No → Is work incomplete?
            ├─ Yes → Use "WIP" template
            └─ No → Is work blocked?
                ├─ Yes → Use "Blocked" template
                └─ No → Is it security-related?
                    ├─ Yes → Use "Security" template
                    └─ No → Check other templates (Docs, Test, Perf, etc.)
```

## Related Documentation

- **[Usage Guide](USAGE.md)** - How to use these templates effectively
- **[Examples](EXAMPLES.md)** - More real-world examples
- **[Getting Started](GETTING_STARTED.md)** - First-time setup
- **[Workflows](WORKFLOWS.md)** - Integrate templates into workflows
