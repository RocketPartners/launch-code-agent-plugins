# Content Creation Guide

How to structure, write, and organize technical content for effective learning and engagement.

---

## Overview

Great technical presentations balance theory with practical examples, progressing from simple concepts to complex real-world scenarios. This guide covers content strategy, code examples, and progression patterns.

**Target audience:** Entry-level to mid-level software engineers
**Goal:** Clear learning path with actionable takeaways

---

## Content Progression Strategy

### Learning Progression Pattern

```
Simple Foundation → Build Concepts → Show Complexity → Real-World Application
```

**Phase 1: Foundation (15-20% of content)**
- Introduce core concept
- Define key terms
- Show simplest possible example
- Explain why it matters

**Phase 2: Building (30-40% of content)**
- Add complexity gradually
- Show variations and options
- Introduce related concepts
- Compare approaches

**Phase 3: Real-World (30-40% of content)**
- Complete practical examples
- Common patterns and pitfalls
- Integration with other technologies
- Production considerations

**Phase 4: Takeaways (10-15% of content)**
- Summarize key points
- Best practices
- When to use what
- Next steps

### Example: Docker Testing Topic

**Foundation:**
```java
// Simplest testcontainer
@Container
static PostgreSQLContainer<?> postgres =
    new PostgreSQLContainer<>("postgres:15");
```

**Building:**
```java
// Add configuration
@Container
static PostgreSQLContainer<?> postgres =
    new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");
```

**Real-World:**
```java
// Complete integration test with Spring Boot
@SpringBootTest
@Testcontainers
class UserRepositoryIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldSaveAndRetrieveUser() {
        // Real test implementation
    }
}
```

---

## Code Example Philosophy

### Real Code Over Generic Examples

❌ **Generic (avoid):**
```java
public class Example {
    public void doSomething() {
        // TODO: implement
        System.out.println("Hello");
    }
}
```

✅ **Real (prefer):**
```java
@Service
public class InventoryService {

    private final InventoryRepository repository;
    private final S3Client s3Client;

    public InventoryService(InventoryRepository repository,
                           S3Client s3Client) {
        this.repository = repository;
        this.s3Client = s3Client;
    }

    public List&lt;Product&gt; getStoreInventory(String storeId) {
        String key = String.format("inventory/%s/current.tsv", storeId);
        return repository.findByS3Key(key);
    }
}
```

**Why real code is better:**
- Shows actual patterns used in production
- Demonstrates proper dependency injection
- Includes realistic naming conventions
- Provides context developers recognize
- More engaging and credible

### Complete Examples Over Snippets

❌ **Incomplete snippet:**
```java
@Test
void testSomething() {
    assertEquals(expected, actual);
}
```

✅ **Complete example:**
```java
package com.example.inventory;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class InventoryServiceTest {

    @Autowired
    private InventoryService inventoryService;

    private Product testProduct;

    @BeforeEach
    void setUp() {
        testProduct = new Product("12345", "Test Item", 9.99);
    }

    @Test
    void shouldRetrieveInventoryByStoreId() {
        // Given
        String storeId = "store-001";

        // When
        List&lt;Product&gt; inventory =
            inventoryService.getStoreInventory(storeId);

        // Then
        assertNotNull(inventory);
        assertTrue(inventory.size() &gt; 0);
    }
}
```

**What makes it complete:**
- Package declaration
- All imports shown
- Class annotations
- Setup methods
- Full test structure
- Given-When-Then pattern
- Meaningful assertions

### Commented Code Over Bare Code

❌ **No explanation:**
```java
@DynamicPropertySource
static void props(DynamicPropertyRegistry reg) {
    reg.add("spring.datasource.url", postgres::getJdbcUrl);
    reg.add("spring.datasource.username", postgres::getUsername);
}
```

✅ **Well explained:**
```java
// Spring Boot needs database connection details at startup
// @DynamicPropertySource provides them from the running container
@DynamicPropertySource
static void configureProperties(DynamicPropertyRegistry registry) {
    // Get JDBC URL from running Testcontainer
    registry.add("spring.datasource.url", postgres::getJdbcUrl);

    // Use container's generated credentials
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
}
```

**Good comments explain:**
- Why the code exists
- What problem it solves
- How it integrates with framework
- Important details not obvious from code

