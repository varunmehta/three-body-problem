package com.microservice.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.shaded.org.apache.commons.lang.math.RandomUtils;

import com.microservice.model.Customer;
import com.microservice.service.CustomerService;

// @SpringBootTest
public class CustomerControllerIntegrationTest {

	// @Autowired
	private CustomerService service;

//	@Test
//	public void givenId_whenGetCustomer_thenReturnCustomer() throws Exception {
//		int id = RandomUtils.nextInt(5000);
//
//
//
//		Customer customer = new Customer("Bruce", "Wayne", "batman@justiceleauge.com");
//		customer.setId(id);
//
//		Optional<Customer> optionalCustomer = Optional.of(customer);
//
//		when(service.getCustomerById(id)).thenReturn(optionalCustomer);
//
//		this.mvc.perform(get("/customers/" + id).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
//				.andExpect(jsonPath("$.firstname", is(customer.getFirstname())));
//	}
//
//	@Test
//	public void givenId_whenGetCustomer_thenReturnNoCustomer() throws Exception {
//		int id = RandomUtils.nextInt(5000);
//
//		Optional<Customer> optionalCustomer = Optional.ofNullable(null);
//		when(service.getCustomerById(id)).thenReturn(optionalCustomer);
//
//		this.mvc.perform(get("/customers/" + id).contentType(MediaType.APPLICATION_JSON))
//				.andExpect(status().isNotFound());
//	}
//
}
