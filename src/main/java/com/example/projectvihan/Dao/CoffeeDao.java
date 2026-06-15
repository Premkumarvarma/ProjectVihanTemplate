package com.example.projectvihan.Dao;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projectvihan.Exception.AppDaoException;
import com.example.projectvihan.model.Coffee;

@Service
public interface CoffeeDao {
	
	public Coffee saveCoffee(Coffee coffee) throws AppDaoException;
	/**
	 * 
	 * @param coffee
	 * @return
	 */
	public Coffee updateCoffee(Coffee coffee)throws AppDaoException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public Coffee deleteCoffeeById(Long id)throws AppDaoException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public Coffee findCoffeeById(Long id)throws AppDaoException;
	/**
	 * 
	 * @return
	 */
	public List<Coffee> findAllCoffee()throws AppDaoException;

}
