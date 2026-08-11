package com.skillpassport.backend.dto;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String name;
    private String role;
    private String usn;
    private Integer proofScore;

    public AuthResponse(String token, Long id, String email, String name, String role, String usn, Integer proofScore) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.usn = usn;
        this.proofScore = proofScore;
    }

    public String getToken() { return token; }
    public String getType() { return type; }
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getName() { return name; }
    public String getRole() { return role; }
    public String getUsn() { return usn; }
    public Integer getProofScore() { return proofScore; }
}
