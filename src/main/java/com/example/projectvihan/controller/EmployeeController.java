package com.example.projectvihan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.projectvihan.model.Employee;
import com.example.projectvihan.service.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	private EmployeeService service;
	
	
	 @PostMapping("/saveEmployee")
	  public Employee saveEmployee(@RequestBody Employee employee) {
	        return service.SaveEmployee(employee);
	    }
	 
	 @GetMapping("/getEmployee")
	    public List<Employee> getAllEmployees() {
	        return service.findAllEmployee();
	    }
	 
	 @DeleteMapping("/deleteEmployee/{id}")
	 public String deleteEmployee(@PathVariable Long id) {
	     service.deleteEmployee(id);
	     return "Employee deleted successfully";
	 }

}
