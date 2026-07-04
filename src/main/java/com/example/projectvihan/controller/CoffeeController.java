package com.example.projectvihan.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	 
	 @PutMapping("/updateCoffee")
	  public ResponseEntity<?> updateCoffee(@RequestBody Coffee coffee) throws AppServiceException {
		 logger.info("start of update coffee method.....................");
		 ResponseEntity<?> resp = null;
		 ServiceResponse restResponse = new ServiceResponse();
		 try {
			 coffee = coffeeService.updateCoffee(coffee);
				if (coffee != null) {
					restResponse.addDataObject("coffee", coffee);
					restResponse = scutils.prepareMobileResponseSuccessStatus(restResponse, "coffee is updated");
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
	 
	 @DeleteMapping("/deleteCoffeeById")
	  public ResponseEntity<?> deleteCoffeeById(@RequestParam Long id)throws AppServiceException {
		 logger.info("start of delete coffee method.....................");
		 ResponseEntity<?> resp = null;
		 ServiceResponse restResponse = new ServiceResponse();
		 try {
			 
			 Coffee coffee = coffeeService.deleteCoffeeById(id);
				if (coffee != null) {
					restResponse.addDataObject("coffee", coffee);
					restResponse = scutils.prepareMobileResponseSuccessStatus(restResponse, "coffee is deleted Successfully");
					resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.OK);
				} else {
					restResponse.addDataObject("coffee", coffee);
					restResponse = scutils.prepareMobileResponseInvalidData(restResponse, "unable to delete coffee with givenId");
					resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.OK);
				}
			} catch (Exception e) {
				restResponse = scutils.prepareMobileResponseErrorStatus(restResponse, AppConstants.ERRORCODE,e.getMessage());
				resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return resp;
	    }
	 
	 @GetMapping("/findCoffeeById")
	  public ResponseEntity<?> findCoffeeById(@RequestParam Long id) throws AppServiceException {
		 logger.info("start of delete coffee method.....................");
		 ResponseEntity<?> resp = null;
		 ServiceResponse restResponse = new ServiceResponse();
		 try {
			 
			 Coffee coffee = coffeeService.findCoffeeById(id);
				if (coffee != null) {
					restResponse.addDataObject("coffee", coffee);
					restResponse = scutils.prepareMobileResponseSuccessStatus(restResponse, "Successfully find the coffe with given Id");
					resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.OK);
				} else {
					restResponse.addDataObject("coffee", coffee);
					restResponse = scutils.prepareMobileResponseInvalidData(restResponse, "unable to find coffee with givenId");
					resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.OK);
				}
			} catch (Exception e) {
				restResponse = scutils.prepareMobileResponseErrorStatus(restResponse, AppConstants.ERRORCODE,e.getMessage());
				resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return resp;
	    }
	 
	 @GetMapping("/findAllCoffee")
	  public ResponseEntity<?> findAllCoffee() throws AppServiceException {
		 logger.info("start of delete coffee method.....................");
		 ResponseEntity<?> resp = null;
		 ServiceResponse restResponse = new ServiceResponse();
		 try {
			 
			 List<Coffee> coffee = coffeeService.findAllCoffee();
				if (coffee != null) {
					restResponse.addDataObject("coffee", coffee);
					restResponse = scutils.prepareMobileResponseSuccessStatus(restResponse, "Successfully fetch coffeeList");
					resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.OK);
				} else {
					restResponse.addDataObject("coffee", coffee);
					restResponse = scutils.prepareMobileResponseInvalidData(restResponse, "Empty coffee list");
					resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.OK);
				}
			} catch (Exception e) {
				restResponse = scutils.prepareMobileResponseErrorStatus(restResponse, AppConstants.ERRORCODE,e.getMessage());
				resp = new ResponseEntity<ServiceResponse>(restResponse, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return resp;
	    }


}
