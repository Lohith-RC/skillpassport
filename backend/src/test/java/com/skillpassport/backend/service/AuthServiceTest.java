package com.skillpassport.backend.service;

import com.skillpassport.backend.dto.AuthRequest;
import com.skillpassport.backend.dto.AuthResponse;
import com.skillpassport.backend.dto.RegisterRequest;
import com.skillpassport.backend.entity.User;
import com.skillpassport.backend.entity.UserRole;
import com.skillpassport.backend.repository.UserRepository;
import com.skillpassport.backend.security.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtils jwtUtils;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(userRepository, new BCryptPasswordEncoder(), jwtUtils);
    }

    private RegisterRequest registerRequest(String email, UserRole role) {
        RegisterRequest req = new RegisterRequest();
        req.setName("Test User");
        req.setEmail(email);
        req.setPassword("Password@123");
        req.setRole(role);
        req.setUsn("1VT22CS000");
        return req;
    }

    @Test
    void register_acceptsDeveloperRole() {
        when(userRepository.existsByEmail("dev@test.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(jwtUtils.generateJwtToken(anyString())).thenReturn("test-jwt");

        AuthResponse response = authService.register(registerRequest("dev@test.com", UserRole.DEVELOPER));

        assertEquals("DEVELOPER", response.getRole());
        assertEquals("test-jwt", response.getToken());
        assertEquals("Test User", response.getName());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_acceptsEveryPersonaOfferedByTheSignupUi() {
        // Mirrors the four roles selectable in the signup form: developer,
        // company, university, investor (plus the default student).
        for (UserRole role : new UserRole[]{
                UserRole.STUDENT, UserRole.DEVELOPER, UserRole.COMPANY,
                UserRole.UNIVERSITY, UserRole.INVESTOR}) {
            String email = role.name().toLowerCase() + "@test.com";
            when(userRepository.existsByEmail(email)).thenReturn(false);
            when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
            when(jwtUtils.generateJwtToken(anyString())).thenReturn("test-jwt");

            AuthResponse response = authService.register(registerRequest(email, role));

            assertEquals(role.name(), response.getRole());
        }
    }

    @Test
    void register_rejectsPrivilegedRoles() {
        assertThrows(IllegalArgumentException.class,
                () -> authService.register(registerRequest("recruiter@test.com", UserRole.RECRUITER)));
        assertThrows(IllegalArgumentException.class,
                () -> authService.register(registerRequest("registrar@test.com", UserRole.REGISTRAR)));
        verify(userRepository, never()).save(any());
    }

    @Test
    void register_rejectsDuplicateEmail() {
        when(userRepository.existsByEmail("dup@test.com")).thenReturn(true);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> authService.register(registerRequest("DUP@test.com", UserRole.DEVELOPER)));

        assertTrue(ex.getMessage().contains("already registered"));
        verify(userRepository, never()).save(any());
    }

    @Test
    void login_rejectsInvalidCredentials() {
        when(userRepository.findByEmail("ghost@test.com")).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> authService.login(new AuthRequest("ghost@test.com", "wrong-pass")));

        assertEquals("Invalid email or password.", ex.getMessage());
    }

    @Test
    void login_succeedsWithValidCredentials() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = new User("demo@test.com", encoder.encode("Password@123"), "Demo User", UserRole.DEVELOPER, "1VT22CS084");
        when(userRepository.findByEmail("demo@test.com")).thenReturn(Optional.of(user));
        when(jwtUtils.generateJwtToken("demo@test.com")).thenReturn("test-jwt");

        // Emails are normalized (trimmed + lowercased) before lookup.
        AuthResponse response = authService.login(new AuthRequest(" Demo@Test.com ", "Password@123"));

        assertEquals("test-jwt", response.getToken());
        assertEquals("Demo User", response.getName());
        assertEquals("DEVELOPER", response.getRole());
    }

    @Test
    void login_locksAccountAfterRepeatedFailures() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        for (int i = 0; i < 10; i++) {
            IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                    () -> authService.login(new AuthRequest("locked@test.com", "bad-pass")));
            assertEquals("Invalid email or password.", ex.getMessage());
        }

        // The 11th attempt inside the 15-minute lockout window is refused outright.
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> authService.login(new AuthRequest("locked@test.com", "bad-pass")));
        assertTrue(ex.getMessage().contains("Too many failed attempts"));
    }

    @Test
    void login_resetsFailureCounterOnSuccess() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = new User("ok@test.com", encoder.encode("Password@123"), "OK User", UserRole.DEVELOPER, "");

        // 5 failed attempts first.
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        for (int i = 0; i < 5; i++) {
            assertThrows(IllegalArgumentException.class,
                    () -> authService.login(new AuthRequest("ok@test.com", "bad-pass")));
        }

        // A successful login clears the failure counter.
        when(userRepository.findByEmail("ok@test.com")).thenReturn(Optional.of(user));
        when(jwtUtils.generateJwtToken("ok@test.com")).thenReturn("test-jwt");
        AuthResponse response = authService.login(new AuthRequest("ok@test.com", "Password@123"));
        assertEquals("test-jwt", response.getToken());

        // 9 fresh failures afterwards: the 10th attempt is STILL only an
        // invalid-credentials error. Had the counter not been reset, attempt
        // #10 would already have hit the lockout (5 + 10 >= MAX_LOGIN_ATTEMPTS).
        when(userRepository.findByEmail("ok@test.com")).thenReturn(Optional.empty());
        for (int i = 0; i < 9; i++) {
            IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                    () -> authService.login(new AuthRequest("ok@test.com", "bad-pass")));
            assertEquals("Invalid email or password.", ex.getMessage());
        }
        IllegalArgumentException tenth = assertThrows(IllegalArgumentException.class,
                () -> authService.login(new AuthRequest("ok@test.com", "bad-pass")));
        assertEquals("Invalid email or password.", tenth.getMessage());

        // The 11th attempt crosses the limit and is refused outright.
        IllegalArgumentException eleventh = assertThrows(IllegalArgumentException.class,
                () -> authService.login(new AuthRequest("ok@test.com", "bad-pass")));
        assertTrue(eleventh.getMessage().contains("Too many failed attempts"));
    }
}
