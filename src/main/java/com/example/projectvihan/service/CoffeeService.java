package com.example.projectvihan.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projectvihan.Exception.AppServiceException;
import com.example.projectvihan.model.Coffee;

@Service
public interface CoffeeService {
	
	public Coffee saveCoffee(Coffee coffee) throws AppServiceException;
	/**
	 * 
	 * @param coffee
	 * @return
	 */
	public Coffee updateCoffee(Coffee coffee)throws AppServiceException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public Coffee deleteCoffeeById(Long id)throws AppServiceException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public Coffee findCoffeeById(Long id)throws AppServiceException;
	/**
	 * 
	 * @return
	 */
	public List<Coffee> findAllCoffee()throws AppServiceException;

}
