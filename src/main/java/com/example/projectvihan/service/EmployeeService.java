package com.example.projectvihan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projectvihan.model.Employee;
import com.example.projectvihan.repository.EmployeeRepository;

@Service
public class EmployeeService {


	@Autowired
	private EmployeeRepository employeeRepository;
	
	
   public Employee  SaveEmployee (Employee employee) {
	return employeeRepository.save(employee);
	   
   }
   
   public List<Employee> findAllEmployee() {
	return employeeRepository.findAll();
	   
   }
   
   public Optional<Employee> findById(Long id) {
	    return employeeRepository.findById(id);
	}
   
   public void deleteEmployee(Long id) {
	    employeeRepository.deleteById(id);
	}
}
