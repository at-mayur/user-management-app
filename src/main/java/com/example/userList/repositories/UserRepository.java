package com.example.userList.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.userList.models.User;

public interface UserRepository extends JpaRepository<User, Integer>  {

	List<User> findByUserNameContaining(String infix);
	
	List<User> findByUserEmailContaining(String email);
	
}
