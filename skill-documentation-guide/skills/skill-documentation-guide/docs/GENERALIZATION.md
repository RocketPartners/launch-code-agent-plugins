# Content Generalization Techniques

How to transform project-specific documentation into reusable templates that work for any use case while maintaining clarity and usefulness.

---

## Why Generalize?

### Problem with Project-Specific Content

```javascript
// Before: Too specific
const leaveRequests = await slackClient.fetchDMsWithText(
  'U123ABC',  // John Doe
  'leave request',
  date
);

const approval = await analyzeLeaveRequest(leaveRequests[0].text);
await database.create({
  employee_name: 'John Doe',
  leave_type: 'vacation',
  days_requested: 3,
  status: approval.approved ? 'approved' : 'pending'
});
```

**Issues**:
- Hard-coded employee names/IDs
- Specific field names (leave_type, days_requested)
- Single use case (leave requests)
- Can't be adapted to other workflows

### After Generalization

```javascript
// After: Reusable template
// CUSTOMIZE THIS: Replace with your data source
const items = await slackClient.fetchDMsWithText(
  USER_ID,  // Replace with your user ID
  'search term',  // Replace with your search text
  date
);

// CUSTOMIZE THIS: Process your data
const processedData = await processItem(items[0].text);

// CUSTOMIZE THIS: Replace with your data fields
await database.create({
  name: processedData.name,
  type: processedData.type,
  status: processedData.status,
  assigned_to: processedData.assignedTo
});
```

**Benefits**:
- Generic field names (name, type, status)
- Clear customization points
- Applicable to any workflow
- Maintains technical clarity

---

## The Generalization Process

### Step 1: Identify Project-Specific Elements

**What to look for**:
- Employee names, user IDs, email addresses
- Specific field names tied to one use case
- Hard-coded values
- Business-specific terminology
- Project-specific file names

**Example audit**:
```markdown
❌ "Fetch daily minutes from team members"
❌ "Leave request approval workflow"
❌ "REQ-2026-001 format for request IDs"
❌ User "John Doe" (U123ABC)
❌ Field: leave_type, days_requested
❌ File: fetch-minutes.js, generate-summary.js
```

### Step 2: Map to Generic Equivalents

Create a mapping table:

| Project-Specific | Generic | Example Values |
|-----------------|---------|----------------|
| Leave request | Record, Item | Project, Task, Order |
| Employee name | User name | user_123, john.doe |
| Minutes/Summary | Data, Content | Report, Document |
| REQ-2026-001 | ITEM-xxx | PROJ-001, ORDER-123 |
| leave_type | type, category | project_type, order_type |
| days_requested | amount, quantity | hours, count |
| fetch-minutes.js | example-fetch.js | fetch-data.js |
| generate-summary.js | example-process.js | process-data.js |

### Step 3: Replace Throughout Codebase

**Strategy**: Start with most specific terms first to avoid partial replacements.

```bash
# Wrong order - causes issues
sed -i 's/request/item/g' file.js  # Changes "leave_request" to "leave_item"
sed -i 's/leave_request/record/g' file.js  # Now can't find "leave_request"

# Correct order - most specific first
sed -i 's/leave_request/record/g' file.js
sed -i 's/request/item/g' file.js
```

### Step 4: Add Customization Comments

Mark every generic section that users should customize:

```javascript
// CUSTOMIZE THIS: Replace with your data source
// Examples:
// - API call: await fetch('https://api.example.com/data')
// - Database query: await db.query('SELECT * FROM ...')
// - File read: JSON.parse(fs.readFileSync('data.json'))
const data = await fetchFromSource();
```

**Comment template**:
```javascript
// CUSTOMIZE THIS: [What to customize]
// [2-3 examples of alternatives]
[generic code]
```

### Step 5: Provide Example Values

Replace hard-coded values with examples that suggest patterns:

```javascript
// Before
const USER_ID = 'U096K3RJR1N';  // Kerr Cruz

// After
const USER_ID = process.env.USER_ID || 'U123ABC456';  // Example Slack user ID
```

---

## Generalization Patterns

### Pattern 1: Field Names

**Before** (Leave request specific):
```javascript
{
  employee_name: 'John Doe',
  leave_type: 'vacation',
  days_requested: 3,
  start_date: '2026-01-21',
  approval_status: 'pending',
  manager_notes: 'Approved for team coverage'
}
```

