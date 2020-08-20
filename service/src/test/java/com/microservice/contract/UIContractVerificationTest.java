package com.microservice.contract;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;

import au.com.dius.pact.provider.junit.State;
import au.com.dius.pact.provider.junit.Provider;
import au.com.dius.pact.provider.junit.loader.PactBroker;
import au.com.dius.pact.provider.junit.target.Target;
import au.com.dius.pact.provider.junit.target.TestTarget;
import au.com.dius.pact.provider.junit.target.HttpTarget;
import au.com.dius.pact.provider.spring.SpringRestPactRunner;

import java.util.Optional;

import org.junit.ClassRule;
import org.junit.runner.RunWith;

import org.testcontainers.shaded.org.apache.commons.lang.math.RandomUtils;
import org.testcontainers.shaded.org.apache.commons.lang.RandomStringUtils;

import com.microservice.model.Customer;
import com.microservice.TrisolarApplication;
import com.microservice.service.CustomerService;

@RunWith(SpringRestPactRunner.class)
@Provider("CustomerService")
@PactBroker(host = "localhost", scheme = "http", port = "9292", tags="latest")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT,classes=TrisolarApplication.class)
public class UIContractVerificationTest {

    @MockBean
    private CustomerService customerService;

    @TestTarget
    public final Target target = new HttpTarget("localhost", 8082);

    private Customer getDummyCustomer(){
        Customer customer = new Customer("Test", "Tester", "tester@test.com");
        customer.setId(RandomUtils.nextInt(5000));
        return customer;
}

    @State("customer 42 exists")
    public void updateCustomer(){
        when(customerService.upsertCustomer(any(Customer.class))).thenReturn(getDummyCustomer());
    }

    @State("provider accepts a new customer")
    public void createCustomer(){
        when(customerService.upsertCustomer(any(Customer.class))).thenReturn(getDummyCustomer());
    }

    @State("customer 1 exists")
    public void fetchCustomer(){
        Optional<Customer> optionalCustomer = Optional.of(getDummyCustomer());
        when(customerService.getCustomerById(any(Integer.class))).thenReturn(optionalCustomer);
    }

    @State("customer with funky id '0yswEm7ET4' exists")
    public void fetchCustomerByFunkyId(){
        Customer customer = new Customer("Test", "Tester", "tester@test.com");
        customer.setFunkyId(RandomStringUtils.randomAlphanumeric(10));
        Optional<Customer> optionalCustomer = Optional.of(customer);

        when(customerService.getCustomerByFunkyId(any(String.class))).thenReturn(optionalCustomer);
    }
}
