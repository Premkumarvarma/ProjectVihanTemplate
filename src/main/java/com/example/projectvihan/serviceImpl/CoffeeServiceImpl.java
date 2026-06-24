package com.example.projectvihan.serviceImpl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projectvihan.Exception.AppServiceException;
import com.example.projectvihan.model.Coffee;
import com.example.projectvihan.repository.CoffeeRepository;
import com.example.projectvihan.service.CoffeeService;


@Service
public class CoffeeServiceImpl implements CoffeeService{

	private static Logger logger = LoggerFactory.getLogger(CoffeeServiceImpl.class);

	@Autowired
	private CoffeeRepository coffeeRepo;

	@Override
	public Coffee saveCoffee(Coffee coffee) throws AppServiceException {
		logger.info("Start of Coffee Save method Service layer....................>>>>>>>>>>" + coffee);
		try {
			coffee = coffeeRepo.save(coffee);
			logger.info("Coffee saved successfully");
			return coffee;
		}catch(Exception e) {
			logger.error("Error while saving coffee", e);
			throw new AppServiceException("DB_ERROR","Unable to save coffee",e);
		}
	}

	@Override
	public Coffee updateCoffee(Coffee coffee) throws AppServiceException {
		logger.info("Start of Coffee update method Service layer..............>>>>>>>>>>" + coffee);
		try {
			coffee = coffeeRepo.save(coffee);
			logger.info("Coffee updated successfully");
			return coffee;
		}catch(Exception e) {
			logger.error("Error while updating coffee", e);
			throw new AppServiceException("DB_ERROR","Unable to updATE coffee",e);
		}
	}

	@Override
	public Coffee deleteCoffeeById(Long id) throws AppServiceException {
		logger.info("Start of Coffee deleteCoffeeById method Service layer.............>>>>>>>>>>" + id);
		try {

			Coffee coffeeObj = coffeeRepo.findById(id).orElse(null);

			if (coffeeObj != null) {
				coffeeRepo.deleteById(id);
				logger.info("Coffee deleted successfully with id : {}", id);
			}

			logger.info("End of deleteCoffeeById service method <<<");
			return coffeeObj;
		} catch (Exception e) {
			logger.error("Error while deleting coffee", e);
			throw new AppServiceException("DB_ERROR","Unable to delete coffee",e);
		}
	}



	@Override
	public Coffee findCoffeeById(Long id) throws AppServiceException {
		logger.info("Start of findCoffeeById service method >>>");
		try {
			Coffee coffeeObj = coffeeRepo.findById(id).orElse(null);

			if (coffeeObj != null) {
				logger.info("Coffee found successfully with id : {}", id);
			} else {
				logger.info("No coffee found with id : {}", id);
			}
			logger.info("End of findCoffeeById service method <<<");
			return coffeeObj;
		} catch (Exception e) {
			logger.error("Error while finding coffee", e);
			throw new AppServiceException("DB_ERROR","Unable to find coffee",e);
		}
	}

	@Override
	public List<Coffee> findAllCoffee() throws AppServiceException {
		logger.info("Start of getAllCoffee service method >>>");
		List<Coffee> coffeeList = null;
		try {
			coffeeList = coffeeRepo.findAll();
			logger.info("Coffee records fetched successfully");
		} catch (Exception e) {
			logger.error("Error while fetching coffee list", e);
			throw new AppServiceException("DB_ERROR","Unable to fetch coffee list",e);
		}
		return coffeeList;
	}

}
