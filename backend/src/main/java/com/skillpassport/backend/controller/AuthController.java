package com.skillpassport.backend.controller;

import com.skillpassport.backend.dto.AuthRequest;
import com.skillpassport.backend.dto.AuthResponse;
import com.skillpassport.backend.dto.MessageResponse;
import com.skillpassport.backend.dto.RegisterRequest;
import com.skillpassport.backend.entity.User;
import com.skillpassport.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        // Domain errors (duplicate email, disallowed role) surface as 400 via IllegalArgumentException;
        // genuine server faults are handled by GlobalExceptionHandler as 500.
        AuthResponse response = authService.register(registerRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest authRequest) {
        AuthResponse response = authService.login(authRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(new MessageResponse("Unauthorized request"));
        }
        AuthResponse response = authService.getCurrentUser(currentUser.getEmail());
        return ResponseEntity.ok(response);
    }
}