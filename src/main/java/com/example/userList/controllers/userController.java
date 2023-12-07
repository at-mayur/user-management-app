package com.example.userList.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.userList.models.User;
import com.example.userList.services.UserServices;

import jakarta.servlet.http.HttpServletResponse;

@RestController
public class userController {
	
	@Autowired
	UserServices userServices;
	
	@PostMapping("/create-user")
	public String createUser(@RequestBody User newUser, HttpServletResponse response) {
		String userCreationMsg = userServices.createUser(newUser);
		return userCreationMsg;
	}
	
	@GetMapping("/get-users")
	public List<User> getAllUsers(HttpServletResponse response){
		response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		return userServices.getAllUsers();
	}
	
	@GetMapping("/search-users")
	public List<User> getAllMatchingUsers(@RequestParam("query") String nameStr, HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		return userServices.getUser(nameStr);
	}
	
	@PutMapping("/update-user/{id}")
	public User updateUser(@PathVariable int id, @RequestBody User newUser, HttpServletResponse response) {
		return userServices.updateUser(id, newUser);
	}
	
	@DeleteMapping("/remove-user/{id}")
	public User deleteUser(@PathVariable int id, HttpServletResponse response) {
		return userServices.removeUser(id);
	}
	
}