**After** (Generic record):
```javascript
{
  name: 'Project Alpha',           // CUSTOMIZE: Your item name
  type: 'development',              // CUSTOMIZE: Your category/type
  quantity: 3,                      // CUSTOMIZE: Your amount/count
  start_date: '2026-01-21',        // Date fields often stay the same
  status: 'active',                 // CUSTOMIZE: Your status values
  notes: 'Assigned to team A'      // CUSTOMIZE: Your notes/description
}
```

**Guidelines**:
- `name` instead of specific identifiers
- `type`/`category` instead of domain-specific types
- `quantity`/`amount` instead of domain-specific counts
- `status` instead of domain-specific states
- `notes`/`description` for free text

### Pattern 2: ID Formats

**Before** (Specific format):
```javascript
const requestId = `REQ-${year}-${sequence}`;  // REQ-2026-001
```

**After** (Generic format):
```javascript
const itemId = `ITEM-${year}-${sequence}`;  // ITEM-2026-001
// CUSTOMIZE THIS: Replace ITEM with your prefix
// Examples: PROJ, ORDER, TASK, USER, etc.
```

**Options to show**:
```javascript
// Common ID patterns:
// - ITEM-xxx (generic)
// - PROJ-xxx (projects)
// - ORDER-xxx (orders)
// - TASK-xxx (tasks)
// - USER-xxx (users)
// - {CUSTOM}-xxx (your domain)
```

### Pattern 3: Workflow Names

**Before** (Specific workflows):
```markdown
# Leave Request Approval Workflow

1. Employee submits leave request via Slack DM
2. Bot extracts leave details (dates, type, reason)
3. AI analyzes request and recommends approval
4. Manager reviews and approves/denies
5. Employee notified via Slack
```

**After** (Generic workflow):
```markdown
# Data Processing Workflow

1. User submits data via Slack DM (or other source)
2. System extracts relevant information
3. AI analyzes data and makes recommendations (optional)
4. Human reviews and takes action
5. User notified of result

CUSTOMIZE THIS workflow for your use case:
- Replace "data" with your domain (orders, tasks, reports)
- Modify steps to match your process
- Remove AI analysis if not needed
- Change notification method (Slack, email, etc.)
```

### Pattern 4: Function Names

**Before** (Specific functions):
```javascript
function analyzeLeaveRequest(text) { ... }
function extractLeaveDetails(text) { ... }
function generateLeaveSummary(requests) { ... }
```

**After** (Generic functions):
```javascript
// CUSTOMIZE THIS: Rename functions to match your domain
function analyzeItem(text) { ... }
function extractDetails(text) { ... }
function generateSummary(items) { ... }

// Examples for different domains:
// - analyzeOrder, extractOrderDetails, generateOrderSummary
// - analyzeTask, extractTaskDetails, generateTaskSummary
// - analyzeReport, extractReportDetails, generateReportSummary
```

### Pattern 5: File Names

**Before** (Specific names):
```
fetch-minutes.js
generate-summary.js
weekly-trends.js
lib/summarizer.js
```

**After** (Generic names):
```
example-fetch.js          # Example: Fetching data
example-process.js        # Example: Processing data
example-scheduled.js      # Example: Scheduled job
lib/example-processor.js  # Example: Data processor

CUSTOMIZE: Rename files to match your use case
- fetch-orders.js, process-orders.js
- fetch-reports.js, generate-reports.js
- fetch-tasks.js, analyze-tasks.js
```

### Pattern 6: User Identifiers

**Before** (Real users):
```javascript
const teamMembers = [
  { id: 'U123ABC', name: 'john.doe', real_name: 'John Doe' },
  { id: 'U456DEF', name: 'jane.smith', real_name: 'Jane Smith' },
  { id: 'U789GHI', name: 'bob.jones', real_name: 'Bob Jones' }
];
```

**After** (Generic users):
```javascript
// CUSTOMIZE THIS: Replace with your team members
const teamMembers = [
  { id: 'U123456', name: 'user1', real_name: 'User One' },
  { id: 'U789012', name: 'user2', real_name: 'User Two' }
];

// To get user IDs:
// 1. Open Slack, click on user profile
// 2. Click "More" → "Copy member ID"
// 3. Or use: await slackClient.client.users.info({ user: '@username' })
```

### Pattern 7: Table and Collection Names

**Before** (Specific names):
```javascript
const minutesTable = 'daily_minutes';
const requestsTable = 'leave_requests';
const approvalsTable = 'leave_approvals';
```

**After** (Generic names):
```javascript
// CUSTOMIZE THIS: Replace table names with yours
const dataTable = 'items';  // Your main data table
const recordsTable = 'records';  // Your records table
const actionsTable = 'actions';  // Your actions table

// Naming conventions:
// - Use lowercase with underscores
// - Plural form (items, not item)
// - Descriptive (user_profiles, not users)
```

