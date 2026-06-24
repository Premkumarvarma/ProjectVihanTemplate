package com.example.projectvihan.serviceImpl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projectvihan.Exception.AppServiceException;
import com.example.projectvihan.model.Cart;
import com.example.projectvihan.repository.CartRepository;
import com.example.projectvihan.service.CartService;

@Service
public class CartServiceImpl implements CartService{
	private static Logger logger = LoggerFactory.getLogger(CoffeeServiceImpl.class);
	
	@Autowired
	private CartRepository cartRepository;

	@Override
	public Cart saveCart(Cart cart) throws AppServiceException {
		logger.info("Start of Cart Save method Service layer....................>>>>>>>>>>" + cart);
		try {
			cart = cartRepository.save(cart);
			logger.info("Cart saved successfully");
			return cart;
		}catch(Exception e) {
			logger.error("Error while saving Cart", e);
			throw new AppServiceException("DB_ERROR","Unable to save coffee",e);
		}
	}

	@Override
	public Cart updateCart(Cart cart) throws AppServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Cart deleteCartById(Long id) throws AppServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Cart findCartById(Long id) throws AppServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Cart> findAllCart() throws AppServiceException {
		// TODO Auto-generated method stub
		return null;
	}

}
