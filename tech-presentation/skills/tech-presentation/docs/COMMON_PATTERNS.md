# Common Patterns

Real-world examples for Docker, Spring Boot, AWS, and testing patterns used in technical presentations.

---

## Overview

This guide provides production-tested patterns and complete examples for common technical scenarios. All examples are based on real projects and include full configuration, proper escaping, and explanatory comments.

**Patterns organized by:**
- Docker and containerization
- Spring Boot integration testing
- AWS with LocalStack
- Testing frameworks and patterns
- Configuration management

---

## Table of Contents

1. [Docker Patterns](#docker-patterns)
   - PostgreSQL with Docker Compose
   - Testcontainers setup
   - Multi-container applications
   - Volume management

2. [Spring Boot Testing](#spring-boot-testing)
   - Integration test configuration
   - Test slices
   - Dynamic property sources
   - Test fixtures

3. [AWS LocalStack](#aws-localstack)
   - LocalStack setup
   - S3 operations
   - SQS messaging
   - Initialization scripts

4. [Testing Patterns](#testing-patterns)
   - Repository testing
   - Service testing with mocks
   - End-to-end testing
   - Performance testing

5. [Configuration Patterns](#configuration-patterns)
   - Application properties
   - Environment-specific config
   - Secret management
   - Profile management

---

## Docker Patterns

### PostgreSQL with Docker Compose

Complete Docker Compose setup for PostgreSQL development.

```html
<section>
    <h3>PostgreSQL Development Setup</h3>
    <pre><code class="language-yaml" data-trim>
services:
  postgres:
    image: postgres:15
    container_name: dev-postgres
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: developer
      POSTGRES_PASSWORD: devpass
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U developer"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres-data:
    driver: local
    </code></pre>
</section>
```

**Key features:**
- Persistent data with named volume
- Initialization scripts support
- Health check for container readiness
- Custom database and user

**Usage in presentation:**

```html
<section>
    <section>
        <h2>Docker Compose for Development</h2>
        <p>Consistent database setup across team</p>
    </section>

    <section>
        <h3>Basic PostgreSQL Service</h3>
        <pre><code class="language-yaml" data-trim>
services:
  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
        </code></pre>
        <p>Simplest possible setup</p>
    </section>

    <section>
        <h3>Add Configuration</h3>
        <pre><code class="language-yaml" data-trim>
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: developer
      POSTGRES_PASSWORD: devpass
    ports:
      - "5432:5432"
        </code></pre>
        <p>Custom database and credentials</p>
    </section>

    <section>
        <h3>Add Persistence</h3>
        <pre><code class="language-yaml" data-trim>
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: developer
      POSTGRES_PASSWORD: devpass
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
    driver: local
        </code></pre>
        <p>Data survives container restarts</p>
    </section>
</section>
```

---

### Testcontainers Setup

Spring Boot integration with Testcontainers.

```html
<section>
    <h3>Testcontainers Integration Test</h3>
    <div class="small-code">
    <pre><code class="language-java" data-trim>
package com.example.inventory;

import org.junit.jupiter.api.Test;
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
class ProductRepositoryIntegrationTest {

    // Container shared across all tests in this class
    @Container
    static PostgreSQLContainer&lt;?&gt; postgres =
        new PostgreSQLContainer&lt;&gt;("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    // Configure Spring to use the container's connection details
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private ProductRepository productRepository;

    @Test
    void shouldSaveAndRetrieveProduct() {
        // Given
        Product product = new Product("SKU-001", "Test Product", 29.99);

        // When
        Product saved = productRepository.save(product);
        Product retrieved = productRepository.findById(saved.getId()).orElse(null);

        // Then
        assertNotNull(retrieved);
        assertEquals("SKU-001", retrieved.getSku());
        assertEquals("Test Product", retrieved.getName());
        assertEquals(29.99, retrieved.getPrice());
    }
}
    </code></pre>
    </div>
</section>
```

**Explanation slide:**

```html
<section>
    <h3>How Testcontainers Works</h3>
    <ul>
        <li>@Testcontainers enables automatic container management</li>
        <li>@Container starts PostgreSQL container before tests</li>
        <li>Static container is shared across all test methods</li>
        <li>@DynamicPropertySource configures Spring at runtime</li>
        <li>Container stops automatically after tests complete</li>
    </ul>
    <div class="highlight-box">
        <p><strong>Key Benefit:</strong> Tests run against real PostgreSQL, not mocks or H2</p>
    </div>
</section>
```

---

### Multi-Container Applications

Complete docker-compose with multiple services.

```html
<section class="compact-slide">
    <h3>Complete Microservice Stack</h3>
    <pre><code class="language-yaml" data-trim>
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  rabbitmq:
    image: rabbitmq:3-management
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin
    ports:
      - "5672:5672"    # AMQP port
      - "15672:15672"  # Management UI
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes

  localstack:
    image: localstack/localstack:latest
    environment:
      - SERVICES=s3,sqs,sns
      - DEBUG=1
    ports:
      - "4566:4566"
    volumes:
      - ./localstack-init:/etc/localstack/init/ready.d

  application:
    build: .
    depends_on:
      - postgres
      - rabbitmq
      - redis
      - localstack
    environment:
      SPRING_PROFILES_ACTIVE: dev
      DATABASE_URL: jdbc:postgresql://postgres:5432/myapp
      RABBITMQ_HOST: rabbitmq
      REDIS_HOST: redis
      AWS_ENDPOINT: http://localstack:4566
    ports:
      - "8080:8080"

volumes:
  postgres-data:
  rabbitmq-data:
  redis-data:
    </code></pre>
</section>
```

**Explanation with benefits:**

```html
<section>
    <h3>Benefits of Docker Compose Stack</h3>
    <ul>
        <li>One command starts entire environment: <code>docker compose up</code></li>
        <li>Consistent setup across all developers</li>
        <li>No manual service installation required</li>
        <li>Easy to add or remove services</li>
        <li>Version control configuration with code</li>
    </ul>
    <div class="highlight-box">
        <p><strong>Team Impact:</strong> New developers productive in minutes, not hours</p>
    </div>
</section>
```

---

### Volume Management

Persistent data patterns.

```html
<section>
    <h3>Volume Patterns</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
            <p><strong>Named Volume (Persistent)</strong></p>
            <pre><code class="language-yaml" data-trim>
services:
  postgres:
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
            </code></pre>
            <p>✅ Data survives container removal<br>
               ✅ Managed by Docker<br>
               ✅ Best for databases</p>
        </div>
        <div>
            <p><strong>Bind Mount (Development)</strong></p>
            <pre><code class="language-yaml" data-trim>
services:
  postgres:
    volumes:
      - ./init-scripts:/docker-entrypoint-initdb.d
      - ./config:/etc/postgresql
            </code></pre>
            <p>✅ Direct access to files<br>
               ✅ Hot reload changes<br>
               ✅ Best for config/scripts</p>
        </div>
    </div>
</section>
```

---

## Spring Boot Testing

### Integration Test Configuration

Complete integration test setup pattern.

```html
<section class="compact-slide">
    <h3>Complete Integration Test Setup</h3>
    <pre><code class="language-java" data-trim>
package com.example.inventory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class InventoryApiIntegrationTest {

    @Container
    static PostgreSQLContainer&lt;?&gt; postgres =
        new PostgreSQLContainer&lt;&gt;("postgres:15");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ProductRepository productRepository;

    @BeforeEach
    void setUp() {
        productRepository.deleteAll();
    }

    @Test
    void shouldCreateProduct() {
        // Given
        ProductDto dto = new ProductDto("SKU-001", "Test Product", 29.99);

        // When
        ResponseEntity&lt;ProductDto&gt; response =
            restTemplate.postForEntity("/api/products", dto, ProductDto.class);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getSku()).isEqualTo("SKU-001");

        // Verify in database
        assertThat(productRepository.findBySku("SKU-001")).isPresent();
    }

    @Test
    void shouldRetrieveProduct() {
        // Given - product exists in database
        Product product = productRepository.save(
            new Product("SKU-002", "Existing Product", 19.99));

        // When
        ResponseEntity&lt;ProductDto&gt; response =
            restTemplate.getForEntity(
                "/api/products/" + product.getId(),
                ProductDto.class);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getName()).isEqualTo("Existing Product");
    }
}
    </code></pre>
</section>
```

**Explanation slide:**

```html
<section>
    <h3>Integration Test Anatomy</h3>
    <ul>
        <li>@SpringBootTest(webEnvironment = RANDOM_PORT) - Full app context with web server</li>
        <li>TestRestTemplate - Make real HTTP requests</li>
        <li>@BeforeEach - Clean database state between tests</li>
        <li>Given-When-Then - Clear test structure</li>
        <li>Verify both HTTP response and database state</li>
    </ul>
    <div class="highlight-box">
        <p><strong>What This Tests:</strong> HTTP layer, business logic, and database - end to end</p>
    </div>
</section>
```

---

### Test Slices

Testing specific layers with Spring Boot test slices.

```html
<section>
    <section>
        <h2>Spring Boot Test Slices</h2>
        <p>Test only the layer you need</p>
    </section>

    <section>
        <h3>@DataJpaTest - Repository Layer</h3>
        <pre><code class="language-java" data-trim>
@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void shouldFindProductBySku() {
        // Given
        Product product = new Product("SKU-123", "Test", 10.00);
        entityManager.persist(product);
        entityManager.flush();

        // When
        Optional&lt;Product&gt; found = productRepository.findBySku("SKU-123");

        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Test");
    }
}
        </code></pre>
        <ul>
            <li>Tests only JPA repositories</li>
            <li>Auto-configured in-memory database</li>
            <li>TestEntityManager for setup</li>
            <li>Fast execution</li>
        </ul>
    </section>

    <section>
        <h3>@WebMvcTest - Controller Layer</h3>
        <pre><code class="language-java" data-trim>
@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    void shouldReturnProduct() throws Exception {
        // Given
        Product product = new Product("SKU-123", "Test", 10.00);
        when(productService.findById(1L)).thenReturn(Optional.of(product));

        // When &amp; Then
        mockMvc.perform(get("/api/products/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.sku").value("SKU-123"))
            .andExpect(jsonPath("$.name").value("Test"));
    }
}
        </code></pre>
        <ul>
            <li>Tests only MVC layer</li>
            <li>MockMvc for HTTP calls</li>
            <li>Mock dependencies with @MockBean</li>
            <li>No real database or service layer</li>
        </ul>
    </section>

    <section>
        <h3>When to Use Each Slice</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <p><strong>@DataJpaTest</strong></p>
                <ul>
                    <li>Custom JPA queries</li>
                    <li>Repository methods</li>
                    <li>Entity relationships</li>
                    <li>Database constraints</li>
                </ul>
            </div>
            <div>
                <p><strong>@WebMvcTest</strong></p>
                <ul>
                    <li>Request validation</li>
                    <li>Response formatting</li>
                    <li>HTTP status codes</li>
                    <li>Security rules</li>
                </ul>
            </div>
        </div>
        <div class="highlight-box">
            <p><strong>Principle:</strong> Use the smallest slice that tests your code</p>
        </div>
    </section>
</section>
```

---

### Dynamic Property Sources

Runtime configuration for tests.

```html
<section>
    <h3>Dynamic Property Source Patterns</h3>
    <pre><code class="language-java" data-trim>
@SpringBootTest
@Testcontainers
class ServiceIntegrationTest {

    @Container
    static PostgreSQLContainer&lt;?&gt; postgres =
        new PostgreSQLContainer&lt;&gt;("postgres:15");

    @Container
    static GenericContainer&lt;?&gt; redis =
        new GenericContainer&lt;&gt;("redis:7-alpine")
            .withExposedPorts(6379);

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        // Database configuration
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);

        // Redis configuration
        registry.add("spring.redis.host", redis::getHost);
        registry.add("spring.redis.port", redis::getFirstMappedPort);

        // Custom application properties
        registry.add("app.feature.enabled", () -&gt; "true");
        registry.add("app.batch.size", () -&gt; "100");
    }
}
    </code></pre>
    <p>Configure Spring properties from running containers and test-specific values</p>
</section>
```

---

## AWS LocalStack

### LocalStack Setup

Complete LocalStack configuration for local AWS development.

```html
<section>
    <section>
        <h2>AWS LocalStack for Testing</h2>
        <p>Run AWS services locally without real AWS account</p>
    </section>

    <section>
        <h3>Docker Compose LocalStack Service</h3>
        <pre><code class="language-yaml" data-trim>
services:
  localstack:
    image: localstack/localstack:latest
    container_name: localstack
    environment:
      - SERVICES=s3,sqs,sns
      - DEBUG=1
      - DATA_DIR=/tmp/localstack/data
    ports:
      - "4566:4566"     # LocalStack gateway
      - "4510-4559:4510-4559"  # External services
    volumes:
      - ./localstack-init:/etc/localstack/init/ready.d
      - localstack-data:/tmp/localstack
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4566/_localstack/health"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  localstack-data:
        </code></pre>
    </section>

    <section>
        <h3>Initialization Script</h3>
        <pre><code class="language-bash" data-trim>
#!/bin/bash
# File: localstack-init/init-aws.sh

# Wait for LocalStack to be ready
awslocal s3 mb s3://inventory-bucket || true
awslocal s3 mb s3://reports-bucket || true

# Create SQS queues
awslocal sqs create-queue --queue-name inventory-updates || true
awslocal sqs create-queue --queue-name inventory-updates-dlq || true

# Create SNS topics
awslocal sns create-topic --name inventory-events || true

# Subscribe SQS to SNS
TOPIC_ARN=$(awslocal sns list-topics --query "Topics[?contains(TopicArn, 'inventory-events')].TopicArn" --output text)
QUEUE_ARN=$(awslocal sqs get-queue-attributes --queue-url http://localhost:4566/000000000000/inventory-updates --attribute-names QueueArn --query "Attributes.QueueArn" --output text)

awslocal sns subscribe \
    --topic-arn $TOPIC_ARN \
    --protocol sqs \
    --notification-endpoint $QUEUE_ARN

echo "LocalStack initialization complete"
        </code></pre>
        <p>Script runs automatically when LocalStack starts</p>
    </section>

    <section>
        <h3>Spring Boot LocalStack Configuration</h3>
        <pre><code class="language-yaml" data-trim>
# application-local.yml
aws:
  endpoint: http://localhost:4566
  region: us-east-1
  credentials:
    access-key: test
    secret-key: test

cloud:
  aws:
    endpoint: ${aws.endpoint}
    region:
      static: ${aws.region}
    credentials:
      access-key: ${aws.credentials.access-key}
      secret-key: ${aws.credentials.secret-key}
    stack:
      auto: false

inventory:
  s3:
    bucket-name: inventory-bucket
  sqs:
    queue-url: http://localhost:4566/000000000000/inventory-updates
        </code></pre>
    </section>
</section>
```

---

### S3 Operations

Complete S3 examples with LocalStack.

```html
<section>
    <h3>S3 Service with LocalStack</h3>
    <div class="small-code">
    <pre><code class="language-java" data-trim>
package com.example.inventory;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.io.InputStream;

@Service
public class InventoryS3Service {

    private final S3Client s3Client;
    private final String bucketName;

    public InventoryS3Service(S3Client s3Client,
                             @Value("${inventory.s3.bucket-name}") String bucketName) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
    }

    public void uploadInventory(String storeId, String content) {
        String key = String.format("inventory/%s/current.tsv", storeId);

        PutObjectRequest request = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .contentType("text/tab-separated-values")
            .build();

        s3Client.putObject(request, RequestBody.fromString(content));
    }

    public String downloadInventory(String storeId) {
        String key = String.format("inventory/%s/current.tsv", storeId);

        GetObjectRequest request = GetObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .build();

        try (InputStream stream = s3Client.getObject(request)) {
            return new String(stream.readAllBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to download inventory", e);
        }
    }

    public boolean inventoryExists(String storeId) {
        String key = String.format("inventory/%s/current.tsv", storeId);

        try {
            HeadObjectRequest request = HeadObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

            s3Client.headObject(request);
            return true;
        } catch (NoSuchKeyException e) {
            return false;
        }
    }
}
    </code></pre>
    </div>
</section>
```

**Testing with LocalStack:**

```html
<section>
    <h3>Testing S3 Service</h3>
    <pre><code class="language-java" data-trim>
@SpringBootTest
@Testcontainers
class InventoryS3ServiceTest {

    @Container
    static LocalStackContainer localstack =
        new LocalStackContainer(DockerImageName.parse("localstack/localstack:latest"))
            .withServices(LocalStackContainer.Service.S3);

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("aws.endpoint",
            () -&gt; localstack.getEndpointOverride(LocalStackContainer.Service.S3));
        registry.add("inventory.s3.bucket-name", () -&gt; "test-bucket");
    }

    @Autowired
    private InventoryS3Service s3Service;

    @Autowired
    private S3Client s3Client;

    @BeforeEach
    void setUp() {
        // Create bucket for tests
        s3Client.createBucket(b -&gt; b.bucket("test-bucket"));
    }

    @Test
    void shouldUploadAndDownloadInventory() {
        // Given
        String storeId = "store-001";
        String content = "SKU\tName\tPrice\n12345\tItem\t9.99";

        // When
        s3Service.uploadInventory(storeId, content);
        String downloaded = s3Service.downloadInventory(storeId);

        // Then
        assertThat(downloaded).isEqualTo(content);
    }
}
    </code></pre>
</section>
```

---

### SQS Messaging

Complete SQS producer and consumer pattern.

```html
<section class="compact-slide">
    <h3>SQS Message Producer</h3>
    <pre><code class="language-java" data-trim>
@Service
public class InventoryEventPublisher {

    private final SqsClient sqsClient;
    private final String queueUrl;
    private final ObjectMapper objectMapper;

    public InventoryEventPublisher(SqsClient sqsClient,
                                  @Value("${inventory.sqs.queue-url}") String queueUrl,
                                  ObjectMapper objectMapper) {
        this.sqsClient = sqsClient;
        this.queueUrl = queueUrl;
        this.objectMapper = objectMapper;
    }

    public void publishInventoryUpdate(InventoryEvent event) {
        try {
            String messageBody = objectMapper.writeValueAsString(event);

            SendMessageRequest request = SendMessageRequest.builder()
                .queueUrl(queueUrl)
                .messageBody(messageBody)
                .messageAttributes(Map.of(
                    "eventType", MessageAttributeValue.builder()
                        .dataType("String")
                        .stringValue(event.getType())
                        .build(),
                    "storeId", MessageAttributeValue.builder()
                        .dataType("String")
                        .stringValue(event.getStoreId())
                        .build()
                ))
                .build();

            SendMessageResponse response = sqsClient.sendMessage(request);
            log.info("Published event with message ID: {}", response.messageId());

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize event", e);
        }
    }
}
    </code></pre>
</section>
```

---

## Testing Patterns

### Repository Testing

Complete repository test pattern.

```html
<section>
    <h3>Repository Testing Pattern</h3>
    <pre><code class="language-java" data-trim>
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Testcontainers
class ProductRepositoryTest {

    @Container
    static PostgreSQLContainer&lt;?&gt; postgres =
        new PostgreSQLContainer&lt;&gt;("postgres:15");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void shouldFindProductsBySku() {
        // Given
        Product p1 = entityManager.persist(new Product("SKU-001", "Item 1", 10.0));
        Product p2 = entityManager.persist(new Product("SKU-002", "Item 2", 20.0));
        entityManager.flush();

        // When
        Optional&lt;Product&gt; found = productRepository.findBySku("SKU-001");

        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Item 1");
    }

    @Test
    void shouldFindProductsByPriceRange() {
        // Given
        entityManager.persist(new Product("SKU-001", "Cheap", 5.0));
        entityManager.persist(new Product("SKU-002", "Medium", 15.0));
        entityManager.persist(new Product("SKU-003", "Expensive", 50.0));
        entityManager.flush();

        // When
        List&lt;Product&gt; products = productRepository.findByPriceBetween(10.0, 30.0);

        // Then
        assertThat(products).hasSize(1);
        assertThat(products.get(0).getName()).isEqualTo("Medium");
    }
}
    </code></pre>
</section>
```

---

### Service Testing with Mocks

Complete service layer test with Mockito.

```html
<section>
    <h3>Service Layer Test Pattern</h3>
    <pre><code class="language-java" data-trim>
@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private InventoryS3Service s3Service;

    @Mock
    private InventoryEventPublisher eventPublisher;

    @InjectMocks
    private InventoryService inventoryService;

    @Test
    void shouldProcessInventoryUpdate() {
        // Given
        String storeId = "store-001";
        String content = "SKU\tName\tPrice\n12345\tItem\t9.99";

        Product product = new Product("12345", "Item", 9.99);
        when(s3Service.downloadInventory(storeId)).thenReturn(content);
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // When
        inventoryService.processInventoryUpdate(storeId);

        // Then
        verify(s3Service).downloadInventory(storeId);
        verify(productRepository).save(argThat(p -&gt;
            p.getSku().equals("12345") &amp;&amp;
            p.getName().equals("Item") &amp;&amp;
            p.getPrice() == 9.99
        ));
        verify(eventPublisher).publishInventoryUpdate(any(InventoryEvent.class));
    }

    @Test
    void shouldHandleS3DownloadFailure() {
        // Given
        String storeId = "store-001";
        when(s3Service.downloadInventory(storeId))
            .thenThrow(new RuntimeException("S3 error"));

        // When &amp; Then
        assertThatThrownBy(() -&gt; inventoryService.processInventoryUpdate(storeId))
            .isInstanceOf(InventoryProcessingException.class)
            .hasMessageContaining("Failed to download inventory");

        verify(productRepository, never()).save(any());
        verify(eventPublisher, never()).publishInventoryUpdate(any());
    }
}
    </code></pre>
</section>
```

---

## Configuration Patterns

### Application Properties

Complete Spring Boot configuration example.

```html
<section class="compact-slide">
    <h3>Complete Application Configuration</h3>
    <pre><code class="language-yaml" data-trim>
# application.yml
spring:
  application:
    name: inventory-service

  datasource:
    url: ${DATABASE_URL:jdbc:postgresql://localhost:5432/inventory}
    username: ${DATABASE_USER:postgres}
    password: ${DATABASE_PASSWORD:postgres}
    hikari:
      maximum-pool-size: 10
      minimum-idle: 2
      connection-timeout: 30000

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        format_sql: true
        jdbc:
          batch_size: 20

aws:
  endpoint: ${AWS_ENDPOINT:}
  region: ${AWS_REGION:us-east-1}
  credentials:
    access-key: ${AWS_ACCESS_KEY:}
    secret-key: ${AWS_SECRET_KEY:}

inventory:
  s3:
    bucket-name: ${INVENTORY_BUCKET:inventory-prod}
  sqs:
    queue-url: ${INVENTORY_QUEUE_URL:}
  processing:
    batch-size: 100
    max-retries: 3

logging:
  level:
    com.example.inventory: INFO
    org.springframework.web: INFO
    org.hibernate.SQL: DEBUG
    </code></pre>
</section>
```

---

## Quick Reference

### Pattern Selection Guide

| Need | Pattern |
|------|---------|
| Local database | PostgreSQL with Docker Compose |
| Integration tests | Testcontainers + @SpringBootTest |
| Repository tests | @DataJpaTest + Testcontainers |
| Controller tests | @WebMvcTest + MockMvc |
| Service tests | @ExtendWith(MockitoExtension) + @Mock |
| AWS testing | LocalStack + Testcontainers |
| Multi-service | Docker Compose multi-container |
| Test configuration | @DynamicPropertySource |

---

## Related Documentation

- [Slide Templates](SLIDE_TEMPLATES.md) - **Copy-paste slide patterns**
- [Content Creation Guide](CONTENT_CREATION.md) - **How to structure content**
- [Styling Guide](STYLING_GUIDE.md) - **Visual formatting**
- [Reveal.js Reference](REVEALJS_REFERENCE.md) - **Framework features**
- [SKILL.md](../SKILL.md) - **Main navigation hub**
