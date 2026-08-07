# SkillPassport AI — Technical Architecture & Tech Stack Specification

**Document Version:** 1.0.0  
**Target Audience:** CTO, Principal Architects, Lead Engineers, Technical Due Diligence Teams  
**System Classification:** Enterprise Multitenant Talent & Digital Identity Operating System  
**Status:** Approved Technical Architecture Blueprint  

---

## 1. Executive Summary & Architectural Intent

SkillPassport AI is architected as an **enterprise-grade, microservice-friendly digital identity and skill verification ecosystem**. The system unifies scattered developer artifacts (GitHub repositories, live deployments, challenge submissions, academic records) into a single, tamper-proof, verified **Skill Passport**.

### Key Architectural Mandates
1. **Modular Decoupling**: Frontend (Next.js/Vercel) and Core Business Engine (Java Spring Boot/AWS EC2) are decoupled via an API Gateway pattern.
2. **Polyglot Persistence**: Relational data (PostgreSQL), dynamic unstructured logs (MongoDB), and high-velocity in-memory state (Redis) are matched to domain load patterns.
3. **Evidence-First Verification Engine**: Asynchronous worker pipelines process code repositories, deployment endpoints, and cryptographic sign-offs without blocking core API threads.
4. **Investor-Ready Maturity**: Production-standard CI/CD pipelines, Infrastructure as Code (Terraform), centralized telemetry (Grafana/Prometheus/ELK), and containerized orchestration (Docker/ECS).

---

## 2. Recommended Technology Stack Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    SKILLPASSPORT AI TECH MATRIX                         │
├───────────────────┬─────────────────────────────────────────────────────┤
│ Layer             │ Recommended Technology                              │
├───────────────────┼─────────────────────────────────────────────────────┤
│ Frontend App      │ Next.js 14 (App Router), React 18, TypeScript       │
│ UI Framework      │ Tailwind CSS, shadcn/ui, Lucide React               │
│ 3D & Motion Engine│ Three.js / React Three Fiber (R3F), Framer Motion   │
│ State & Forms     │ Zustand, React Hook Form, Zod Schema Validation     │
│ Core Backend      │ Java 21 LTS, Spring Boot 3.x, Spring Security, JWT  │
│ AI / ML Service   │ Python 3.11, FastAPI (Asynchronous microservice)     │
│ Relational DB     │ PostgreSQL 16 (Amazon RDS Multi-AZ)                 │
│ Document DB       │ MongoDB 7.0 (Atlas / Self-hosted cluster)           │
│ Cache & In-Memory │ Redis Enterprise 7.x (Sessions, Rate Limit, OTP)    │
│ Object Storage    │ AWS S3 (Encrypted Bucket Policy, Presigned URLs)    │
│ Universal Search  │ Elasticsearch / OpenSearch 2.x                      │
│ Telemetry & DevOps│ Docker, Terraform, GitHub Actions, Grafana, ELK     │
└───────────────────┴─────────────────────────────────────────────────────┘
```

---

## 3. Detailed Component Deep-Dive

### 3.1 Frontend Tier (Next.js & WebGL Engine)
- **Framework**: Next.js 14 (React 18 + TypeScript) utilizing server-side rendering (SSR) for public profiles/SEO and client-side hydration (CSR) for interactive dashboards.
- **Styling & UI**: Tailwind CSS for atomic utility styling + `shadcn/ui` for accessible component primitives (Radix UI foundation).
- **3D Graphics Engine**: Three.js integrated via `@react-three/fiber` and `@react-three/drei` for rendering scroll-driven metallic hardware and refractive glass shaders.
- **State Management**: `Zustand` for lightweight, non-boilerplate global user state; `TanStack Query (React Query v5)` for server-state caching and optimistic mutations.

### 3.2 Core Backend Services (Java Spring Boot)
- **Framework**: Java 21 LTS + Spring Boot 3.2.
- **Security Layer**: Spring Security with stateless JWT validation, RBAC (Role-Based Access Control: `DEVELOPER`, `RECRUITER`, `UNIVERSITY`, `ADMIN`), and OAuth 2.0 integration (Google, GitHub, LinkedIn).
- **Real-Time Engine**: Spring WebSocket + STOMP protocol for live candidate activity notifications and recruiter pipeline alerts.

### 3.3 Supporting AI/ML Services (Python FastAPI)
- **Role**: Operates as a stateless microservice dedicated to natural language parsing, code quality analysis, and skill vector embedding generation.
- **Integration**: Communication with Spring Boot core via async REST over internal gRPC or REST endpoints.

### 3.4 Data Tier Architecture
- **PostgreSQL**: Primary transactional database storing core relational entities:
  - Users, Password Hashes, OAuth tokens
  - Verification Seals, Institution Affiliations
  - Job Applications, Recruiter Pipelines
- **MongoDB**: Schema-less document database storing dynamic developer activity:
  - Repository metadata, commit histories, code snapshot hashes
  - Challenge submissions and code evaluation outputs
  - User activity audit logs
- **Redis**: In-memory cache & pub/sub message broker:
  - User session tokens & JWT revocation blacklists
  - API rate-limiting tokens (Leaky Bucket / Token Bucket algorithms)
  - Real-time WebSocket connection state management

---

## 4. End-to-End System Architecture Blueprint

```text
                               ┌─────────────────────────────────────────┐
                               │           Client Web Browsers           │
                               │ Next.js 14 SPA + WebGL Three.js Canvas  │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼  HTTPS / WSS
                               ┌─────────────────────────────────────────┐
                               │       API Gateway / Nginx Reverse Proxy │
                               │        TLS Termination & Rate Limiting  │
                               └────────────────────┬────────────────────┘
                                                    │
    ┌───────────────────────────────────────────────┴───────────────────────────────────────────────┐
    │                                                                                               │
    ▼                                               ▼                                               ▼
