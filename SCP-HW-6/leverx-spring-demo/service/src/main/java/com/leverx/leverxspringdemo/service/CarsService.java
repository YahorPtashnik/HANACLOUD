package com.leverx.leverxspringdemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.CarsDao;
import com.leverx.leverxspringdemo.domain.Cars;

@Service
public class CarsService {
	
	@Autowired
	private CarsDao carsDao;
	
	public List<Cars> getCarsAll() {
		return carsDao.getAll();
	}
	
	public Cars getCars(Long id) {
		Optional<Cars> carsOptional = this.carsDao.getById(id);
		Cars cars = null;
		if (carsOptional.isPresent()) {
			cars = carsOptional.get();
		}
		return cars;
	}
	
	public void createCars(Cars cars) {
		this.carsDao.save(cars);
	}
	
	public void updateCars(Cars cars) {
		this.carsDao.update(cars);
	}
	
	public void deleteCars(Long id) {
		this.carsDao.delete(id);
	}
	
}
