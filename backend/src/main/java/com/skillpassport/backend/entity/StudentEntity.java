package com.skillpassport.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class StudentEntity {

    @Id
    private String id;

    @Column(unique = true, nullable = false)
    private String usn;

    private String name;
    private Double cgpa;
    private String department;
    private Integer proofScore;
    private String status; // VERIFIED, PENDING
    private Integer commitsCount;

    public StudentEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsn() { return usn; }
    public void setUsn(String usn) { this.usn = usn; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Integer getProofScore() { return proofScore; }
    public void setProofScore(Integer proofScore) { this.proofScore = proofScore; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getCommitsCount() { return commitsCount; }
    public void setCommitsCount(Integer commitsCount) { this.commitsCount = commitsCount; }
}
