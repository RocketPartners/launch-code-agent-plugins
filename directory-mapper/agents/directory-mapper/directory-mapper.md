---
name: directory-mapper
description: Generate AI-agent-friendly directory maps by scanning and analyzing project folders. Use this skill when the user asks to map, analyze, or understand directory structures, create codebase overviews, or generate project documentation.
---

# Directory Mapper Skill

This skill helps you generate comprehensive directory maps that analyze project structures, detect technologies, frameworks, and provide context-rich descriptions for each folder.

## When to Use This Skill

Use this skill when the user requests:
- "Generate a directory map for [path]"
- "Map the project structure"
- "Analyze the codebase organization"
- "Create an overview of the directories"
- "Help me understand this project's structure"

## Instructions

### Step 1: Validate the Root Path

First, verify the target directory exists and is accessible:
```bash
ls -la [root_path]
```

### Step 2: Scan Top-Level Directories

Get all immediate subdirectories, excluding ignored patterns:
```bash
ls -d [root_path]/*/ 2>/dev/null | grep -v -E '(node_modules|\.git|build|dist|target|\.gradle|\.idea|\.vscode|coverage|\.next|__pycache__|venv)'
```

### Step 3: Analyze Each Directory

For each directory found, perform comprehensive analysis:

#### 3.1 Project Type Detection

Check for configuration files:
- `package.json` → Node.js/JavaScript project
- `pom.xml` → Maven-based Java project
- `build.gradle` or `build.gradle.kts` → Gradle-based project
- `requirements.txt` or `setup.py` → Python project
- `Cargo.toml` → Rust project
- `go.mod` → Go project

#### 3.2 Framework Detection

Read configuration files and check for:

**Node.js projects (package.json):**
- React: Check dependencies for `react`, `react-dom`
- Next.js: Check for `next`
- Express: Check for `express`
- Vue.js: Check for `vue`
- Angular: Check for `angular`, `@angular/core`
- NestJS: Check for `@nestjs/core`

**Java projects (pom.xml or build.gradle):**
- Spring Boot: Look for `spring-boot-starter`
- Spring Cloud: Look for `spring-cloud`
- Quarkus: Look for `quarkus`

**Python projects:**
- Django: Look for `django` in requirements.txt
- Flask: Look for `flask`
- FastAPI: Look for `fastapi`

#### 3.3 Technology Stack Analysis

Count and identify file types:
```bash
# Count Java files
find [folder_path] -maxdepth 2 -name "*.java" 2>/dev/null | wc -l

# Count TypeScript files
find [folder_path] -maxdepth 2 -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l

# Count JavaScript files
find [folder_path] -maxdepth 2 -name "*.js" -o -name "*.jsx" 2>/dev/null | wc -l

# Count Python files
find [folder_path] -maxdepth 2 -name "*.py" 2>/dev/null | wc -l
```

#### 3.4 Purpose Detection from Folder Name

Analyze the folder name for hints:
- Contains `test` → testing and test suites
- Contains `config` → configuration management
- Contains `doc` → documentation
- Contains `script` → automation scripts
- Contains `util` or `helper` → utility and helper functions
- Contains `service` → backend service
- Contains `api` → API endpoints
- Contains `db` or `database` → database management
- Contains `portal` or `dashboard` → web portal/dashboard interface

#### 3.5 Docker/Container Analysis

Check for containerization:
- `Dockerfile` → Note containerization type (Node.js, Java, Python)
- `docker-compose.yml` → Count services, detect databases (postgres, mysql, mongodb, redis)

#### 3.6 Source Code Pattern Detection

For Java files, grep for Spring annotations:
```bash
grep -h "@RestController\|@Controller\|@Service\|@Repository\|@Entity" [folder_path]/*.java 2>/dev/null
```

For TypeScript/JavaScript, look for React patterns:
```bash
grep -h "useState\|useEffect\|React.Component" [folder_path]/src/**/*.{ts,tsx,js,jsx} 2>/dev/null
```

#### 3.7 README Analysis

If README.md exists, extract the first meaningful paragraph for context.

### Step 4: Generate Markdown Output

Create a `DIRECTORY_MAP.md` file in the root path with this structure:

```markdown
# Directory Map

**Generated:** [ISO timestamp]

**Root Path:** `[root_path]`

This map provides detailed descriptions of each top-level directory to help AI agents understand the codebase structure and navigate effectively.

---

### `[folder-name]`

[Project type]. Purpose: [purpose]. Frameworks: [frameworks]. Technologies: [technologies]. Structure includes: [patterns found]. Key files: [important files]. [Additional context]. Contains [N] files and [M] subdirectories

---
```

## Patterns to Ignore

Always exclude these patterns:
- `node_modules`, `.git`, `build`, `dist`, `target`, `out`
- `.gradle`, `.idea`, `.vscode`, `.eclipse`
- `coverage`, `.next`, `.nuxt`, `.cache`
- `__pycache__`, `venv`, `.venv`, `env`
- `.DS_Store`, `*.log`, `*.class`, `*.jar`, `*.war`

## Output Format

The description for each folder should be a single paragraph containing:
1. Project type (if detectable)
2. Purpose (from folder name or README)
3. Frameworks detected
4. Technologies and languages (with file counts)
5. Architectural patterns found (controllers, services, components, etc.)
6. Key configuration files
7. Additional context from README or package.json description
8. File and subdirectory counts

## Example Usage Flow

1. User asks: "Generate a directory map for ~/projects/my-app"
2. Use Bash to list subdirectories
3. For each subdirectory:
   - Use Read to examine package.json, pom.xml, README.md
   - Use Glob to find file patterns (*.java, *.ts, etc.)
   - Use Grep to search for framework patterns
4. Compile all information into descriptions
5. Use Write to create DIRECTORY_MAP.md in the root path
6. Return success message with path to generated file

## Important Notes

- Only scan the **immediate subdirectories** (one level deep)
- Keep descriptions concise but informative (2-4 sentences)
- Focus on facts observable from files, not assumptions
- If a folder is empty or contains only ignored files, note that briefly
- Always use absolute paths when reading/writing files