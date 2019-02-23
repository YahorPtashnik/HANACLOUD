package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.Cars;
import com.leverx.leverxspringdemo.service.CarsService;

@RestController
public class CarsController {
	
	@Autowired
	private CarsService carsService;
	
	@GetMapping(value="/cars")
	public List<Cars> getAllCars() {
		return carsService.getCarsAll();
	}
	
	@GetMapping(value="/cars/{id}")
	public Cars getCars(@PathVariable Long id) {
		return carsService.getCars(id);
	}
	
	@PostMapping(value="/cars")
	public void createCars(@RequestBody Cars cars) {
		carsService.createCars(cars);
	}
	
	@DeleteMapping(value="/cars/{id}")
	public void deleteCars(@PathVariable Long id) {
		carsService.deleteCars(id);
	}
	
	@PutMapping(value="/cars")
	public void updateCars(@RequestBody Cars cars) {
		carsService.updateCars(cars);
	}
	
}
