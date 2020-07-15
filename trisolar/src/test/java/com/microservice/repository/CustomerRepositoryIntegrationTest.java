package com.microservice.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.shaded.org.apache.commons.lang.RandomStringUtils;

import com.microservice.model.Customer;

@DataJpaTest
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class CustomerRepositoryIntegrationTest {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private CustomerRepository customerRepository;

	@Test
	public void whenFindByFunkyId_ReturnCustomer() {

		// given
		Customer customer = new Customer("test", "test", "test@example.com");
		String funkyId = RandomStringUtils.randomAlphanumeric(10);
		customer.setFunkyId(funkyId);
		entityManager.persistAndFlush(customer);
		entityManager.flush();

		// when
		Optional<Customer> found = customerRepository.findByFunkyId(funkyId);

		// then
		assertNotNull(found.get());
		assertThat(found.get().getEmail()).isEqualTo(customer.getEmail());
	}

}
