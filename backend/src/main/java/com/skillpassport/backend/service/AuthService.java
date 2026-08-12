package com.skillpassport.backend.service;

import com.skillpassport.backend.dto.AuthRequest;
import com.skillpassport.backend.dto.AuthResponse;
import com.skillpassport.backend.dto.RegisterRequest;
import com.skillpassport.backend.entity.User;
import com.skillpassport.backend.entity.UserRole;
import com.skillpassport.backend.repository.UserRepository;
import com.skillpassport.backend.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.EnumSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    /** Personas users may self-register with (mirrors the signup UI).
     *  RECRUITER and REGISTRAR remain admin-provisioned only to prevent
     *  privilege escalation via free-text role assignment. */
    private static final Set<UserRole> SELF_REGISTRABLE_ROLES =
            EnumSet.of(UserRole.STUDENT, UserRole.DEVELOPER, UserRole.COMPANY,
                    UserRole.UNIVERSITY, UserRole.INVESTOR);

    /** Max failed login attempts per email before temporary lockout. */
    private static final int MAX_LOGIN_ATTEMPTS = 10;
    private static final Duration LOCKOUT_WINDOW = Duration.ofMinutes(15);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    /** In-memory, per-email failed-attempt tracker. Replace with Redis in multi-instance deployments. */
    private final Map<String, LoginAttempt> loginAttempts = new ConcurrentHashMap<>();

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public AuthResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.getEmail());

        UserRole role = request.getRole() != null ? request.getRole() : UserRole.STUDENT;
        if (!SELF_REGISTRABLE_ROLES.contains(role)) {
            throw new IllegalArgumentException("Role is not available for self-registration.");
        }

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Error: Email is already registered!");
        }

        User user = new User(
                email,
                passwordEncoder.encode(request.getPassword()),
                request.getName().trim(),
                role,
                request.getUsn() != null ? request.getUsn().trim() : ""
        );

        User savedUser = userRepository.save(user);
        String token = jwtUtils.generateJwtToken(savedUser.getEmail());

        return toAuthResponse(savedUser, token);
    }

    public AuthResponse login(AuthRequest request) {
        String email = normalizeEmail(request.getEmail());

        if (isLockedOut(email)) {
            throw new IllegalArgumentException("Too many failed attempts. Try again in 15 minutes.");
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        boolean passwordMatches = userOpt.isPresent()
                && passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword());

        if (userOpt.isEmpty() || !passwordMatches) {
            recordFailure(email);
            throw new IllegalArgumentException("Invalid email or password.");
        }

        loginAttempts.remove(email);
        User user = userOpt.get();
        String token = jwtUtils.generateJwtToken(user.getEmail());

        return toAuthResponse(user, token);
    }

    public AuthResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(normalizeEmail(email))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        String token = jwtUtils.generateJwtToken(user.getEmail());

        return toAuthResponse(user, token);
    }

    private AuthResponse toAuthResponse(User user, String token) {
        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole().name(),
                user.getUsn(),
                user.getProofScore()
        );
    }

    private String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }

    private boolean isLockedOut(String email) {
        LoginAttempt attempt = loginAttempts.get(email);
        if (attempt == null) {
            return false;
        }
        // Expired entries are pruned here so the in-memory tracker can't grow unbounded
        // (an attacker could otherwise seed unlimited emails via failed logins).
        if (attempt.firstFailure.plus(LOCKOUT_WINDOW).isBefore(Instant.now())) {
            loginAttempts.remove(email, attempt);
            return false;
        }
        return attempt.failures >= MAX_LOGIN_ATTEMPTS;
    }

    private void recordFailure(String email) {
        loginAttempts.compute(email, (key, existing) -> {
            if (existing == null || existing.firstFailure.plus(LOCKOUT_WINDOW).isBefore(Instant.now())) {
                return new LoginAttempt(Instant.now(), 1);
            }
            return new LoginAttempt(existing.firstFailure, existing.failures + 1);
        });
    }

    private record LoginAttempt(Instant firstFailure, int failures) {}
}