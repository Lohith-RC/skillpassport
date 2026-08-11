package com.skillpassport.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> getRootStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("application", "SkillPassport Spring Boot 3 Backend API");
        status.put("version", "1.0.0");
        status.put("endpoints", Map.of(
            "auth_login", "POST /api/v1/auth/login",
            "auth_register", "POST /api/v1/auth/register",
            "repositories", "GET /api/v1/repositories",
            "milestones", "GET /api/v1/milestones",
            "students", "GET /api/v1/students",
            "h2_console", "GET /h2-console"
        ));
        return ResponseEntity.ok(status);
    }
}
