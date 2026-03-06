# Real-World Examples

**When to use this guide:** You want to see complete examples of contextual commits from real-world scenarios to understand what good looks like.

## Overview

This guide provides real-world examples of contextual commits across different types of work, teams, and situations. Each example includes context about why it's effective.

## Example 1: Critical Production Bug

### Scenario
Payment processing suddenly stopped working on Black Friday, affecting thousands of customers.

### Commit Message

```
Hotfix: [URGENT] Stripe payment processing returning 500 errors

Problem: All Stripe payments failing since 11:43am PT with "Invalid API Key" error, blocking ~$12K/minute in sales
Approach: Rotated Stripe API key in production environment variables (old key revoked by Stripe), restarted all 6 app servers
Status: Complete - Payments restored at 12:08pm PT, monitoring error rates
Next: Post-mortem meeting today at 3pm, implement API key rotation monitoring, add alerting for payment failures
Note: Stripe auto-revoked key after detecting it in public GitHub repo (accidentally committed in .env.example 3 months ago by contractor)
Urgency: P0 - Revenue critical
Downtime: 25 minutes
Revenue Impact: Estimated $300K in lost sales
Root Cause: API key leaked in public repository

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Why This Is Effective

- **Clear urgency**: [URGENT] tag and P0 priority immediately signal importance
- **Business impact**: Quantifies revenue impact ($12K/min, $300K total)
- **Timeline**: Specific timestamps for when issue started and was resolved
- **Root cause**: Explains how the issue happened
- **Prevention**: Notes need for monitoring and alerting
- **Accountability**: Documents what happened for post-mortem

---

## Example 2: Cross-Timezone Handoff

### Scenario
Engineer in PST timezone working on feature, needs CEST timezone teammate to continue next morning.

### Commit Message

```
WIP: Implement OAuth2 integration with external CRM (70% complete)

Problem: Sales team needs two-way sync between our app and Salesforce CRM
Approach: Implemented OAuth2 authorization flow, token storage/refresh, basic contact sync endpoint
Status: WIP - Auth flow complete and tested, sync logic partially done
Next: Finish bidirectional sync (currently only one-way from CRM to our app), add conflict resolution
Note: OAuth tokens stored encrypted in database using AES-256, refresh happens automatically 5 min before expiry
Handoff: Hey Anna! I got the auth working and contacts sync from Salesforce → our app. The code in src/integrations/salesforce/ has the main logic. Still need:
  1. Reverse sync (our app → Salesforce) - use SalesforceService.updateContact()
  2. Conflict resolution when both systems have updates - discussed approach in PR #456
  3. Testing with production Salesforce sandbox (creds in 1Password)
Gotchas:
  - Salesforce API rate limits at 100 req/min, added exponential backoff
  - Some contact fields don't map 1:1, see FIELD_MAPPING in constants.ts
  - Sandbox resets every Saturday night, need to re-auth if testing on Monday

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Why This Is Effective

- **Percentage complete**: Clear progress indicator (70%)
- **Detailed next steps**: Specific numbered list of what remains
- **Personal handoff note**: Addresses teammate by name, conversational
- **Links to context**: References PR for approach discussion
- **Gotchas section**: Critical information about rate limits and sandbox behavior
- **Credentials note**: Points to where to find access credentials
- **Testing tips**: Monday re-auth requirement saves debugging time

---

## Example 3: Refactoring with Metrics

### Scenario
Large controller file is becoming unmaintainable, need to refactor before adding more features.

### Commit Message

```
Refactor: Extract order processing logic into OrderService

Problem: OrderController was 1,247 lines with 23 methods, test coverage at 32%, adding features causing regressions
Approach: Created OrderService class with single responsibility, moved business logic out of controller, added comprehensive tests
Status: Complete - All 127 tests passing, behavior unchanged, coverage now 89%
Next: Apply same service pattern to PaymentController (982 lines) and ShippingController (743 lines)
Note: Maintained backward compatibility - no API contract changes, no database migrations needed
Metrics:
  - OrderController: 1,247 → 186 lines (85% reduction)
  - OrderService: New 478-line service with clear method responsibilities
  - Test coverage: 32% → 89% (57 percentage point improvement)
  - Complexity: Cyclomatic complexity reduced from 67 → 12
  - Performance: No regression, response times unchanged

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Why This Is Effective

- **Quantifies the problem**: Specific line counts and test coverage
- **Shows improvement**: Before/after metrics make impact clear
- **Documents non-breaking change**: Explicitly states backward compatibility
- **Provides roadmap**: Names other controllers that need same treatment
- **Multiple metrics**: Lines, coverage, complexity, performance
- **Verifiable**: Anyone can check these metrics

---

## Example 4: Feature with User Research

### Scenario
Adding feature based on user feedback and analytics data.

### Commit Message

```
Feature: Add "Save for Later" functionality to shopping cart

