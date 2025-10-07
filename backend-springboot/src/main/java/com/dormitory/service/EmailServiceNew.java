package com.dormitory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceNew {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:dormlife@example.com}")
    private String fromEmail;

    /**
     * Send a simple email notification
     */
    public void sendSimpleEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            
            mailSender.send(message);
            System.out.println("Email sent successfully to: " + to);
        } catch (Exception e) {
            System.err.println("Failed to send email to: " + to + ". Error: " + e.getMessage());
        }
    }

    /**
     * Send welcome email to new users
     */
    public void sendWelcomeEmail(String userEmail, String userName) {
        String subject = "Welcome to DormLife - Your Premium Dormitory Experience!";
        String text = String.format(
            "Dear %s,\n\n" +
            "Welcome to DormLife! We're excited to have you join our community.\n\n" +
            "Your account has been successfully created. You can now:\n" +
            "• Browse available rooms and amenities\n" +
            "• Make reservations online\n" +
            "• Access our 24/7 support services\n" +
            "• Enjoy premium dormitory facilities\n\n" +
            "If you have any questions, feel free to contact us at:\n" +
            "Phone: +91 9876543210\n" +
            "Email: support@dormlife.com\n\n" +
            "Best regards,\n" +
            "The DormLife Team", 
            userName
        );
        
        sendSimpleEmail(userEmail, subject, text);
    }

    /**
     * Send contact form notification
     */
    public void sendContactFormNotification(String name, String email, String phone, String message) {
        String subject = "New Contact Form Submission - DormLife";
        String text = String.format(
            "New contact form submission received:\n\n" +
            "Name: %s\n" +
            "Email: %s\n" +
            "Phone: %s\n" +
            "Message: %s\n\n" +
            "Please respond promptly to maintain our service quality.",
            name, email, phone, message
        );
        
        // Send notification to admin
        sendSimpleEmail("admin@dormlife.com", subject, text);
        
        // Send confirmation to user
        String confirmationSubject = "Thank you for contacting DormLife";
        String confirmationText = String.format(
            "Dear %s,\n\n" +
            "Thank you for reaching out to us! We have received your message and our team will get back to you within 24 hours.\n\n" +
            "Your message:\n%s\n\n" +
            "For urgent matters, please call us at +91 9876543210.\n\n" +
            "Best regards,\n" +
            "The DormLife Support Team",
            name, message
        );
        
        sendSimpleEmail(email, confirmationSubject, confirmationText);
    }

    /**
     * Send password reset email
     */
    public void sendPasswordResetEmail(String userEmail, String resetToken) {
        String subject = "Password Reset Request - DormLife";
        String text = String.format(
            "Dear User,\n\n" +
            "We received a request to reset your password for your DormLife account.\n\n" +
            "Your password reset token is: %s\n\n" +
            "Please use this token to reset your password. This token will expire in 24 hours.\n\n" +
            "If you didn't request a password reset, please ignore this email or contact our support team.\n\n" +
            "Best regards,\n" +
            "The DormLife Security Team",
            resetToken
        );
        
        sendSimpleEmail(userEmail, subject, text);
    }
}
