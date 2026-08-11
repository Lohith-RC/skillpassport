# ☕ SkillPassport AI — Java Spring Boot 3 Backend Service

A Stage-1 REST API backend providing JWT authentication, user registration, role validation, candidate student query APIs, and verified repository & milestone endpoints.

---

## 🛠️ Stack & Dependencies

* **Framework:** Spring Boot 3.2.3
* **Java Version:** Java 17
* **Security:** Spring Security, JJWT (`io.jsonwebtoken`)
* **Persistence:** Spring Data JPA, Hibernate, H2 In-Memory Database / PostgreSQL driver
* **Validation:** Jakarta Bean Validation (`@Valid`, `@NotBlank`, `@Email`)

---

## ⚙️ Configuration & Environment Variables

Key configuration options in `src/main/resources/application.properties`:

| Property | Environment Variable Fallback | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `app.jwt.secret` | `JWT_SECRET` | `9a4f2c8d7e...` | Secret key for signing and verifying JWT tokens. |
| `spring.h2.console.enabled` | `H2_CONSOLE_ENABLED` | `false` | Disabled by default for security; set `true` for local dev. |
| `app.cors.allowed-origins` | — | `http://localhost:3000,http://localhost:5173` | Configured CORS origin boundaries. |

---

## 🏃 Running the Backend

### Prerequisites:
* Java 17 JDK
* Maven 3.8+

```bash
# Build the project
mvn clean compile

# Run the Spring Boot application on port 8080
mvn spring-boot:run
```

---

## 🔐 Seed Credentials (Demo Development Only)

* **Demo Student:** `demo@skillpassport.ai` / Password: `DemoPass!2026`
* **Demo Recruiter:** `recruiter@skillpassport.ai` / Password: `DemoPass!2026`
