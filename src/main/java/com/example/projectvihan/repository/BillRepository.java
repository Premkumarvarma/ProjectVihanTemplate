package com.example.projectvihan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projectvihan.model.Bill;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long>{

}