### Pattern 8: Service Lifecycle Patterns

**Before** (Slack Socket Mode specific):
```javascript
// Graceful shutdown for Slack bot
async function gracefulShutdown(signal) {
  console.log(`${signal} received, shutting down...`);

  // Close Slack Socket Mode connection
  await app.stop();
  console.log('✅ Slack connection closed');

  // Stop database sync
  database.stop();

  process.exit(0);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
```

**After** (Generic long-running service):
```javascript
// CUSTOMIZE THIS: Graceful shutdown for any long-running service
async function gracefulShutdown(signal) {
  if (isShuttingDown) process.exit(1);
  isShuttingDown = true;
  console.log(`${signal} received, shutting down gracefully...`);

  const timeout = setTimeout(() => process.exit(1), 5000);

  try {
    // CUSTOMIZE: Close your external connections
    // Examples:
    // - Slack Bot: await app.stop()
    // - HTTP Server: await server.close()
    // - WebSocket: await wss.close()
    // - Database Pool: await pool.end()
    await service.stop();
    console.log('✅ Service connections closed');

    // CUSTOMIZE: Stop your background tasks
    // Examples:
    // - Database sync: database.stop()
    // - Heartbeat: clearInterval(heartbeatInterval)
    // - Queue processor: worker.stop()
    if (backgroundTasks && backgroundTasks.stop) {
      backgroundTasks.stop();
    }

    clearTimeout(timeout);
    process.exit(0);
  } catch (error) {
    clearTimeout(timeout);
    process.exit(1);
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// CUSTOMIZE: Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  gracefulShutdown('uncaughtException');
});
```

**Key generalizations**:
- "Slack Socket Mode" → "external connections" with examples
- "database.stop()" → "backgroundTasks.stop()" with examples
- Added timeout protection (universal pattern)
- Added error handlers (missing from specific version)
- Comments show how to adapt for different service types

**Real example**: docs/GRACEFUL_SHUTDOWN.md shows this pattern applied to:
1. Slack bots (original use case)
2. Express HTTP servers
3. Generic long-running services

---

## Advanced Generalization Techniques

### Technique 1: Conditional Examples

Show multiple use cases in comments:

```javascript
// CUSTOMIZE THIS: Choose your data source
let items;

// Option 1: Fetch from Slack
// items = await slackClient.fetchMessages(channelId, date);

// Option 2: Fetch from API
// items = await fetch('https://api.example.com/items').then(r => r.json());

// Option 3: Query database
// items = await db.query('SELECT * FROM items WHERE date = $1', [date]);

// Option 4: Read from file
// items = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Default example (replace with your source)
items = await exampleDataSource(date);
```

### Technique 2: Parameterized Configuration

Extract hard-coded values to configuration:

```javascript
// Before: Hard-coded throughout
const channelId = 'C123ABC';
const searchText = 'daily update';
const timezone = 'America/New_York';

// After: Configuration block
// CUSTOMIZE THIS: Your application configuration
const CONFIG = {
  // Slack configuration
  channelId: process.env.SLACK_CHANNEL_ID || 'C123ABC456',
  searchText: process.env.SEARCH_TEXT || 'daily update',

  // Date/time configuration
  timezone: process.env.TIMEZONE || 'America/New_York',  // See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

  // Data table configuration
  tableName: process.env.TABLE_NAME || 'items',

  // Feature flags
  enableAI: process.env.ENABLE_AI === 'true',
  notifyUsers: process.env.NOTIFY_USERS !== 'false'
};
```

### Technique 3: Domain Abstraction

Create domain-agnostic abstractions:

```javascript
// Before: Leave request specific
class LeaveRequestAnalyzer {
  analyzeLeaveRequest(text) {
    const leaveType = this.extractLeaveType(text);
    const days = this.extractDaysRequested(text);
    const approval = this.determineApproval(leaveType, days);
    return { leaveType, days, approval };
  }
}

// After: Generic item analyzer
class ItemAnalyzer {
  // CUSTOMIZE THIS: Implement for your domain
  analyzeItem(text) {
    const type = this.extractType(text);
    const quantity = this.extractQuantity(text);
    const recommendation = this.makeRecommendation(type, quantity);
    return { type, quantity, recommendation };
  }

  // CUSTOMIZE: Extract your domain-specific type
  extractType(text) {
    // Example: project type, order type, task type
    return 'example_type';
  }

  // CUSTOMIZE: Extract your domain-specific quantity
  extractQuantity(text) {
    // Example: hours, count, amount
    return 0;
  }

  // CUSTOMIZE: Make your domain-specific recommendation
  makeRecommendation(type, quantity) {
    // Example: approve/reject, prioritize, assign
    return { action: 'review', confidence: 0.8 };
  }
}
```