**Avoid comments that:**
- Just repeat the code
- State the obvious
- Are outdated or wrong

---

## Technology Focus

### Primary Technologies to Cover

**Java & Spring Boot:**
- Dependency injection patterns
- Configuration management
- Test slices (@DataJpaTest, @WebMvcTest)
- Integration testing with @SpringBootTest
- Property sources and profiles

**Testing Frameworks:**
- JUnit 5 lifecycle (@BeforeAll, @BeforeEach, @AfterEach)
- Mockito for mocking
- AssertJ for fluent assertions
- Spring Boot Test features
- Testcontainers integration

**Containers:**
- Docker basics and Dockerfile structure
- Docker Compose for multi-container setups
- Testcontainers for integration tests
- Volume mounting and networking
- Environment variables and configuration

**Build Tools:**
- ✅ Gradle (preferred)
- ❌ Maven (avoid unless specifically requested)
- Dependencies and version management
- Test configuration
- Custom tasks

**AWS (with LocalStack):**
- S3 bucket operations
- SQS queue messaging
- SNS notifications
- LocalStack for local development
- Init scripts for resource creation

### Technology Selection Guidelines

**When to include:**
- Technology is widely used in enterprise
- Concept demonstrates important pattern
- Real code examples available
- Fits learning progression

**When to skip:**
- Too niche or specialized
- No good examples available
- Breaks learning flow
- Beyond target audience level

---

## Working with User's Projects

### Gathering Context

**Ask for:**
1. **Relevant file paths** - Configuration, test files, implementation
2. **Project patterns** - Coding standards, naming conventions
3. **Technology stack** - What they actually use
4. **Pain points** - What they struggle with
5. **Audience background** - Team experience level

**Example questions:**
- "Can you provide paths to your Docker Compose files?"
- "Do you have example integration tests I can reference?"
- "What testing patterns does your team use?"
- "Are there any company-specific practices to include?"

### Reading Real Files

When user provides paths, always read them first:

```
User: "Check out our RabbitMQ setup in docker-compose.yml"
Claude: [Reads docker-compose.yml file]
Claude: "I see you're using RabbitMQ with SSL/TLS configuration. Let me incorporate this into the presentation..."
```

**Benefits of reading real files:**
- Accurate code examples
- Matches team's actual patterns
- Shows real configuration
- Demonstrates practical solutions
- Builds trust and credibility

**What to look for:**
- Configuration patterns
- Naming conventions
- Common practices
- Integration patterns
- Error handling approaches

### Integrating Confluence Documentation

If user provides Confluence links or exports:

1. **Read the content** - Understand team's existing knowledge base
2. **Extract patterns** - Identify common approaches
3. **Use terminology** - Match team's language
4. **Reference standards** - Follow documented best practices
5. **Complement, don't duplicate** - Add presentation value

**Example integration:**
- Confluence has detailed setup guide
- Presentation shows quick overview + key concepts
- Slides reference Confluence for deep dive
- Focus on practical examples and demos

---

## Content Organization Patterns

### Slide-to-Topic Ratio

**One slide per concept:**
- Introduces single idea
- Shows one example
- Makes one point
- Keeps focus clear

**Multiple slides per complex topic:**
- Use vertical navigation
- Break into logical steps
- Show progression
- Build understanding gradually

**Example: Testing with Testcontainers**

```html
<!-- Main topic -->
<section>
    <section>
        <h2>Testing with Testcontainers</h2>
        <p>Run real dependencies in Docker during tests</p>
    </section>

    <!-- Step 1: Setup -->
    <section>
        <h3>Step 1: Add Dependency</h3>
        <pre><code class="language-groovy" data-trim>
testImplementation 'org.testcontainers:postgresql:1.19.0'
        </code></pre>
    </section>

    <!-- Step 2: Container -->
    <section>
        <h3>Step 2: Declare Container</h3>
        <pre><code class="language-java" data-trim>
@Container
static PostgreSQLContainer&lt;?&gt; postgres =
    new PostgreSQLContainer&lt;&gt;("postgres:15");
        </code></pre>
    </section>

    <!-- Step 3: Configuration -->
    <section>
        <h3>Step 3: Configure Spring</h3>
        <pre><code class="language-java" data-trim>
@DynamicPropertySource
static void props(DynamicPropertyRegistry reg) {
    reg.add("spring.datasource.url",
        postgres::getJdbcUrl);
}
        </code></pre>
    </section>

    <!-- Step 4: Test -->
    <section>
        <h3>Step 4: Write Test</h3>
        <pre><code class="language-java" data-trim>
@Test
void shouldSaveUser() {
    // Test uses real PostgreSQL
}
        </code></pre>
    </section>
</section>
```

