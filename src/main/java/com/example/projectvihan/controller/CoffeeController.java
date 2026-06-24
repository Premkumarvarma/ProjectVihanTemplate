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
import com.example.projectvihan.model.Coffee;
import com.example.projectvihan.service.CoffeeService;
import com.example.projectvihan.util.AppConstants;
import com.example.projectvihan.util.ServiceControllerUtils;
import com.example.projectvihan.util.ServiceResponse;

@RestController
@RequestMapping("/coffee")
public class CoffeeController {
	private static Logger logger = LoggerFactory.getLogger(CoffeeController.class);

	
	@Autowired
	private CoffeeService coffeeService;
	
	@Autowired
	private ServiceControllerUtils scutils;
	
	 @PostMapping("/saveCoffee")
	  public ResponseEntity<?> saveCoffee(@RequestBody Coffee coffee) throws AppServiceException {
		 logger.info("start of save coffee method.....................");
		 ResponseEntity<?> resp = null;
		 ServiceResponse restResponse = new ServiceResponse();
		 try {
			 coffee = coffeeService.saveCoffee(coffee);
				if (coffee != null) {
					restResponse.addDataObject("coffee", coffee);
					restResponse = scutils.prepareMobileResponseSuccessStatus(restResponse, "coffee is saved");
					resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.OK);
				} else {
					restResponse.addDataObject("coffee", coffee);
					restResponse = scutils.prepareMobileResponseInvalidData(restResponse, "coffee is empty");
					resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.OK);
				}
			} catch (Exception e) {
				restResponse = scutils.prepareMobileResponseErrorStatus(restResponse, AppConstants.ERRORCODE,e.getMessage());
				resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return resp;
	    }

}
