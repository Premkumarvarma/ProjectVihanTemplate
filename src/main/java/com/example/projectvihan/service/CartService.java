package com.example.projectvihan.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projectvihan.Exception.AppServiceException;
import com.example.projectvihan.model.Cart;

@Service
public interface CartService {
	
	public Cart saveCart(Cart cart) throws AppServiceException;
	/**
	 * 
	 * @param coffee
	 * @return
	 */
	public Cart updateCart(Cart cart)throws AppServiceException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public Cart deleteCartById(Long id)throws AppServiceException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public Cart findCartById(Long id)throws AppServiceException;
	/**
	 * 
	 * @return
	 */
	public List<Cart> findAllCart()throws AppServiceException;

}