### Topic Sequencing

**Logical order:**
1. Problem statement
2. Solution overview
3. Implementation steps
4. Complete example
5. Common pitfalls
6. Best practices

**Example sequence for Docker testing:**
1. Why test with containers? (Problem)
2. Testcontainers overview (Solution)
3. Basic setup (Implementation)
4. Spring Boot integration (Implementation)
5. Complete test example (Example)
6. Lifecycle management (Pitfalls)
7. Performance tips (Best practices)

---

## Writing Effective Content

### Bullet Points

**Good bullet points:**
- One idea per point
- Concise (one line)
- Parallel structure
- Action-oriented
- Specific

❌ **Weak bullets:**
- "Testing is important and you should do it"
- "Various approaches exist for handling this situation"
- "Configuration can be complex"

✅ **Strong bullets:**
- "Testcontainers starts real dependencies in Docker"
- "@DynamicPropertySource configures Spring from containers"
- "Use @Container for automatic lifecycle management"

### Slide Titles

**Effective titles:**
- Specific and descriptive
- Action-oriented when possible
- Clear what slide covers
- Consistent format

❌ **Weak titles:**
- "Testing" (too vague)
- "Some Code" (meaningless)
- "Example #3" (no context)

✅ **Strong titles:**
- "Testing with Real PostgreSQL"
- "Complete Integration Test Example"
- "Configuring Spring Boot Properties"

### Code Comments

**When to comment:**
- Why code exists (not what it does)
- Non-obvious behavior
- Framework integration points
- Important context

**Comment levels:**

**Minimal (simple code):**
```java
// Create test user
User user = new User("john", "john@example.com");
```

**Moderate (typical code):**
```java
// Spring Boot reads properties at startup, but Testcontainer
// isn't running yet. @DynamicPropertySource solves this timing issue.
@DynamicPropertySource
static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
}
```

**Detailed (complex code):**
```java
// LocalStack needs initialization scripts to create AWS resources.
// Mount the init script as a volume so LocalStack runs it at startup.
// The "ready" marker pattern ensures services are initialized before tests run.
volumes:
  - ./init-aws.sh:/etc/localstack/init/ready.d/init-aws.sh
```

---

## Handling Different Audience Levels

### Entry-Level Engineers

**Focus on:**
- Clear explanations of concepts
- Why things work this way
- Step-by-step progressions
- Common mistakes to avoid
- Lots of examples

**Avoid:**
- Assuming prior knowledge
- Complex terminology without explanation
- Skipping steps
- Advanced patterns without foundation

**Example approach:**
```
1. What is dependency injection? (Concept)
2. Why use it? (Motivation)
3. Simple example with @Autowired (Basic)
4. Constructor injection pattern (Better)
5. When to use each approach (Practical)
```

### Mid-Level Engineers

**Focus on:**
- Patterns and best practices
- Trade-offs between approaches
- Integration scenarios
- Performance considerations
- Real-world complexity

**Can assume:**
- Basic syntax knowledge
- Common framework familiarity
- Testing fundamentals
- Standard patterns

**Example approach:**
```
1. Quick review of Testcontainers basics (Refresher)
2. Integration with Spring Boot (Application)
3. Performance optimization strategies (Advanced)
4. Production considerations (Practical)
```

### Mixed Audience

**Strategy:**
- Start simple, build complexity
- Use progressive disclosure (vertical slides)
- Provide context without over-explaining
- Include "For those new to X..." callouts
- Offer additional resources for deep dives

---

## Common Content Patterns

### Problem-Solution Pattern

