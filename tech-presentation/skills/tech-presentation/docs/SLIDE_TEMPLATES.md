# Slide Templates

Common slide patterns with copy-paste ready examples for technical presentations.

---

## Overview

This guide provides battle-tested slide templates that you can copy and customize. Each template includes complete HTML structure, proper escaping, and size configurations optimized for big screen visibility.

**Templates are organized by:**
- Structural purpose (title, content, comparison)
- Content type (code, configuration, text)
- Layout pattern (single, side-by-side, vertical)

---

## Table of Contents

1. [Structural Templates](#structural-templates)
   - Title slide
   - Section title slide
   - Table of contents
   - Summary slide
   - Questions slide

2. [Content Templates](#content-templates)
   - Single code example
   - Code with explanation
   - Configuration file
   - Bullet points with callout

3. [Comparison Templates](#comparison-templates)
   - Before/after code
   - Side-by-side comparison
   - Problem-solution pattern

4. [Advanced Templates](#advanced-templates)
   - Vertical sub-slides
   - Step-by-step progression
   - Multi-column layout
   - Compact slide

---

## Structural Templates

### Title Slide

The opening slide of your presentation.

```html
<section data-centered>
    <h1>Your Presentation Title</h1>
    <p>A brief subtitle or description</p>
    <p>
        <small>Your Name | Date</small>
    </p>
</section>
```

**Usage notes:**
- Always use `data-centered` attribute
- Keep title under 60 characters
- Subtitle is optional but recommended
- Include presenter name and date in `<small>` tag

**Example:**

```html
<section data-centered>
    <h1>Integration Testing with Spring Boot</h1>
    <p>Best practices for testing microservices</p>
    <p>
        <small>Engineering Team | January 2026</small>
    </p>
</section>
```

---

### Section Title Slide

Introduces a major section or topic.

```html
<section data-centered>
    <h2>Section Title</h2>
    <p>Brief description of what this section covers</p>
</section>
```

**Usage notes:**
- Use `<h2>` for section titles
- Always include `data-centered`
- Keep description to one sentence
- Use between major topics

**Example:**

```html
<section data-centered>
    <h2>Testing with Testcontainers</h2>
    <p>Running real dependencies in Docker during tests</p>
</section>
```

---

### Table of Contents

Shows the presentation structure.

```html
<section>
    <h2>Agenda</h2>
    <ul>
        <li>Topic 1 - Brief description</li>
        <li>Topic 2 - Brief description</li>
        <li>Topic 3 - Brief description</li>
        <li>Topic 4 - Brief description</li>
        <li>Summary &amp; Questions</li>
    </ul>
</section>
```

**Usage notes:**
- Place after title slide
- List 4-7 main topics
- Keep descriptions brief (5-8 words)
- Always end with "Summary & Questions"
- Escape `&` as `&amp;`

**Example:**

```html
<section>
    <h2>What We'll Cover</h2>
    <ul>
        <li>Why integration testing matters</li>
        <li>Setting up Testcontainers</li>
        <li>Spring Boot integration patterns</li>
        <li>Real-world examples</li>
        <li>Common pitfalls &amp; best practices</li>
        <li>Summary &amp; Questions</li>
    </ul>
</section>
```

---

### Summary Slide

Concludes with key takeaways.

```html
<section>
    <h2>Key Takeaways</h2>
    <ul>
        <li>Takeaway 1 - actionable point</li>
        <li>Takeaway 2 - actionable point</li>
        <li>Takeaway 3 - actionable point</li>
        <li>Takeaway 4 - actionable point</li>
    </ul>
    <div class="highlight-box">
        <p><strong>Remember:</strong> One sentence summary of most important concept</p>
    </div>
</section>
```

**Usage notes:**
- Include 3-5 key takeaways
- Make each point actionable
- Use highlight-box for critical message
- Place before Questions slide

**Example:**

```html
<section>
    <h2>Key Takeaways</h2>
    <ul>
        <li>Testcontainers runs real dependencies in Docker</li>
        <li>@DynamicPropertySource configures Spring from containers</li>
        <li>Use @Container for automatic lifecycle management</li>
        <li>Reusable containers improve test performance</li>
    </ul>
    <div class="highlight-box">
        <p><strong>Remember:</strong> Real dependencies catch bugs that mocks miss</p>
    </div>
</section>
```

---

### Questions Slide

Final slide for Q&A.

```html
<section data-centered>
    <h1>Questions?</h1>
    <p>Thank you for your attention</p>
</section>
```

**Usage notes:**
- Always use `data-centered`
- Keep it simple
- Optional: Add contact information
- This should be the last slide

**With contact info:**

```html
<section data-centered>
    <h1>Questions?</h1>
    <p>Thank you for your attention</p>
    <p>
        <small>your.email@company.com | #team-channel</small>
    </p>
</section>
```

---

## Content Templates

### Single Code Example

Most common template for showing code.

```html
<section>
    <h3>Descriptive Title</h3>
    <pre><code class="language-java" data-trim>
// Comment explaining the code
public class Example {

    private final Dependency dependency;

    public Example(Dependency dependency) {
        this.dependency = dependency;
    }

    public Result performAction() {
        return dependency.execute();
    }
}
    </code></pre>
</section>
```

**Usage notes:**
- Always specify `class="language-XXX"`
- Always include `data-trim`
- Escape `<`, `>`, `&` characters
- Add comments to explain non-obvious parts
- Default size works for 15-20 lines

**With medium size for shorter code:**

```html
<section>
    <h3>Simple Dependency Injection</h3>
    <div class="medium-code">
    <pre><code class="language-java" data-trim>
@Service
public class UserService {

    private final UserRepository repository;

    // Constructor injection is preferred
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
}
    </code></pre>
    </div>
</section>
```

---

### Code with Explanation

Code example with bullet points explaining it.

```html
<section>
    <h3>Title Explaining the Code</h3>
    <pre><code class="language-java" data-trim>
@SpringBootTest
@Testcontainers
class IntegrationTest {

    @Container
    static PostgreSQLContainer&lt;?&gt; postgres =
        new PostgreSQLContainer&lt;&gt;("postgres:15");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
    }
}
    </code></pre>
    <ul>
        <li>@Testcontainers enables automatic container management</li>
        <li>@Container starts PostgreSQL before tests run</li>
        <li>@DynamicPropertySource configures Spring from running container</li>
    </ul>
</section>
```

**Usage notes:**
- Code first, explanation after
- Keep code focused and relevant
- Explain annotations and non-obvious parts
- 3-5 bullet points maximum

---

### Configuration File

For YAML, XML, or other config examples.

```html
<section>
    <h3>Docker Compose Configuration</h3>
    <pre><code class="language-yaml" data-trim>
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
    </code></pre>
    <p>Complete configuration for PostgreSQL development environment</p>
</section>
```

**Usage notes:**
- Use appropriate language tag (yaml, xml, json)
- Include complete sections
- Add brief explanation below code
- Show real configuration values

**With callout:**

```html
<section>
    <h3>Application Configuration</h3>
    <pre><code class="language-yaml" data-trim>
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: ${DB_USER}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    </code></pre>
    <div class="highlight-box">
        <p><strong>Important:</strong> Use environment variables for credentials, never hardcode them</p>
    </div>
</section>
```

---

### Bullet Points with Callout

Text-focused slide with highlighted key point.

```html
<section>
    <h3>Why Use Testcontainers?</h3>
    <ul>
        <li>Run real dependencies instead of mocks</li>
        <li>Catch integration bugs early</li>
        <li>Consistent test environment across team</li>
        <li>No manual database setup required</li>
    </ul>
    <div class="highlight-box">
        <p><strong>Key Benefit:</strong> Tests run against same database as production</p>
    </div>
</section>
```

**Usage notes:**
- 3-5 bullet points
- One line per bullet
- Use highlight-box for critical message
- Keep focused on single concept

---

## Comparison Templates

### Before/After Code

Shows improvement or refactoring.

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
        // Direct database coupling
        PreparedStatement stmt =
            conn.prepareStatement(SQL);
        stmt.execute();
    }
}
            </code></pre>
        </div>
        <div>
            <p><strong>✅ After: Easy to Test</strong></p>
            <pre><code class="language-java" data-trim>
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repo) {
        this.repository = repo;
    }

    public void saveUser(User user) {
        repository.save(user);
    }
}
            </code></pre>
        </div>
    </div>
