# 📧 Gmail Email Setup Instructions for DormLife Contact Form

## Step 1: Set up Gmail App Password

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Click on "Security"** in the left sidebar
3. **Enable 2-Factor Authentication** (if not already enabled)
   - Click "2-Step Verification"
   - Follow the setup process
4. **Generate an App Password**:
   - Go back to Security
   - Click "App passwords"
   - Select "Mail" from dropdown
   - Click "Generate"
   - **Copy the 16-character password** (format: abcd efgh ijkl mnop)

## Step 2: Update Email Configuration

Edit this file: `backend-springboot/src/main/resources/application.properties`

Replace these lines:
```
spring.mail.username=YOUR_GMAIL_EMAIL@gmail.com
spring.mail.password=YOUR_16_CHAR_APP_PASSWORD
dormitory.email.from=YOUR_GMAIL_EMAIL@gmail.com  
dormitory.email.admin=YOUR_ADMIN_EMAIL@gmail.com
```

**Example:**
```
spring.mail.username=johndoe@gmail.com
spring.mail.password=abcd efgh ijkl mnop
dormitory.email.from=johndoe@gmail.com
dormitory.email.admin=admin@gmail.com
```

## Step 3: Restart the Backend

1. Stop the current backend (if running)
2. Rebuild and start:
```bash
cd backend-springboot
mvn clean package -DskipTests
java -jar target/dormitory-backend-1.0.0.jar
```

## Step 4: Test Email Functionality

1. Go to http://localhost:5173
2. Scroll to "Contact Us" section
3. Fill out the form with a real email address
4. Click "Send Message"
5. Check both your admin email and the user's email for messages

## What Emails Will Be Sent:

1. **Admin Email**: You'll receive a notification about the new contact form submission
2. **User Email**: The person who filled the form will receive a confirmation email

## Troubleshooting:

- **"Username and Password not accepted"**: Make sure you're using the App Password, not your regular Gmail password
- **"Connection timeout"**: Check your internet connection and firewall settings
- **Still not working**: Try using a different email service like SendGrid or Mailgun for production

## Security Notes:

- Never commit your real email credentials to Git
- Consider using environment variables for production
- The App Password should be kept secret

---
**Once you update the credentials, the contact form will send real emails!**
