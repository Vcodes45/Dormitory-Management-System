package com.dormitory.service;

import com.dormitory.dto.LoginRequest;
import com.dormitory.dto.LoginResponse;
import com.dormitory.dto.SignupRequest;
import com.dormitory.entity.User;
import com.dormitory.repository.UserRepository;
import com.dormitory.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public LoginResponse authenticate(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        
        if (userOptional.isEmpty()) {
            return LoginResponse.failure("User not found");
        }
        
        User user = userOptional.get();
        
        if (!user.isEnabled()) {
            return LoginResponse.failure("Account is disabled");
        }
        
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return LoginResponse.failure("Invalid credentials");
        }
        
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        
        return LoginResponse.success(token, user.getUsername(), user.getRole());
    }
    
    public LoginResponse register(LoginRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return LoginResponse.failure("Username already exists");
        }
        
        if (registerRequest.getUsername().trim().isEmpty() || registerRequest.getPassword().trim().isEmpty()) {
            return LoginResponse.failure("Username and password are required");
        }
        
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole("USER"); // Default role for regular users
        user.setEnabled(true);
        
        userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        
        return LoginResponse.success(token, user.getUsername(), user.getRole());
    }

    public LoginResponse registerAdmin(SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return LoginResponse.failure("Username already exists");
        }
        
        if (signupRequest.getUsername().trim().isEmpty() || 
            signupRequest.getPassword().trim().isEmpty() ||
            signupRequest.getOwnerName().trim().isEmpty() ||
            signupRequest.getEmail().trim().isEmpty() ||
            signupRequest.getPhone().trim().isEmpty() ||
            signupRequest.getDormitoryName().trim().isEmpty()) {
            return LoginResponse.failure("All fields are required");
        }
        
        // Validate email format (basic validation)
        if (!signupRequest.getEmail().contains("@")) {
            return LoginResponse.failure("Invalid email format");
        }
        
        // Create admin user
        User adminUser = new User();
        adminUser.setUsername(signupRequest.getUsername());
        adminUser.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        adminUser.setRole("ADMIN"); // Admin role for dormitory owners
        adminUser.setEnabled(true);
        
        // Additional admin-specific fields would be stored in a separate Admin entity
        // For now, we'll just store the user credentials
        
        userRepository.save(adminUser);
        
        String token = jwtUtil.generateToken(adminUser.getUsername(), adminUser.getRole());
        
        return LoginResponse.success(token, adminUser.getUsername(), adminUser.getRole());
    }

    public User createUser(String username, String password, String role) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setEnabled(true);
        
        return userRepository.save(user);
    }
}