</section>
```

**Usage notes:**
- Use grid layout with two columns
- Mark "Before" with ❌ and "After" with ✅
- Keep both examples similar length
- Show clear improvement
- Code should be 10-15 lines each max

---

### Side-by-Side Comparison

Compare two approaches or implementations.

```html
<section>
    <h3>Mock vs Real Database</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
            <p><strong>Mock Approach</strong></p>
            <pre><code class="language-java" data-trim>
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repository;

    @Test
    void testSaveUser() {
        when(repository.save(any()))
            .thenReturn(user);
        // Tests mock behavior
    }
}
            </code></pre>
            <p>✅ Fast<br>❌ Doesn't test SQL</p>
        </div>
        <div>
            <p><strong>Real Database</strong></p>
            <pre><code class="language-java" data-trim>
@SpringBootTest
@Testcontainers
class UserServiceTest {

    @Container
    static PostgreSQLContainer&lt;?&gt; db =
        new PostgreSQLContainer&lt;&gt;();

    @Test
    void testSaveUser() {
        // Tests real database
    }
}
            </code></pre>
            <p>✅ Tests SQL<br>❌ Slower</p>
        </div>
    </div>
</section>
```

**Usage notes:**
- Show pros/cons of each approach
- Keep code examples balanced
- Add brief pros/cons list below
- Use for "when to use what" discussions

---

### Problem-Solution Pattern

Presents problem then shows solution.

```html
<section>
    <!-- Problem slide -->
    <section>
        <h3>Problem: Slow Integration Tests</h3>
        <ul>
            <li>Tests take 5+ minutes to run</li>
            <li>Developers skip running tests locally</li>
            <li>CI/CD pipeline is bottleneck</li>
            <li>Bugs slip through to production</li>
        </ul>
        <div class="highlight-box">
            <p><strong>Impact:</strong> Reduced productivity and quality</p>
        </div>
    </section>

    <!-- Solution slide -->
    <section>
        <h3>Solution: Reusable Testcontainers</h3>
        <pre><code class="language-java" data-trim>
