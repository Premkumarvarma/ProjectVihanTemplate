package com.example.projectvihan.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projectvihan.Exception.AppServiceException;
import com.example.projectvihan.model.CartItem;

@Service
public interface CartItemService {
	
	public CartItem saveCartItem(CartItem cartItem) throws AppServiceException;
	/**
	 * 
	 * @param coffee
	 * @return
	 */
	public CartItem updateCartItem(CartItem cartItem)throws AppServiceException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public CartItem deleteCartItemById(Long id)throws AppServiceException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public CartItem findCartItemById(Long id)throws AppServiceException;
	/**
	 * 
	 * @return
	 */
	public List<CartItem> findAllCartItem()throws AppServiceException;

}
