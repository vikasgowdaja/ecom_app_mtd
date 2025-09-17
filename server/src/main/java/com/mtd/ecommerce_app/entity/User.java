package com.mtd.ecommerce_app.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
public class User {
	@Id
	private String id;
    private String name;
    @Indexed(unique = true)
    private String email; 
    
    private String password;
    private String street;
    private String city;
    private String zip;
    @CreatedDate
    private LocalDateTime createdAt;
    
    public User() {}
	public User(String name, String email, String password, String street, String city, String zip,
			LocalDateTime createdAt) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.street = street;
		this.city = city;
		this.zip = zip;
		this.createdAt = createdAt;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
}