@Testcontainers
class FastIntegrationTest {

    // Reuse container across all tests
    @Container
    static PostgreSQLContainer&lt;?&gt; postgres =
        new PostgreSQLContainer&lt;&gt;("postgres:15")
            .withReuse(true);
}
        </code></pre>
        <ul>
            <li>Container starts once, reused by all tests</li>
            <li>Test time reduced from 5 minutes to 90 seconds</li>
        </ul>
    </section>

    <!-- Result slide -->
    <section>
        <h3>Result: 70% Faster Tests</h3>
        <ul>
            <li>5 minutes → 90 seconds</li>
            <li>Developers run tests before every commit</li>
            <li>CI/CD pipeline no longer bottleneck</li>
            <li>Catch bugs in development</li>
        </ul>
        <div class="highlight-box">
            <p><strong>Outcome:</strong> Better quality, happier developers</p>
        </div>
    </section>
</section>
```

**Usage notes:**
- Use vertical navigation (nested sections)
- Present problem, solution, then results
- Quantify improvements when possible
- Include impact/outcome statements

---

## Advanced Templates

### Vertical Sub-Slides

Break complex topics into digestible steps.

```html
<section>
    <!-- Main topic -->
    <section>
        <h2>Setting Up LocalStack</h2>
        <p>Local AWS cloud emulator for development and testing</p>
    </section>

    <!-- Step 1 -->
    <section>
        <h3>Step 1: Docker Compose Service</h3>
        <pre><code class="language-yaml" data-trim>
services:
  localstack:
    image: localstack/localstack:latest
    ports:
      - "4566:4566"
    environment:
      - SERVICES=s3,sqs,sns
        </code></pre>
    </section>

    <!-- Step 2 -->
    <section>
        <h3>Step 2: Initialization Script</h3>
        <pre><code class="language-bash" data-trim>
#!/bin/bash
# Create S3 bucket
awslocal s3 mb s3://test-bucket

# Create SQS queue
awslocal sqs create-queue --queue-name test-queue
        </code></pre>
    </section>

    <!-- Step 3 -->
    <section>
        <h3>Step 3: Mount Init Script</h3>
        <pre><code class="language-yaml" data-trim>
  localstack:
    image: localstack/localstack:latest
    volumes:
      - ./init-aws.sh:/etc/localstack/init/ready.d/init-aws.sh
        </code></pre>
        <p>LocalStack runs scripts in /etc/localstack/init/ready.d/ on startup</p>
    </section>

    <!-- Step 4 -->
    <section>
        <h3>Step 4: Configure Spring Boot</h3>
        <pre><code class="language-yaml" data-trim>
aws:
  endpoint: http://localhost:4566
  region: us-east-1
  accessKeyId: test
  secretAccessKey: test
        </code></pre>
    </section>
