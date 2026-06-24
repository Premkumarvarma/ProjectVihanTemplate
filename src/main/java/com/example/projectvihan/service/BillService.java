package com.example.projectvihan.service;

import java.util.List;

import com.example.projectvihan.Exception.AppServiceException;
import com.example.projectvihan.model.Bill;

public interface BillService {
	
	public Bill saveBill(Bill bill) throws AppServiceException;
	/**
	 * 
	 * @param coffee
	 * @return
	 */
	public Bill updateBill(Bill bill)throws AppServiceException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public Bill deleteBillById(Long id)throws AppServiceException;
	/**
	 * 
	 * @param Id
	 * @return
	 */
	public Bill findBillById(Long id)throws AppServiceException;
	/**
	 * 
	 * @return
	 */
	public List<Bill> findAllBill()throws AppServiceException;

}
