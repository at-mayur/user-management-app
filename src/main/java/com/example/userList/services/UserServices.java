package com.example.userList.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.userList.models.User;
import com.example.userList.repositories.UserRepository;

@Service
public class UserServices {
	
	@Autowired
	UserRepository userRepo;
	
	public String createUser(User user) {
		try {
			List<User> userResult = userRepo.findByUserEmailContaining(user.getUserEmail());
			if(userResult!=null && userResult.size()>0) {
				return "User with given Email already exists..!!";
			}
			
			user.setPassword(user.getPassword().hashCode()+"");
			userRepo.save(user);
			return "User Created Successfully..";
			
		} catch (Exception e) {
			return "Error while creating User...!!!";
		}
	}
	
	public List<User> getAllUsers(){
		try {
			
			return userRepo.findAll();
			
		} catch (Exception e) {
			return new ArrayList<User>();
		}
	}
	
	public List<User> getUser(String nameStr){
		try {
			
			return userRepo.findByUserNameContaining(nameStr);
			
		} catch (Exception e) {
			return new ArrayList<User>();
		}
	}
	
	public User updateUser(int id, User newUser) {
		try {
			Optional<User> userResult = userRepo.findById(id);
			if(userResult.isEmpty()) {
				return null;
			}
			
			List<User> existingUsersWithMail = userRepo.findByUserEmailContaining(newUser.getUserEmail());
			if(existingUsersWithMail!=null && existingUsersWithMail.size()>0) {
				return null;
			}
			
			User oldUser = userResult.get();
			oldUser.setUserName(newUser.getUserName());
			oldUser.setUserEmail(newUser.getUserEmail());
			oldUser.setUserContact(newUser.getUserContact());
			oldUser.setUserPosition(newUser.getUserPosition());
			oldUser.setUserRole(newUser.getUserRole());
			oldUser.setPassword(newUser.getPassword().hashCode()+"");
			
			userRepo.save(oldUser);
			return oldUser;
			
		} catch (Exception e) {
			return null;
		}
	}
	
	public User removeUser(int id) {
		try {
			
			Optional<User> userResult = userRepo.findById(id);
			if(userResult.isEmpty()) {
				return null;
			}
			
			userRepo.deleteById(id);
			return userResult.get();
			
		} catch (Exception e) {
			return null;
		}
	}
	
}