```html
<section>
    <section>
        <h2>Problem: Slow Integration Tests</h2>
        <ul>
            <li>Tests take 5+ minutes to run</li>
            <li>Blocks development flow</li>
            <li>Developers skip running tests</li>
        </ul>
    </section>

    <section>
        <h2>Solution: Testcontainers</h2>
        <ul>
            <li>Parallel test execution</li>
            <li>Faster container startup</li>
            <li>Reusable containers across tests</li>
        </ul>
    </section>

    <section>
        <h2>Result: 70% Faster Tests</h2>
        <ul>
            <li>5 minutes → 90 seconds</li>
            <li>Developers run tests regularly</li>
            <li>Catch bugs earlier</li>
        </ul>
    </section>
</section>
```

### Before-After Pattern

```html
<section>
    <h3>Refactoring for Testability</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
            <p><strong>❌ Before: Hard to Test</strong></p>
            <pre><code class="language-java" data-trim>
public class UserService {
    public void saveUser(User user) {
        Connection conn =
            DriverManager.getConnection(URL);
        // Direct database access
    }
}
            </code></pre>
        </div>
        <div>
            <p><strong>✅ After: Easy to Test</strong></p>
            <pre><code class="language-java" data-trim>
public class UserService {
    private final UserRepository repo;

    public void saveUser(User user) {
        repo.save(user);
        // Mockable dependency
    }
}
            </code></pre>
        </div>
    </div>
</section>
```

### Step-by-Step Pattern

Best for tutorials and setup guides:

```html
<section>
    <h3>Setting Up LocalStack - Step 1</h3>
    <p>Add LocalStack to docker-compose.yml</p>
    <pre><code class="language-yaml" data-trim>
services:
  localstack:
    image: localstack/localstack:latest
    </code></pre>
</section>

<section>
    <h3>Setting Up LocalStack - Step 2</h3>
    <p>Configure services to enable</p>
    <pre><code class="language-yaml" data-trim>
    environment:
      - SERVICES=s3,sqs,sns
    </code></pre>
</section>

<!-- Continue steps... -->
```

---

## Content Checklist

Before finalizing content:

### Accuracy
- [ ] All code examples are syntactically correct
- [ ] Examples use current versions and APIs
- [ ] Best practices reflect current standards
- [ ] No deprecated features shown as recommended

### Completeness
- [ ] Code examples include all necessary imports
- [ ] Configuration files show complete structure
- [ ] Dependencies and versions specified
- [ ] Setup steps don't skip critical details

### Clarity
- [ ] Concepts explained before showing code
- [ ] Technical terms defined on first use
- [ ] Code comments explain non-obvious parts
- [ ] Progression from simple to complex is clear

### Relevance
- [ ] Content matches target audience level
- [ ] Examples are realistic and practical
- [ ] Aligns with user's technology stack
- [ ] Focuses on commonly needed scenarios

### Engagement
- [ ] Real code over generic examples
- [ ] Practical problems addressed
- [ ] Clear takeaways provided
- [ ] Next steps suggested

---

## Quick Reference

### Content Structure Template

```
1. Section Title Slide
   - Topic name
   - Brief description

2. Context Slide
   - Why this matters
   - When to use

3. Concept Introduction
   - Simple explanation
   - Basic example

4-6. Building Complexity
   - Add features progressively
   - Show variations
   - Explain trade-offs

7. Complete Real-World Example
   - Full implementation
   - All necessary context
   - Commented appropriately

8. Common Pitfalls
   - What goes wrong
   - How to avoid it

9. Best Practices Summary
   - Key takeaways
   - Action items
```

### Code Example Checklist

- [ ] Package declaration included
- [ ] All imports shown
- [ ] Class/method annotations complete
- [ ] Realistic naming
- [ ] Proper formatting
- [ ] Comments explain why
- [ ] Complete, runnable example
- [ ] Special characters escaped
- [ ] Syntax highlighting specified

---

## Related Documentation

- [Slide Templates](SLIDE_TEMPLATES.md) - **Copy-paste patterns for common slides**
- [Common Patterns](COMMON_PATTERNS.md) - **Docker, Spring Boot, AWS examples**
- [Styling Guide](STYLING_GUIDE.md) - **Visual formatting and fonts**
- [Getting Started Guide](GETTING_STARTED.md) - **Framework setup**
- [SKILL.md](../SKILL.md) - **Main navigation hub**