</section>
```

**Usage notes:**
- Wrap all steps in outer `<section>`
- Each step is its own nested `<section>`
- Navigate down with down arrow
- Perfect for tutorials and setup guides
- Keep each step focused on one action

---

### Step-by-Step Progression

Shows code building complexity gradually.

```html
<section>
    <!-- Step 1: Simplest -->
    <section>
        <h3>Basic Testcontainer</h3>
        <pre><code class="language-java" data-trim>
@Container
static PostgreSQLContainer&lt;?&gt; postgres =
    new PostgreSQLContainer&lt;&gt;("postgres:15");
        </code></pre>
        <p>Simplest possible container declaration</p>
    </section>

    <!-- Step 2: Add configuration -->
    <section>
        <h3>With Configuration</h3>
        <pre><code class="language-java" data-trim>
@Container
static PostgreSQLContainer&lt;?&gt; postgres =
    new PostgreSQLContainer&lt;&gt;("postgres:15")
        .withDatabaseName("testdb")
        .withUsername("testuser")
        .withPassword("testpass");
        </code></pre>
        <p>Add custom database configuration</p>
    </section>

    <!-- Step 3: Spring integration -->
    <section>
        <h3>Spring Boot Integration</h3>
        <pre><code class="language-java" data-trim>
@SpringBootTest
@Testcontainers
class IntegrationTest {

    @Container
    static PostgreSQLContainer&lt;?&gt; postgres =
        new PostgreSQLContainer&lt;&gt;("postgres:15");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
}
        </code></pre>
        <p>Complete Spring Boot test setup</p>
    </section>
</section>
```

**Usage notes:**
- Start with simplest example
- Add one concept per slide
- Build to complete real-world example
- Excellent for teaching progression

---

### Multi-Column Layout

Three or more items side by side.

```html
<section>
    <h3>AWS LocalStack Services</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
        <div>
            <h4>S3</h4>
            <pre><code class="language-bash" data-trim>
awslocal s3 mb \
  s3://bucket

awslocal s3 cp \
  file.txt \
  s3://bucket/
            </code></pre>
        </div>
        <div>
            <h4>SQS</h4>
            <pre><code class="language-bash" data-trim>
awslocal sqs \
  create-queue \
  --queue-name q

awslocal sqs \
  send-message \
  --queue-url $URL
            </code></pre>
        </div>
        <div>
            <h4>SNS</h4>
            <pre><code class="language-bash" data-trim>
awslocal sns \
  create-topic \
  --name topic

awslocal sns \
  publish \
  --topic-arn $ARN
            </code></pre>
        </div>
    </div>
</section>
```

**Usage notes:**
- Use for comparing 3+ similar items
- Keep code in each column short
- Ensure text is readable (may need medium-code)
- Good for showing parallel concepts

---

### Compact Slide

When content must stay together but doesn't fit.

```html
<section class="compact-slide">
    <h3>Complete Integration Test Example</h3>
    <pre><code class="language-java" data-trim>
package com.example.inventory;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
class InventoryServiceIntegrationTest {

    @Container
    static PostgreSQLContainer&lt;?&gt; postgres =
        new PostgreSQLContainer&lt;&gt;("postgres:15")
            .withDatabaseName("testdb");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private ProductRepository productRepository;

    @Test
    void shouldSaveAndRetrieveProduct() {
        // Given
        Product product = new Product("12345", "Test Item", 9.99);

        // When
        inventoryService.saveProduct(product);
        Product retrieved = productRepository.findBySku("12345").orElse(null);

        // Then
        assertNotNull(retrieved);
        assertEquals("Test Item", retrieved.getName());
        assertEquals(9.99, retrieved.getPrice());
    }
}
    </code></pre>
    <p>Complete test with all imports, annotations, and setup</p>
</section>
```

**Usage notes:**
- Use `class="compact-slide"` on section element
- Makes all content 15% smaller
- Last resort when splitting isn't logical
- Test visibility carefully
- Consider if splitting would be better

---

## Combining Templates

### Code Example with Side-by-Side Explanation

```html
<section>
    <h3>Spring Boot Test Configuration</h3>
    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px;">
        <div>
            <pre><code class="language-java" data-trim>
@SpringBootTest
@Testcontainers
class IntegrationTest {

    @Container
    static PostgreSQLContainer&lt;?&gt; postgres =
        new PostgreSQLContainer&lt;&gt;("postgres:15");

