package com.example.projectvihan.DaoImpl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.example.projectvihan.Dao.CoffeeDao;
import com.example.projectvihan.Exception.AppDaoException;
import com.example.projectvihan.Exception.RequestConstants;
import com.example.projectvihan.model.Coffee;
@Service
public class CoffeeDaoImpl implements CoffeeDao{
	private static Logger logger = LoggerFactory.getLogger(CoffeeDaoImpl.class);

	@Autowired
	private CoffeeDao  coffeeDao;

	@Autowired
	private MongoOperations mongoOperations;

	@Override
	public Coffee saveCoffee(Coffee coffee) throws AppDaoException{
		logger.info("Start of coffee save method>>>");
		try {
			coffee = coffeeDao.saveCoffee(coffee);
			logger.info("Coffee saved successfully");
			return coffee;
		} catch (Exception e) {
			logger.error("Error while saving coffee", e);
			throw new AppDaoException("DB_ERROR","Unable to save coffee",e);
		}
	}

	@Override
	public Coffee updateCoffee(Coffee coffee) throws AppDaoException{
		logger.info("Start of coffee update method>>>");
		try {
			coffee = coffeeDao.updateCoffee(coffee);
			logger.info("Coffee Updated successfully");
			return coffee;
		} catch (Exception e) {
			logger.error("Error while saving coffee", e);
			throw new AppDaoException("DB_ERROR","Unable to update coffee",e);
		}
	}

	@Override
	public Coffee deleteCoffeeById(Long id) throws AppDaoException{
		logger.info("Start of deleteCoffeeById method >>>");
		Coffee coffeeObj = null;
		Query searchQuery = null;
		try {
			if (id != null) {
				searchQuery = new Query(Criteria.where("id").is(id));
				coffeeObj = mongoOperations.findOne(searchQuery,Coffee.class,RequestConstants.Collections.COLLECTION_COFFEE);

				if (coffeeObj != null) {
					mongoOperations.remove(searchQuery,Coffee.class,RequestConstants.Collections.COLLECTION_COFFEE);
					logger.info("Coffee deleted successfully with id : {}", id);
				}
			}
			logger.info("End of deleteCoffeeById method <<<");
			return coffeeObj;
		} catch (Exception e) {
			logger.error("Error while deleting coffee", e);
			throw new AppDaoException("DB_ERROR","Unable to delete coffee",e);
		}

	}

	@Override
	public Coffee findCoffeeById(Long id) throws AppDaoException{
		logger.info("Start of findCoffeeById method >>>");
		Coffee coffeeObj = null;
		try {
			if (id != null) {
				Query searchQuery =new Query(Criteria.where("id").is(id));
				coffeeObj = mongoOperations.findOne(searchQuery,Coffee.class,RequestConstants.Collections.COLLECTION_COFFEE);
				if (coffeeObj != null) {
					logger.info("Coffee found successfully with id : {}", id);
				} else {
					logger.info("No coffee found with id : {}", id);
				}
			}
			logger.info("End of findCoffeeById method <<<");
			return coffeeObj;
		} catch (Exception e) {
			logger.error("Error while finding coffee", e);
			throw new AppDaoException("DB_ERROR","Unable to find coffee",e);
		}
	}

	@Override
	public List<Coffee> findAllCoffee() throws AppDaoException{
		logger.debug(">>>>> Start of findAllCoffee save method................findAllCoffee");
		List<Coffee> coffeeList = null; 
		Query searchQuery = null;
		try {
			coffeeList = this.mongoOperations.find(searchQuery, Coffee.class,RequestConstants.Collections.COLLECTION_EMPLOYEE);
		}catch(Exception e) {
			throw new AppDaoException("", "",e);
		}
		logger.debug("<<<<End of findAllCoffee method..........coffeeList" + coffeeList);
		return coffeeList;
	}
	

}
