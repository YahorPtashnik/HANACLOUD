package com.pta_hw6.ptahw6springdemo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.pta_hw6.ptahw6springdemo.domain.User;
import com.pta_hw6.ptahw6springdemo.service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping(value = "/user")
	public List<User> getAllUser() {
		return userService.getUserAll();
	}

	@GetMapping(value = "/user/{usid}")
	public User getUser(@PathVariable String id) {
		return userService.getUser(id);
	}

	@PostMapping(value = "/user")
	public void createUser(@RequestBody User user) {
		userService.createUser(user);
	}

	@DeleteMapping(value = "/user/{usid]")
	public void deleteUser(@PathVariable String id) {
		userService.deleteUser(id);
	}

	@PutMapping(value = "/user")
	public void updateUser(@RequestBody User user) {
		userService.updateUser(user);
	}
}