### Technique 4: Use Case Examples

Provide concrete examples for different domains:

```markdown
## Example Use Cases

### E-Commerce Order Processing
```javascript
const order = await database.create({
  name: 'Order #12345',
  type: 'standard_shipping',
  quantity: 3,
  status: 'processing',
  customer_id: 'CUST-001'
});
```

### Project Management
```javascript
const task = await database.create({
  name: 'Implement user authentication',
  type: 'backend',
  quantity: 8,  // estimated hours
  status: 'in_progress',
  assigned_to: 'dev_123'
});
```

### Content Management
```javascript
const article = await database.create({
  name: 'Getting Started Guide',
  type: 'documentation',
  quantity: 1500,  // word count
  status: 'draft',
  author_id: 'writer_456'
});
```
```

---

## Testing Generalization

### Checklist for Generalized Content

- [ ] No hard-coded employee names or IDs
- [ ] No business-specific terminology (unless explained)
- [ ] Field names are generic (name, type, status vs. leave_type, approval_status)
- [ ] File names are generic or prefixed with "example-"
- [ ] Functions have generic names with customization comments
- [ ] ID formats use generic prefixes (ITEM- vs. REQ-)
- [ ] Code examples show multiple use case options
- [ ] Configuration extracted to clearly marked sections
- [ ] "CUSTOMIZE THIS" comments at every customization point
- [ ] 2-3 example alternatives provided for each customization
- [ ] Real use case examples show how to adapt (if helpful)

### Self-Review Questions

1. **Can someone in a completely different industry use this?**
   - E-commerce, project management, content creation, etc.

2. **Are customization points obvious?**
   - Would a new developer know what to change?

3. **Do examples suggest patterns without being prescriptive?**
   - "Replace X with your Y" not "You must use Z"

4. **Is domain knowledge separated from technical knowledge?**
   - Technical: How to use LaunchCode API
   - Domain: What a leave request is

5. **Could this work for both simple and complex use cases?**
   - Simple: Daily status updates
   - Complex: Multi-step approval workflow

---

## Common Generalization Mistakes

### Mistake 1: Over-Generalization

**Too generic**:
```javascript
// CUSTOMIZE THIS: Do stuff with things
function doStuff(thing) {
  const result = processThing(thing);
  return result;
}
```

**Better**:
```javascript
// CUSTOMIZE THIS: Process your data items
// Examples:
// - Analyze Slack messages for sentiment
// - Validate order data for completeness
// - Format report content for presentation
function processItem(data) {
  const result = analyzeData(data);
  return result;
}
```

**Guideline**: Generic but still meaningful. "Item" and "data" are better than "thing" and "stuff".

### Mistake 2: Insufficient Examples

**Too vague**:
```javascript
// CUSTOMIZE THIS: Replace with your logic
const result = customLogic(input);
```

**Better**:
```javascript
// CUSTOMIZE THIS: Replace with your processing logic
// Examples:
// - AI analysis: await claude.analyze(input.text)
// - Validation: validateSchema(input, schema)
// - Transformation: transformToFormat(input, targetFormat)
// - Calculation: calculateTotal(input.items)
const result = exampleProcessing(input);
```

### Mistake 3: Leaving Hidden Assumptions

**Hidden assumptions**:
```javascript
// Assumes user knows Slack user IDs start with 'U'
const userId = 'U123ABC';

// Assumes user knows data table structure
await db.put('items', itemId, item);
```

**Better**:
```javascript
// Slack user IDs start with 'U'
// Get user ID: Slack → Click user → More → Copy member ID
const userId = 'U123ABC';  // Example format

// Data table structure: (table_name, document_key, data_object)
// See: docs/GETTING_STARTED.md#creating-data-tables
await db.put('items', itemId, item);
```

### Mistake 4: Inconsistent Terminology

**Inconsistent**:
```javascript
// Mixed terminology confuses users
const record = await fetchItem();
const element = await processData(record);
await saveEntry(element);
```

**Consistent**:
```javascript
// Use 'item' consistently throughout
const item = await fetchItem();
const processedItem = await processItem(item);
await saveItem(processedItem);
```

### Mistake 5: Removing Too Much Context

**Too little context**:
```javascript
// What is this for? Why 3 retries? When would I change this?
const MAX_RETRIES = 3;
```

