package com.dormitory.controller;

import com.dormitory.dto.LoginRequest;
import com.dormitory.dto.LoginResponse;
import com.dormitory.dto.SignupRequest;
import com.dormitory.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authService.authenticate(loginRequest);
            
            if (response.getToken() != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(LoginResponse.failure("Internal server error"));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody LoginRequest registerRequest) {
        try {
            LoginResponse response = authService.register(registerRequest);
            
            if (response.getToken() != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(LoginResponse.failure("Internal server error"));
        }
    }
    
    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> signup(@RequestBody SignupRequest signupRequest) {
        try {
            LoginResponse response = authService.registerAdmin(signupRequest);
            
            if (response.getToken() != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(LoginResponse.failure("Internal server error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Backend is running!");
    }
}
