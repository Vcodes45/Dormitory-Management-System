package com.dormitory.service;

import com.dormitory.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {
    
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${dormitory.email.from}")
    private String fromEmail;
    
    @Value("${dormitory.email.admin}")
    private String adminEmail;
    
    public void sendContactFormEmail(ContactRequest contactRequest) {
        try {
            logger.info("Sending contact form emails for: {}", contactRequest.getEmail());
            
            // Send email to admin
            sendEmailToAdmin(contactRequest);
            
            // Send confirmation email to user
            sendConfirmationEmailToUser(contactRequest);
            
            logger.info("Contact form emails sent successfully for: {}", contactRequest.getEmail());
        } catch (Exception e) {
            logger.error("Error sending contact form emails: ", e);
            throw new RuntimeException("Failed to send email. Please check your email configuration: " + e.getMessage());
        }
    }
    
    private void sendEmailToAdmin(ContactRequest contactRequest) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(adminEmail);
            message.setSubject("New Contact Form Submission - " + contactRequest.getSubject());
            message.setText(buildAdminEmailContent(contactRequest));
            message.setFrom(fromEmail);
            
            mailSender.send(message);
            logger.info("Admin notification email sent to: {}", adminEmail);
        } catch (Exception e) {
            logger.error("Failed to send admin email: ", e);
            throw e;
        }
    }
    
    private void sendConfirmationEmailToUser(ContactRequest contactRequest) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(contactRequest.getEmail());
            message.setSubject("Thank you for contacting DormLife - We received your message");
            message.setText(buildUserConfirmationContent(contactRequest));
            message.setFrom(fromEmail);
            
            mailSender.send(message);
            logger.info("Confirmation email sent to user: {}", contactRequest.getEmail());
        } catch (Exception e) {
            logger.error("Failed to send confirmation email: ", e);
            throw e;
        }
    }
    
    private String buildAdminEmailContent(ContactRequest contactRequest) {
        return String.format("""
            New contact form submission received:
            
            Name: %s
            Email: %s
            Subject: %s
            
            Message:
            %s
            
            Please respond to this inquiry as soon as possible.
            
            ---
            DormLife Contact System
            """, 
            contactRequest.getName(),
            contactRequest.getEmail(),
            contactRequest.getSubject(),
            contactRequest.getMessage()
        );
    }
    
    private String buildUserConfirmationContent(ContactRequest contactRequest) {
        return String.format("""
            Dear %s,
            
            Thank you for contacting DormLife! We have successfully received your message regarding "%s".
            
            Our team will review your inquiry and respond within 24-48 hours. If your matter is urgent, please don't hesitate to call us directly.
            
            Here's a copy of your message:
            Subject: %s
            Message: %s
            
            We appreciate your interest in DormLife and look forward to assisting you!
            
            Best regards,
            The DormLife Team
            
            ---
            This is an automated confirmation email. Please do not reply to this address.
            """,
            contactRequest.getName(),
            contactRequest.getSubject(),
            contactRequest.getSubject(),
            contactRequest.getMessage()
        );
    }
}
