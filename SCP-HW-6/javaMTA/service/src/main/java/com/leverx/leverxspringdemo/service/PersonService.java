package com.leverx.leverxspringdemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.PersonDao;
import com.leverx.leverxspringdemo.domain.Person;

@Service
public class PersonService {
	
	@Autowired
	private PersonDao personDao;
	
	public List<Person> getPersonAll() {
		return personDao.getAll();
	}
	
	public Person getPerson(Long id) {
		Optional<Person> personOptional = this.personDao.getById(id);
		Person person = null;
		if (personOptional.isPresent()) {
			person = personOptional.get();
		}
		return person;
	}
	
	public void createPerson(Person person) {
		this.personDao.save(person);
	}
	
	public void updatePerson(Person person) {
		this.personDao.update(person);
	}
	
	public void deletePerson(Long id) {
		this.personDao.delete(id);
	}
	
}
