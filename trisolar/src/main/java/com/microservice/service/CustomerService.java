package com.microservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservice.model.Customer;
import com.microservice.repository.CustomerRepository;

/**
 * All tx calls happen here.
 */
@Service
public class CustomerService {

	@Autowired
	CustomerRepository customerRepository;

	@Transactional(readOnly = true)
	public List<Customer> getCustomers() {
		return customerRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Optional<Customer> getCustomerById(int id) {
		return customerRepository.findById(id);
	}

	/**
	 * create and update will call the same API, it presumes you've sent the whole
	 * dataset always, if you only want to update one particular field, then ask the
	 * teams to use PATCH instead.
	 * 
	 * @param customer
	 * @return
	 */
	@Transactional
	public Customer upsertCustomer(Customer customer) {
		return customerRepository.save(customer);
	}

	// TODO: Pending WIP
	// public User patchUser(Map<String, Object> partialUser, int id) {
	// userRepository.save(partialUser, id);
	// }

	@Transactional(readOnly = true)
	public Optional<Customer> getCustomerByFunkyId(String funklyId) {
		return customerRepository.findByFunkyId(funklyId);
	}

}
