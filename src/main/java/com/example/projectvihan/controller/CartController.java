package com.example.projectvihan.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.projectvihan.Exception.AppServiceException;
import com.example.projectvihan.model.Cart;
import com.example.projectvihan.service.CartService;
import com.example.projectvihan.util.AppConstants;
import com.example.projectvihan.util.ServiceControllerUtils;
import com.example.projectvihan.util.ServiceResponse;

@RestController
@RequestMapping("/cart")
public class CartController {
	private static Logger logger = LoggerFactory.getLogger(CartController.class);

	@Autowired
	private CartService cartService;
	
	@Autowired
	private ServiceControllerUtils scutils;
	
	 @PostMapping("/saveCart")
	  public ResponseEntity<?> saveCoffee(@RequestBody Cart cart) throws AppServiceException {
		 logger.info("start of save cart method.....................");
		 ResponseEntity<?> resp = null;
		 ServiceResponse restResponse = new ServiceResponse();
		 try {
			 cart = cartService.saveCart(cart);
				if (cart != null) {
					restResponse.addDataObject("cart", cart);
					restResponse = scutils.prepareMobileResponseSuccessStatus(restResponse, "cart is saved");
					resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.OK);
				} else {
					restResponse.addDataObject("cart", cart);
					restResponse = scutils.prepareMobileResponseInvalidData(restResponse, "cart is empty");
					resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.OK);
				}
			} catch (Exception e) {
				restResponse = scutils.prepareMobileResponseErrorStatus(restResponse, AppConstants.ERRORCODE,e.getMessage());
				resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return resp;
	    }
	
	

}
