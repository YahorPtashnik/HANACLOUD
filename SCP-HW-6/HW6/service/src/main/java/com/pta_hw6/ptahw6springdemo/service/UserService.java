package com.pta_hw6.ptahw6springdemo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pta_hw6.ptahw6springdemo.dao.entity.UserDao;
import com.pta_hw6.ptahw6springdemo.domain.User;

@Service
public class UserService {
	@Autowired
	private UserDao userDao;

	public List<User> getUserAll() {
		return userDao.getAll();
	}

	public User getUser(String id) {
		Optional<User> userOptional = this.userDao.getById(id);
		User user = null;
		if (userOptional.isPresent()) {
			user = userOptional.get();
		}
		return user;
	}

	public void createUser(User user) {
		this.userDao.save(user);
	}

	public void updateUser(User user) {
		this.userDao.update(user);
	}

	public void deleteUser(String id) {
		this.userDao.delete(id);
	}
}
