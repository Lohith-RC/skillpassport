package com.skillpassport.backend.config;

import com.skillpassport.backend.entity.MilestoneEntity;
import com.skillpassport.backend.entity.RepositoryEntity;
import com.skillpassport.backend.entity.StudentEntity;
import com.skillpassport.backend.entity.User;
import com.skillpassport.backend.entity.UserRole;
import com.skillpassport.backend.repository.MilestoneRepository;
import com.skillpassport.backend.repository.RepositoryItemRepository;
import com.skillpassport.backend.repository.StudentRepository;
import com.skillpassport.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RepositoryItemRepository repositoryItemRepository;
    private final MilestoneRepository milestoneRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           RepositoryItemRepository repositoryItemRepository,
                           MilestoneRepository milestoneRepository,
                           StudentRepository studentRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.repositoryItemRepository = repositoryItemRepository;
        this.milestoneRepository = milestoneRepository;
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedRepositories();
        seedMilestones();
        seedStudents();
    }

    private void seedUsers() {
        System.out.println("[DataInitializer] Seeding demo users (demo-only credentials, NOT for production)");

        if (!userRepository.existsByEmail("demo@skillpassport.ai")) {
            User demoUser = new User("demo@skillpassport.ai", passwordEncoder.encode("DemoPass!2026"), "Rahul Sharma", UserRole.STUDENT, "1VT22CS084");
            demoUser.setProofScore(88);
            userRepository.save(demoUser);
        }

        if (!userRepository.existsByEmail("recruiter@skillpassport.ai")) {
            User recruiterUser = new User("recruiter@skillpassport.ai", passwordEncoder.encode("DemoPass!2026"), "Priya Patel", UserRole.RECRUITER, "REC001");
            recruiterUser.setProofScore(92);
            userRepository.save(recruiterUser);
        }

        String[][] freshUsers = {
            {"ananya@skillpassport.ai", "Ananya Gupta", "STUDENT", "1VT22AI012", "96"},
            {"kavya@skillpassport.ai", "Kavya Nair", "STUDENT", "1VT22CS145", "94"},
            {"neha@skillpassport.ai", "Neha Deshmukh", "STUDENT", "1VT22AI055", "93"},
            {"aditya@skillpassport.ai", "Aditya Verma", "STUDENT", "1VT22CS008", "90"},
            {"divya@skillpassport.ai", "Divya Iyer", "STUDENT", "1VT22CS199", "89"},
            {"meera@skillpassport.ai", "Meera Krishnan", "STUDENT", "1VT22IS110", "87"},
            {"vikram@skillpassport.ai", "Vikram Malhotra", "STUDENT", "1VT22CS210", "85"},
            {"rohan@skillpassport.ai", "Rohan Joshi", "STUDENT", "1VT22IS089", "82"},
            {"karthik@skillpassport.ai", "Karthik Rao", "STUDENT", "1VT22EC102", "80"},
            {"arjun@skillpassport.ai", "Arjun Mehta", "STUDENT", "1VT22IS042", "79"},
            {"sneha@skillpassport.ai", "Sneha Reddy", "STUDENT", "1VT22EC018", "76"},
            {"tanvi@skillpassport.ai", "Tanvi Saxena", "STUDENT", "1VT22EC064", "75"},
            {"siddharth@skillpassport.ai", "Siddharth Roy", "STUDENT", "1VT22CS304", "72"}
        };

        for (String[] u : freshUsers) {
            if (!userRepository.existsByEmail(u[0])) {
                User user = new User(u[0], passwordEncoder.encode("DemoPass!2026"), u[1], UserRole.valueOf(u[2]), u[3]);
                user.setProofScore(Integer.parseInt(u[4]));
                userRepository.save(user);
            }
        }
    }

    private void seedRepositories() {
        if (repositoryItemRepository.count() == 0) {
            RepositoryEntity r1 = new RepositoryEntity();
            r1.setId("repo_1");
            r1.setName("skillpassport-identity-engine");
            r1.setFullName("github.com/rahulsharma/skillpassport-core");
            r1.setPlatform("github");
            r1.setDescription("Next.js 14 WebGL operating system providing zero-knowledge cryptographic proof verification for developer identity.");
            r1.setStars(184);
            r1.setForks(42);
            r1.setCommitsCount(284);
            r1.setStatus("LIVE");
            r1.setTags("Next.js 14,TypeScript,Three.js,Tailwind,Zod");
            r1.setLiveUrl("https://skillpassport.ai");
            r1.setArchitectureDetails("Micro-frontend architecture powered by Zustand state tree and WebGL Three.js canvas.");
            repositoryItemRepository.save(r1);

            RepositoryEntity r2 = new RepositoryEntity();
            r2.setId("repo_2");
            r2.setName("distributed-raft-consensus");
            r2.setFullName("gitlab.com/rahul_dev/raft-go");
            r2.setPlatform("gitlab");
            r2.setDescription("High-throughput fault-tolerant distributed consensus algorithm engine written in Go with Docker Swarm orchestration.");
            r2.setStars(96);
            r2.setForks(18);
            r2.setCommitsCount(168);
            r2.setMrsCount(42);
            r2.setBuildTime("38s");
            r2.setStatus("PASSED");
            r2.setTags("Golang 1.22,Docker,gRPC,GitLab Runner");
            r2.setLiveUrl("https://gitlab.com/rahul_dev/raft-go");
            r2.setArchitectureDetails("Leader election and log replication with persistent WAL logging and gRPC transport.");
            repositoryItemRepository.save(r2);

            RepositoryEntity r3 = new RepositoryEntity();
            r3.setId("repo_3");
            r3.setName("enterprise-payment-gateway");
            r3.setFullName("bitbucket.org/rahul_bb/payments-spring");
            r3.setPlatform("bitbucket");
            r3.setDescription("PCI-DSS compliant multi-currency payment orchestration engine built with Java Spring Boot 3 and Redis cache.");
            r3.setStars(124);
            r3.setForks(31);
            r3.setCommitsCount(312);
            r3.setStatus("PASSED");
            r3.setTags("Java 17,Spring Boot 3,PostgreSQL,Redis,Kafka");
            r3.setLiveUrl("https://bitbucket.org/rahul_bb/payments-spring");
            r3.setArchitectureDetails("Event-driven saga pattern with Kafka event bus and Spring Data JPA persistence.");
            repositoryItemRepository.save(r3);
        }
    }

    private void seedMilestones() {
        if (milestoneRepository.count() == 0) {
            MilestoneEntity m1 = new MilestoneEntity();
            m1.setId("m_1");
            m1.setYear("2023");
            m1.setTitle("First Repository & Open Source Commit");
            m1.setCategory("REPO");
            m1.setDescription("Initialized skillpassport-core engine on GitHub with automated Jest test suite.");
            m1.setProofBadge("GitHub Verified");
            m1.setShaSeal("SHA-256: 8f92a1c4b78912e...e45a901");
            m1.setIcon("fa-brands fa-github");
            m1.setColor("#10B981");
            milestoneRepository.save(m1);

            MilestoneEntity m2 = new MilestoneEntity();
            m2.setId("m_2");
            m2.setYear("2024");
            m2.setTitle("First Production Deployment");
            m2.setCategory("DEPLOYMENT");
            m2.setDescription("Shipped high-throughput payment microservice gateway using Spring Boot 3 & Redis.");
            m2.setProofBadge("PASSED 🟢 (38s Build)");
            m2.setShaSeal("SHA-256: c412a89b9018f92...a9018f9");
            m2.setIcon("fa-solid fa-cloud-arrow-up");
            m2.setColor("#2563EB");
            milestoneRepository.save(m2);

            MilestoneEntity m3 = new MilestoneEntity();
            m3.setId("m_3");
            m3.setYear("2025");
            m3.setTitle("LeetCode 1,942 Knight Rating Achieved");
            m3.setCategory("CONTEST");
            m3.setDescription("Ranked in the top 3.8% globally across 98 algorithmic competition rounds.");
            m3.setProofBadge("Knight Badge (Top 3.8%)");
            m3.setShaSeal("SHA-256: 78912e45a9018f9...2a1c4b7");
            m3.setIcon("fa-solid fa-trophy");
            m3.setColor("#F59E0B");
            milestoneRepository.save(m3);

            MilestoneEntity m4 = new MilestoneEntity();
            m4.setId("m_4");
            m4.setYear("2026");
            m4.setTitle("Academic Registrar CGPA Verification Seal");
            m4.setCategory("ACADEMIC");
            m4.setDescription("Official digital degree transcript seal verified with 9.42 CGPA in Computer Science.");
            m4.setProofBadge("VTU Registrar Signed");
            m4.setShaSeal("SHA-256: a12e459018f92a1...c4b7891");
            m4.setIcon("fa-solid fa-graduation-cap");
            m4.setColor("#7C3AED");
            milestoneRepository.save(m4);
        }
    }

    private void seedStudents() {
        if (studentRepository.count() < 15) {
            Object[][] freshStudents = {
                {"s_1", "1VT22CS084", "Rahul Sharma", 9.42, "Computer Science", 88, "VERIFIED", 840},
                {"s_2", "1VT22CS102", "Priya Patel", 9.18, "Computer Science", 84, "VERIFIED", 620},
                {"s_3", "1VT22IS042", "Arjun Mehta", 8.86, "Information Science", 79, "VERIFIED", 450},
                {"s_4", "1VT22EC018", "Sneha Reddy", 9.05, "Electronics", 76, "VERIFIED", 310},
                {"s_5", "1VT22AI012", "Ananya Gupta", 9.60, "AI & Data Science", 96, "VERIFIED", 1340},
                {"s_6", "1VT22CS145", "Kavya Nair", 9.55, "Computer Science", 94, "VERIFIED", 1120},
                {"s_7", "1VT22AI055", "Neha Deshmukh", 9.48, "AI & Machine Learning", 93, "VERIFIED", 1080},
                {"s_8", "1VT22CS008", "Aditya Verma", 9.38, "Computer Science", 90, "VERIFIED", 950},
                {"s_9", "1VT22CS199", "Divya Iyer", 9.30, "Computer Science", 89, "VERIFIED", 890},
                {"s_10", "1VT22IS110", "Meera Krishnan", 9.25, "Information Science", 87, "VERIFIED", 710},
                {"s_11", "1VT22CS210", "Vikram Malhotra", 9.12, "Computer Science", 85, "VERIFIED", 780},
                {"s_12", "1VT22IS089", "Rohan Joshi", 8.92, "Information Science", 82, "VERIFIED", 590},
                {"s_13", "1VT22EC102", "Karthik Rao", 8.95, "Electronics", 80, "VERIFIED", 520},
                {"s_14", "1VT22EC064", "Tanvi Saxena", 8.75, "Electronics", 75, "VERIFIED", 380},
                {"s_15", "1VT22CS304", "Siddharth Roy", 8.65, "Computer Science", 72, "PENDING", 290}
            };

            for (Object[] s : freshStudents) {
                StudentEntity student = new StudentEntity();
                student.setId((String) s[0]);
                student.setUsn((String) s[1]);
                student.setName((String) s[2]);
                student.setCgpa((Double) s[3]);
                student.setDepartment((String) s[4]);
                student.setProofScore((Integer) s[5]);
                student.setStatus((String) s[6]);
                student.setCommitsCount((Integer) s[7]);
                studentRepository.save(student);
            }
        }
    }
}