Problem: 37% of users abandon carts and never return (analytics), exit surveys show "want to compare prices" and "need spouse approval" as top reasons
Approach: Implemented SavedCart model with user association, "Save for Later" button in cart, email reminder system (24hr, 7day, 30day)
Status: Complete - Feature deployed to 10% of users (A/B test), collecting metrics
Next: Monitor conversion rates for 2 weeks, expand to 100% if successful (target: reduce abandonment by 10%)
Note: Saved carts expire after 90 days per legal requirements (PII retention policy)
User Research:
  - 312 users surveyed about cart abandonment
  - "Price comparison" (42%) and "Need approval" (31%) top responses
  - 23% said they'd use "save for later" feature if available
Technical Details:
  - Cron job runs daily to send reminder emails
  - Email preferences respected (can unsubscribe from reminders)
  - Mobile app updated separately (PR #789)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Why This Is Effective

- **Data-driven**: Cites specific metrics and user research
- **Business context**: Explains the "why" with user survey results
- **Experiment design**: A/B test with clear success metrics
- **Legal considerations**: Notes PII retention policy compliance
- **Cross-platform**: Mentions mobile app work
- **Actionable metrics**: Target reduction in abandonment rate

---

## Example 5: Bug Fix with Debugging Story

### Scenario
Intermittent bug that took days to track down and fix.

### Commit Message

```
Fix: Profile images randomly showing as broken after upload

Problem: 15-20% of profile image uploads resulted in broken images (404), users had to upload multiple times
Approach: Fixed race condition in ImageProcessor - now waits for S3 upload confirmation before updating database record
Status: Complete - Fix deployed, monitoring upload success rate (was 82%, now 99.7%)
Next: Add retry logic for the remaining 0.3% failures (network timeouts), add upload progress indicator
Note: This was a nightmare to debug, here's what I learned:
Debugging Journey:
  - Initially thought it was S3 permissions → verified permissions were correct
  - Suspected image processing library → isolated processor, worked fine
  - Added extensive logging → noticed database record created before S3 upload completed
  - Reproduced locally with network throttling → confirmed race condition
  - Root cause: Async S3 upload didn't await completion before database INSERT
Fix Details:
  - Changed uploadToS3() to await upload.done() promise
  - Added 5-second timeout with retry (S3 uploads usually ~200ms)
  - Added database transaction to rollback if S3 upload fails
Testing:
  - Tested with slow network simulation (150+ uploads, 0 failures)
  - Deployed to staging, load tested with 1000 concurrent uploads
  - Deployed to production with feature flag, gradually rolled out

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Why This Is Effective

- **Quantifies the problem**: 15-20% failure rate, impact on users
- **Debugging journey**: Documents dead-ends to help others
- **Root cause explanation**: Clear technical explanation
- **Comprehensive fix**: Not just the code change, but the full solution
- **Testing details**: Shows thorough validation approach
- **Improvement metrics**: 82% → 99.7% success rate
- **Remaining work**: Honest about the 0.3% edge case

---

## Example 6: Security Vulnerability

### Scenario
Security audit found critical vulnerability in authentication system.

### Commit Message

```
Security: Fix authentication bypass via JWT token manipulation

Problem: Attacker could modify JWT token payload (user ID, role) because signature verification was skipped on certain endpoints
Approach: Enforced JWT signature verification on all endpoints, rotated JWT signing secret, added automated security tests
Status: Complete - Vulnerability patched, security team verified, no evidence of exploitation in logs
Next: Complete security audit of all auth endpoints, implement JWT token rotation, add security monitoring
Note: Severity: Critical (CVSS 9.8)
Discovery: Found by external security researcher (responsible disclosure), reported 5 days ago
Timeline:
  - Day 1: Received report, verified vulnerability
  - Day 2: Developed fix, tested in staging
  - Day 3: Security team review
  - Day 4: Deployed to production, rotated secrets
  - Day 5: Coordinated disclosure with researcher
Affected Systems:
  - API endpoints under /api/admin/* (15 endpoints)
  - User role escalation possible
  - No authentication required for exploitation
Mitigation:
  - All JWT tokens invalidated (forced re-login for all users)
  - Rotated JWT signing secret
  - Added middleware to enforce verification
  - Audit log reviewed: No evidence of exploitation
Prevention:
  - Added automated security tests (prevents regression)
  - Updated security checklist for code reviews
  - Scheduled penetration test for next quarter
Researcher Credit: Jane Smith (jane@security-research.com) - $5000 bug bounty

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Why This Is Effective

- **Severity clearly stated**: CVSS score, impact level
- **Responsible disclosure timeline**: Shows professional handling
- **No exploitation evidence**: Reassures stakeholders
- **Comprehensive mitigation**: Not just code fix, but process improvements
- **Credits researcher**: Acknowledges responsible disclosure
- **Prevention measures**: Documents how to avoid similar issues
- **Audit log check**: Shows due diligence

---

## Example 7: Performance Optimization

### Scenario
Dashboard page is extremely slow, users complaining about timeout errors.

### Commit Message

```
Perf: Optimize dashboard with React Query and data caching

Problem: Dashboard page taking 18-25 seconds to load, users experiencing timeouts, support tickets increasing
Approach: Implemented React Query for data fetching with stale-while-revalidate strategy, added Redis caching for expensive queries, lazy-loaded non-critical components
Status: Complete - Load time reduced from 21s avg to 1.8s avg (91% improvement)
Next: Monitor cache hit rates, apply optimization patterns to Reports page (similar performance issues)
Note: Tried several approaches before landing on this solution
Optimization Journey:
  1. Initial investigation: 15 separate API calls on page load (too many round trips)
  2. First attempt: GraphQL with batching → 30% improvement (still too slow)
  3. Second attempt: Server-side rendering → 50% improvement (but high server CPU)
  4. Final solution: React Query + Redis caching → 91% improvement (best balance)
Technical Details:
  - React Query with 5-minute stale time
  - Redis cache for dashboard data (30-minute TTL)
  - Cache invalidation on data updates
  - Lazy load charts/graphs (only load when scrolled into view)
Metrics (p50):
  - Before: 21.3s page load, 15 API requests, 850ms server processing
  - After: 1.8s page load, 1 API request (cached), 45ms server processing
  - Cache hit rate: 94%
  - Server CPU utilization: -67%
User Impact:
  - Support tickets about "slow dashboard": 47/week → 3/week (94% reduction)
  - User session duration: +23% (users staying longer because faster)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Why This Is Effective

- **Dramatic improvement**: 91% reduction, clear metrics
- **Shows experimentation**: Documents what didn't work and why
- **Multiple metrics**: Load time, requests, CPU, cache hit rate
- **Business impact**: Support ticket reduction, user engagement
- **Technical depth**: Explains caching strategy and invalidation
- **Transferable knowledge**: Can apply to Reports page

---

## Example 8: Documentation for Knowledge Sharing

### Scenario
Complex API integration that took weeks to figure out, document for the team.

### Commit Message

```
Docs: Complete guide for integrating with Acme Corp external API

Problem: Integration took 3 weeks due to poor vendor docs, team needs clear guide to avoid repeating same research
Approach: Created comprehensive integration guide with code examples, gotchas, testing procedures based on lessons learned
Status: Complete - Published to internal wiki and shared with team
Next: Record video walkthrough for onboarding, create Postman collection for API testing
Note: This integration was painful, documenting everything so others don't suffer
Document Contents:
  - Authentication flow (OAuth2 with custom grant type)
  - Required API calls and sequencing (order matters!)
  - Rate limiting details (100 req/min but resets weirdly)
  - Webhook setup and signature verification
  - Error codes and retry strategies
  - Testing in sandbox vs. production differences
Key Gotchas Documented:
  1. Sandbox uses different OAuth endpoints (not documented by vendor)
  2. Webhook signatures use HMAC-SHA256 but header name is non-standard
  3. Rate limit resets at minute boundary, not rolling window
  4. Some error codes are temporary, some require support ticket
  5. Pagination cursor expires after 10 minutes
  6. Timestamps are Unix epoch but in milliseconds (not seconds)
Code Examples Included:
  - TypeScript authentication helper
  - Webhook signature verification
  - Error handling with retry logic
  - Pagination implementation
Time Savings:
  - Took me: 3 weeks of trial/error
  - Should take next person: 2-3 days with this guide
Location: docs/integrations/acme-corp-api.md

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Why This Is Effective

- **Pain point clearly stated**: 3 weeks of trial and error
- **Knowledge transfer**: Specific gotchas that took time to discover
- **Time savings quantified**: 3 weeks → 2-3 days
- **Actionable examples**: Includes code snippets
- **Next steps**: Video and Postman collection for different learning styles
- **Location documented**: Easy to find the documentation

---

## Example 9: Multi-Part Feature (Series)

### Scenario
Large feature broken into multiple commits for easier review and handoff.

### Commit 1/3

```
Feature: Customer portal (part 1/3) - authentication and layout

Problem: Customers have no self-service way to view orders, track shipments, manage subscriptions (generating 200+ support tickets/week)
Approach: Created CustomerPortal React app with auth integration (using existing AuthService), responsive layout with navigation
Status: WIP - Auth and layout complete, individual features in parts 2-3
Next: Part 2 will add order history and tracking
Note: Using same design system as main app for consistency
Technical Stack:
  - React 18 with TypeScript
  - React Router for navigation
  - TailwindCSS for styling
  - Existing AuthService for SSO
Implemented:
  - Login/logout flow
  - Session management
  - Responsive layout (mobile, tablet, desktop)
  - Navigation shell with route structure
  - Loading states and error boundaries
Remaining:
  - Order history (part 2)
  - Subscription management (part 3)
  - Profile settings (part 3)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Commit 2/3

```
Feature: Customer portal (part 2/3) - order history and tracking

Problem: (Continued from part 1) Customers need to view order history and track shipments
Approach: Implemented OrderHistory component fetching from /api/customer/orders, integrated with ShipStation for real-time tracking
Status: WIP - Order history complete, subscription management next (part 3)
Next: Part 3 will add subscription management and profile settings
Note: Depends on part 1 (PR #891) - deploy together
Implemented:
  - Order history table with search and filtering
  - Order detail view with line items
  - Real-time shipment tracking via ShipStation API
  - Download invoice as PDF
  - Reorder functionality
Testing:
  - Tested with 50,000 order history (pagination working)
  - Tested with all shipment statuses
  - Mobile layout verified
API Endpoints Used:
  - GET /api/customer/orders (paginated)
  - GET /api/customer/orders/:id (detail)
  - GET /api/customer/orders/:id/invoice.pdf
  - GET /api/shipstation/tracking/:trackingNumber

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Commit 3/3

```
Feature: Customer portal (part 3/3) - subscriptions and profile

Problem: (Continued from parts 1-2) Customers need to manage subscriptions and update profile
Approach: Implemented SubscriptionManager and ProfileSettings components with Stripe integration for payment method updates
Status: Complete - Customer portal fully functional, ready for beta testing
Next: Beta test with 50 customers, collect feedback, iterate before public launch
Note: Complete 3-part series, deploy all together
Implemented:
  - Active subscription view with next billing date
  - Pause/resume subscription
  - Cancel subscription (with retention flow)
  - Update payment method (Stripe integration)
  - Profile settings (email, phone, password)
  - Email notification preferences
Final Testing:
  - End-to-end testing completed
  - Security review passed
  - Load testing: Portal handles 10,000 concurrent users
  - Mobile testing: iOS and Android verified
Launch Plan:
  - Week 1: Beta with 50 customers
  - Week 2: Iterate based on feedback
  - Week 3: Public launch with announcement
Expected Impact:
  - Reduce support tickets by 60% (projection based on competitor data)
  - Increase customer satisfaction (self-service requested feature)
  - Reduce subscription churn (easier to manage = less frustration)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Why This Series Is Effective

- **Logical breakdown**: Each part is independently reviewable
- **Clear dependencies**: Part 2 depends on part 1, noted explicitly
- **Progress tracking**: Easy to see overall progress (1/3, 2/3, 3/3)
- **Consistent structure**: Same format makes series easy to follow
- **Deployment guidance**: Notes to deploy together
- **Business impact**: Final commit includes projected ROI

---

## Common Patterns in Great Commits

### Pattern 1: Quantify Everything

Good commits include numbers:
- Metrics (load time, error rate, coverage)
- Impact (revenue, users affected, support tickets)
- Scale (number of files, lines of code, test cases)

### Pattern 2: Tell the Story

Great commits have narrative:
- What you tried first (debugging journey)
- Why it didn't work (learning)
- What finally worked (solution)

### Pattern 3: Think About Your Audience

Write for:
- Future you (6 months from now, forgot context)
- New team members (need full context)
- On-call engineers (need quick understanding)
- Auditors (need compliance trail)

### Pattern 4: Document Gotchas

Always include:
- Non-obvious behavior
- Environment differences (staging vs. production)
- Vendor quirks
- Things that wasted your time

### Pattern 5: Be Honest About State

Clear status helps:
- "Complete" - Fully done, tested, ready
- "WIP" - Partial, here's what remains
- "Blocked" - Stopped, here's why
- "90% complete" - Almost there, small stuff left

## Related Documentation

- **[Usage Guide](USAGE.md)** - How to create commits like these
- **[Templates](TEMPLATES.md)** - Templates for different types
- **[Workflows](WORKFLOWS.md)** - Integrate into daily workflow
- **[Getting Started](GETTING_STARTED.md)** - First-time setup
