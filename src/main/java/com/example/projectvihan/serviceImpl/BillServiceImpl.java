package com.example.projectvihan.serviceImpl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projectvihan.Exception.AppServiceException;
import com.example.projectvihan.model.Bill;
import com.example.projectvihan.repository.BillRepository;
import com.example.projectvihan.service.BillService;

@Service
public class BillServiceImpl implements BillService{
	private static Logger logger = LoggerFactory.getLogger(BillServiceImpl.class);

	@Autowired
	private BillRepository billRepository;

	@Override
	public Bill saveBill(Bill bill) throws AppServiceException {
		logger.info("Start of Bill Save method Service layer....................>>>>>>>>>>" + bill);
		try {
			bill = billRepository.save(bill);
			logger.info("Bill saved successfully");
			return bill;
		}catch(Exception e) {
			logger.error("Error while saving Bill", e);
			throw new AppServiceException("DB_ERROR","Unable to save bill",e);
		}

	}

	@Override
	public Bill updateBill(Bill bill) throws AppServiceException {
		logger.info("Start of Bill Update method Service layer....................>>>>>>>>>>" + bill);
		try {
			bill = billRepository.save(bill);
			logger.info("Bill saved successfully");
			return bill;
		}catch(Exception e) {
			logger.error("Error while saving Bill", e);
			throw new AppServiceException("DB_ERROR","Unable to update bill",e);
		}

	}

	@Override
	public Bill deleteBillById(Long id) throws AppServiceException {
		logger.info("Start of Bill delete method>>>>>>>>>>" + id);
		try {
			Bill billObj = billRepository.findById(id).orElse(null);
			if(billObj != null) {
				billRepository.deleteById(id);
				logger.info("Bill  deleted successfully with id");
			}
			logger.info("End of deleteBillId service method <<<");
			return billObj;

		}catch (Exception e) {
			logger.error("Error while deleting Bill", e);
			throw new AppServiceException("DB_ERROR","Unable to delete bill",e);
		}
	}

	@Override
	public Bill findBillById(Long id) throws AppServiceException {
		logger.info("Start of Bill delete method>>>>>>>>>>" + id);
		try {
			Bill billObj = billRepository.findById(id).orElse(null);
			if(billObj != null) {
				billRepository.findById(id);
				logger.info("Bill details find successfully with given id");
			} else {
				logger.info("Unable to Find Bill details with given id");
			}
			logger.info("End of findbyid service method <<<");
			return billObj;

		}catch (Exception e) {
			logger.error("Error while finding the  Bill", e);
			throw new AppServiceException("DB_ERROR","Unable to find bill",e);
		}
	}

	@Override
	public List<Bill> findAllBill() throws AppServiceException {
		logger.info("Start of Bill find all method>>>>>>>>>>");
		List<Bill> billObj = null;
		try {
			billObj = billRepository.findAll();
			logger.info("successfully fetch the billlist");

		}catch (Exception e) {
			logger.error("Error while finding the  Bill", e);
			throw new AppServiceException("DB_ERROR","Unable to find bill",e);
		}
		return billObj;	
	}

}