    @DynamicPropertySource
    static void configureProperties(
            DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url",
            postgres::getJdbcUrl);
    }
}
            </code></pre>
        </div>
        <div>
            <h4>Key Annotations</h4>
            <p><strong>@SpringBootTest</strong><br>
            Loads full application context</p>

            <p><strong>@Testcontainers</strong><br>
            Manages container lifecycle</p>

            <p><strong>@Container</strong><br>
            Declares managed container</p>

            <p><strong>@DynamicPropertySource</strong><br>
            Configures properties from container</p>
        </div>
    </div>
</section>
```

**Usage notes:**
- Code takes more space (1.5fr vs 1fr)
- Explanations on right are brief
- Good for annotated frameworks

---

### Vertical Progression with Comparison

```html
<section>
    <!-- Main topic -->
    <section data-centered>
        <h2>Evolution of Testing Approach</h2>
        <p>From mocks to integration tests</p>
    </section>

    <!-- Phase 1 -->
    <section>
        <h3>Phase 1: Unit Tests with Mocks</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <pre><code class="language-java" data-trim>
@ExtendWith(MockitoExtension.class)
class ServiceTest {
    @Mock
    private Repository repository;

    @Test
    void test() {
        when(repository.save(any()))
            .thenReturn(entity);
    }
}
                </code></pre>
            </div>
            <div>
                <ul>
                    <li>✅ Fast execution</li>
                    <li>✅ Isolated units</li>
                    <li>❌ Mocks don't catch integration bugs</li>
                    <li>❌ Database queries untested</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Phase 2 -->
    <section>
        <h3>Phase 2: Integration Tests with Testcontainers</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <pre><code class="language-java" data-trim>
@SpringBootTest
@Testcontainers
class ServiceTest {
    @Container
    static PostgreSQLContainer&lt;?&gt; db =
        new PostgreSQLContainer&lt;&gt;();

    @Test
    void test() {
        // Tests real database
    }
}
                </code></pre>
            </div>
            <div>
                <ul>
                    <li>✅ Tests real SQL</li>
                    <li>✅ Catches integration bugs</li>
                    <li>✅ Realistic test environment</li>
                    <li>⚠️ Slower than mocks</li>
                </ul>
            </div>
        </div>
    </section>
</section>
```

---

## Quick Reference

### When to Use Each Template

| Need | Template |
|------|----------|
| Start presentation | Title Slide |
| Show structure | Table of Contents |
| Begin new section | Section Title Slide |
| Show code | Single Code Example |
| Explain code | Code with Explanation |
| Compare approaches | Before/After or Side-by-Side |
| Show improvement | Before/After Code |
| Tutorial or setup | Vertical Sub-Slides |
| Build complexity | Step-by-Step Progression |
| Multiple related items | Multi-Column Layout |
| Content doesn't fit | Compact Slide (last resort) |
| End presentation | Summary + Questions |

### Template Selection Flowchart

```
What type of content?
├─ Structural (navigation)
│  ├─ Opening → Title Slide
│  ├─ Overview → Table of Contents
│  ├─ New section → Section Title Slide
│  ├─ Conclusion → Summary Slide
│  └─ End → Questions Slide
│
├─ Code example
│  ├─ Single example → Single Code Example
│  ├─ Needs explanation → Code with Explanation
│  ├─ Compare two versions → Before/After
│  ├─ Step-by-step → Vertical Sub-Slides
│  └─ Too long → Compact Slide or split
│
├─ Configuration
│  └─ Config file → Configuration File Template
│
├─ Conceptual
│  ├─ Key points → Bullet Points with Callout
│  ├─ Problem → Problem-Solution Pattern
│  └─ Multiple items → Multi-Column Layout
│
└─ Complex topic
   └─ Break into steps → Vertical Sub-Slides
```

---

## Template Checklist

Before using a template, verify:

- [ ] All special characters escaped (`&amp;`, `&lt;`, `&gt;`)
- [ ] Language class specified on code blocks
- [ ] `data-trim` attribute on all code blocks
- [ ] Appropriate font size class if needed
- [ ] `data-centered` on title/section slides
- [ ] Proper nesting for vertical slides
- [ ] Grid layout spacing defined
- [ ] Highlight-box used for key messages
- [ ] Code examples are complete
- [ ] No content overflow (test visibility)

---

## Related Documentation

- [Content Creation Guide](CONTENT_CREATION.md) - **What to write in your slides**
- [Styling Guide](STYLING_GUIDE.md) - **Font sizes and visual formatting**
- [Common Patterns](COMMON_PATTERNS.md) - **Docker, Spring Boot, AWS examples**
- [Getting Started Guide](GETTING_STARTED.md) - **Framework setup**
- [SKILL.md](../SKILL.md) - **Main navigation hub**
