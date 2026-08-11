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

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Error: Email is already registered!");
        }

        UserRole role = request.getRole() != null ? request.getRole() : UserRole.STUDENT;

        User user = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getName(),
                role,
                request.getUsn() != null ? request.getUsn() : ""
        );

        User savedUser = userRepository.save(user);
        String token = jwtUtils.generateJwtToken(savedUser.getEmail());

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getName(),
                savedUser.getRole().name(),
                savedUser.getUsn(),
                savedUser.getProofScore()
        );
    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid email or password.");
        }

        User user = userOpt.get();
        String token = jwtUtils.generateJwtToken(user.getEmail());

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

    public AuthResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtUtils.generateJwtToken(user.getEmail());

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
}