**Better**:
```javascript
// Maximum retries for data table sync operations
// LaunchCode data tables have eventual consistency (~200-300ms)
// 3 retries with 2-second delays allows up to 6 seconds for sync
// Increase if you see frequent sync failures in logs
const MAX_RETRIES = 3;
```

---

## Real Example: Our Transformation

### Before (Specific to Leave Requests)

```javascript
/**
 * Analyze leave request text and determine if it should be auto-approved
 */
async function analyzeLeaveRequest(text) {
  const leaveType = extractLeaveType(text);
  const days = extractDaysRequested(text);
  const reason = extractReason(text);

  // Auto-approve vacation requests <= 3 days
  if (leaveType === 'vacation' && days <= 3) {
    return {
      approved: true,
      reason: 'Auto-approved: vacation <= 3 days'
    };
  }

  // Sick leave always auto-approved
  if (leaveType === 'sick') {
    return {
      approved: true,
      reason: 'Auto-approved: sick leave'
    };
  }

  // Everything else needs manager review
  return {
    approved: false,
    reason: 'Requires manager approval'
  };
}
```

### After (Generic Item Processing)

```javascript
/**
 * Analyze item and make recommendation
 * CUSTOMIZE THIS: Replace with your domain logic
 */
async function analyzeItem(text) {
  // CUSTOMIZE: Extract your relevant fields
  const type = extractType(text);  // e.g., category, priority, status
  const quantity = extractQuantity(text);  // e.g., amount, count, hours
  const details = extractDetails(text);  // e.g., description, requirements

  // CUSTOMIZE: Define your auto-approval rules
  // Example rules for different domains:
  //
  // E-Commerce: Auto-approve orders < $100
  // if (type === 'standard' && quantity < 100) return { approved: true };
  //
  // Project Management: Auto-assign tasks < 4 hours
  // if (type === 'bug_fix' && quantity <= 4) return { approved: true };
  //
  // Content: Auto-publish articles < 500 words
  // if (type === 'blog_post' && quantity < 500) return { approved: true };

  // Example generic logic (replace with yours)
  if (type === 'low_priority' && quantity <= 3) {
    return {
      approved: true,
      reason: 'Auto-approved: low priority with small quantity'
    };
  }

  // Default: require review
  return {
    approved: false,
    reason: 'Requires manual review'
  };
}

// CUSTOMIZE: Implement your field extraction logic
function extractType(text) {
  // Examples:
  // - Order type: 'standard', 'express', 'international'
  // - Task type: 'bug', 'feature', 'documentation'
  // - Content type: 'blog', 'documentation', 'tutorial'
  return 'example_type';
}

function extractQuantity(text) {
  // Examples:
  // - Order amount: parseFloat(text.match(/\$(\d+)/)[1])
  // - Task hours: parseInt(text.match(/(\d+) hours/)[1])
  // - Content words: text.split(/\s+/).length
  return 0;
}
```

---

## Generalization Workflow

1. **Audit**: List all project-specific elements
2. **Map**: Create specific → generic mapping table
3. **Replace**: Use find/replace for consistent terms (most specific first)
4. **Annotate**: Add "CUSTOMIZE THIS" comments
5. **Exemplify**: Provide 2-3 alternative examples
6. **Document**: Add use case examples if helpful
7. **Test**: Can someone in different domain understand and adapt it?
8. **Review**: Check for hidden assumptions and inconsistent terminology

---

## Tools and Scripts

### Find Project-Specific Terms

```bash
# Find hard-coded names
grep -r "John\|Jane\|Bob" --include="*.js" --include="*.md" .

# Find specific IDs
grep -r "U[0-9A-Z]\{9\}" --include="*.js" .

# Find domain-specific fields
grep -r "leave_\|minute_\|approval_" --include="*.js" .
```

### Batch Replace

```bash
# Create replacement script
cat > generalize.sh << 'EOF'
#!/bin/bash

# Most specific first
find . -type f \( -name "*.js" -o -name "*.md" \) -exec sed -i '' \
  -e 's/leave_request/item/g' \
  -e 's/daily_minutes/data/g' \
  -e 's/REQ-/ITEM-/g' \
  -e 's/fetch-minutes\.js/example-fetch.js/g' \
  {} +
EOF

chmod +x generalize.sh
./generalize.sh
```

---

## Next Steps

Now that you understand generalization, learn how to:
- [Write effective content](CONTENT_PATTERNS.md)
- [Apply documentation patterns](DOCUMENTATION_PATTERNS.md)
- [Publish multi-file plugins](PLUGIN_PUBLISHING.md)
- [Follow optimization checklist](CHECKLIST.md)
