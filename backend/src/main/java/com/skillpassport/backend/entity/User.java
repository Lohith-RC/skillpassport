package com.skillpassport.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false)
    private UserRole role = UserRole.STUDENT;

    private String usn;

    private Integer proofScore = 0;

    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    public User(String email, String password, String name, UserRole role, String usn) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.usn = usn;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @JsonIgnore
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public String getUsn() { return usn; }
    public void setUsn(String usn) { this.usn = usn; }

    public Integer getProofScore() { return proofScore; }
    public void setProofScore(Integer proofScore) { this.proofScore = proofScore; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
