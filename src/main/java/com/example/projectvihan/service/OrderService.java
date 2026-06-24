package com.example.projectvihan.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projectvihan.Exception.AppServiceException;
import com.example.projectvihan.model.Order;

@Service
public interface OrderService {
	
	public Order saveOrder(Order order) throws AppServiceException;
	/**
	 * 
	 * @param coffee
	 * @return
	 */
	public Order updateOrder(Order order)throws AppServiceException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public Order deleteOrderById(Long id)throws AppServiceException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public Order findOrderById(Long id)throws AppServiceException;
	/**
	 * 
	 * @return
	 */
	public List<Order> findAllOrder()throws AppServiceException;
	

}