┌───────────────────────┐               ┌───────────────────────┐               ┌───────────────────────┐
│ Authentication Service│               │  Skill Passport Core  │               │ Recruitment Service   │
│ Spring Security + JWT │               │ Spring Boot Micro-Svc │               │ Spring Boot Micro-Svc │
└───────────┬───────────┘               └───────────┬───────────┘               └───────────┬───────────┘
            │                                       │                                       │
            └───────────────────┬───────────────────┴───────────────────┬───────────────────┘
                                │                                       │
                                ▼                                       ▼
                    ┌───────────────────────┐               ┌───────────────────────┐
                    │ AI Embedding Engine   │               │ Search & Discovery    │
                    │ Python FastAPI Service│               │ OpenSearch / Elastic  │
                    └───────────┬───────────┘               └───────────┬───────────┘
                                │                                       │
    ┌───────────────────────────┴───────────────────────────────────────┴───────────────────────────┐
    │                                DATA & STORAGE LAYER                                           │
    ├───────────────────────┬───────────────────────┬───────────────────────┬───────────────────────┤
    │ PostgreSQL RDS        │ MongoDB Atlas         │ Redis Cache           │ AWS S3 Storage        │
    │ (Relational Core)     │ (Dynamic Activity)    │ (Sessions & Limits)   │ (Artifacts & Media)   │
    └───────────────────────┴───────────────────────┴───────────────────────┴───────────────────────┘
                                │
                                ▼  External Integrations
                    ┌───────────────────────────────────────┐
                    │ GitHub API • GitLab API • Cloud APIs  │
                    └───────────────────────────────────────┘
```

---

## 5. Security & Compliance Protocol

1. **Authentication & Authorization**: JWT tokens signed with RS256 private key. Short-lived access tokens (15 mins) paired with HTTP-only, secure, SameSite refresh cookies.
2. **Data Encryption**:
   - At Rest: AWS KMS AES-256 encryption across RDS, MongoDB, and S3 buckets.
   - In Transit: TLS 1.3 forced across all API endpoints and reverse proxy nodes.
3. **Input Sanitization**: Strict schema validation using Zod on the frontend and Hibernate Validator + OWASP ESAPI on the backend to prevent SQL Injection and XSS attacks.

---

## 6. Future Technology Roadmap

As SkillPassport AI scales toward enterprise multi-region deployment, the architecture will seamlessly integrate:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SCALABILITY ROADMAP                              │
├─────────────────┬───────────────────────────────────────────────────────┤
│ Event Streaming │ Apache Kafka for high-throughput event processing.    │
├─────────────────┼───────────────────────────────────────────────────────┤
│ Graph Database  │ Neo4j for mapping developer-company-university graphs.│
├─────────────────┼───────────────────────────────────────────────────────┤
│ Vector Database │ Qdrant / Milvus for semantic skill matching vectors.  │
├─────────────────┼───────────────────────────────────────────────────────┤
│ Orchestration   │ Kubernetes (EKS) with Istio Service Mesh.             │
├─────────────────┼───────────────────────────────────────────────────────┤
│ Trust Protocol  │ Cryptographic zk-SNARK / Blockchain Proof of Skill.   │
└─────────────────┴───────────────────────────────────────────────────────┘
```

---

## 7. Pitch-Ready Executive Summary Script

For investor pitch decks and technical Q&A sessions, deliver this concise 30-second technical summary:

> **"We have architected an enterprise-ready platform using Next.js and TypeScript for a high-performance frontend, paired with Java Spring Boot for scalable core microservices and FastAPI for specialized AI processing. Our polyglot data layer uses PostgreSQL for relational integrity, MongoDB for dynamic developer telemetry, and Redis for low-latency caching. Deployed on AWS with containerized Docker infrastructure, the system is built to scale independently across services as customer volume grows."**
