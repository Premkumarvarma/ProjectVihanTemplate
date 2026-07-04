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
	private static Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);
	
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
		logger.info("Start of Cart Update method Service layer....................>>>>>>>>>>" + cart);
		try {
			cart = cartRepository.save(cart);
			logger.info("Cart saved successfully");
			return cart;
		}catch(Exception e) {
			logger.error("Error while saving Cart", e);
			throw new AppServiceException("DB_ERROR","Unable to update coffee",e);
		}
	}

	@Override
	public Cart deleteCartById(Long id) throws AppServiceException {
		logger.info("Start of Coffee deleteCartById method Service layer.............>>>>>>>>>>" + id);
		try {

			Cart cartObj = cartRepository.findById(id).orElse(null);

			if (cartObj != null) {
				cartRepository.deleteById(id);
				logger.info("Cart deleted successfully with id : {}", id);
			}

			logger.info("End of deleteCartById service method <<<");
			return cartObj;
		} catch (Exception e) {
			logger.error("Error while deleting cart", e);
			throw new AppServiceException("DB_ERROR","Unable to delete cart",e);
		}
	}

	@Override
	public Cart findCartById(Long id) throws AppServiceException {
		logger.info("Start of findCartById service method >>>");
		try {
			Cart cartObj = cartRepository.findById(id).orElse(null);

			if (cartObj != null) {
				logger.info("Cart found successfully with id : {}", id);
			} else {
				logger.info("No Cart found with id : {}", id);
			}
			logger.info("End of findCartById service method <<<");
			return cartObj;
		} catch (Exception e) {
			logger.error("Error while finding coffee", e);
			throw new AppServiceException("DB_ERROR","Unable to find cart",e);
		}
	}

	@Override
	public List<Cart> findAllCart() throws AppServiceException {
		logger.info("Start of CartFindAllmethod....................");
		List<Cart> cartList = null;
		try {
			cartList = cartRepository.findAll();
			logger.info("Coffee records fetched successfully" + cartList);
		}catch (Exception e) {
			logger.error("Error while fetching cart list", e);
			throw new AppServiceException("DB_ERROR","Unable to fetch cart list",e);	
		}
		return cartList;
	}

}
