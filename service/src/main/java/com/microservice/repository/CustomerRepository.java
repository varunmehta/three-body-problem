package com.microservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservice.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	Optional<Customer> findByFunkyId(String funkyId);

}
