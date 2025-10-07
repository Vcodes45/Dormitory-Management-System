package com.dormitory.config;

import com.dormitory.entity.User;
import com.dormitory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if not exists
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            admin.setEnabled(true);
            
            userRepository.save(admin);
            System.out.println("Default admin user created - Username: admin, Password: admin123");
        }
        
        // Create a test user
        if (!userRepository.existsByUsername("testuser")) {
            User user = new User();
            user.setUsername("testuser");
            user.setPassword(passwordEncoder.encode("test123"));
            user.setRole("USER");
            user.setEnabled(true);
            
            userRepository.save(user);
            System.out.println("Test user created - Username: testuser, Password: test123");
        }
    }
}
