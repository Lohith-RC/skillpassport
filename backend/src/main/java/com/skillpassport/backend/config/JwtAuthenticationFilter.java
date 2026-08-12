package com.skillpassport.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillpassport.backend.entity.User;
import com.skillpassport.backend.repository.UserRepository;
import com.skillpassport.backend.security.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public JwtAuthenticationFilter(JwtUtils jwtUtils, UserRepository userRepository, ObjectMapper objectMapper) {
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String jwt = parseJwt(request);

        if (StringUtils.hasText(jwt)) {
            // A token was presented but is invalid/expired/unknown → hard 401.
            // (Do not silently continue to the "no auth" path: that would hide the real cause.)
            if (!jwtUtils.validateJwtToken(jwt)) {
                writeError(response, HttpServletResponse.SC_UNAUTHORIZED,
                        "Invalid or expired token. Please sign in again.");
                return;
            }

            try {
                String email = jwtUtils.getEmailFromJwtToken(jwt);
                Optional<User> userOptional = userRepository.findByEmail(email);

                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
                    );
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    // Validly signed token for a user that no longer exists.
                    writeError(response, HttpServletResponse.SC_UNAUTHORIZED,
                            "Account not found. Please sign in again.");
                    return;
                }
            } catch (Exception e) {
                logger.error("Cannot set user authentication", e);
                writeError(response, HttpServletResponse.SC_UNAUTHORIZED,
                        "Authentication failed. Please sign in again.");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private void writeError(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(Map.of(
                "status", status,
                "error", status == 401 ? "Unauthorized" : "Forbidden",
                "message", message
        )));
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }
}