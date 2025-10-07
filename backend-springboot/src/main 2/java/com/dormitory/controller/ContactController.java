package com.dormitory.controller;

import com.dormitory.dto.ContactRequest;
import com.dormitory.dto.ContactResponse;
import com.dormitory.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {
    
    @Autowired
    private EmailService emailService;
    
    @PostMapping("/send")
    public ResponseEntity<ContactResponse> sendContactEmail(@RequestBody ContactRequest contactRequest) {
        try {
            // Validate the request
            if (contactRequest.getName() == null || contactRequest.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ContactResponse.failure("Name is required"));
            }
            
            if (contactRequest.getEmail() == null || contactRequest.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ContactResponse.failure("Email is required"));
            }
            
            if (contactRequest.getSubject() == null || contactRequest.getSubject().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ContactResponse.failure("Subject is required"));
            }
            
            if (contactRequest.getMessage() == null || contactRequest.getMessage().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ContactResponse.failure("Message is required"));
            }
            
            // Send the email
            emailService.sendContactFormEmail(contactRequest);
            
            return ResponseEntity.ok(
                ContactResponse.success("Thank you for your message! We'll get back to you soon.")
            );
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ContactResponse.failure("Failed to send message. Please try again later."));
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Contact service is running!");
    }
}
