package com.dormitory.dto;

public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String role;
    private String dormitoryName;
    private String ownerName;
    private String phone;
    private String address;
    
    public SignupRequest() {}
    
    public SignupRequest(String username, String email, String password, String role, 
                        String dormitoryName, String ownerName, String phone, String address) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.dormitoryName = dormitoryName;
        this.ownerName = ownerName;
        this.phone = phone;
        this.address = address;
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public String getDormitoryName() { return dormitoryName; }
    public void setDormitoryName(String dormitoryName) { this.dormitoryName = dormitoryName; }
    
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
