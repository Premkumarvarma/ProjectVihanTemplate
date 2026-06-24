package com.example.projectvihan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.example.projectvihan.model.Coffee;

@Repository
@Service
public interface CoffeeRepository  extends JpaRepository<Coffee, Long>{



}
