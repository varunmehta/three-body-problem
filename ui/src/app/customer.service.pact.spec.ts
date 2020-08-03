import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { Matchers, PactWeb } from '@pact-foundation/pact-web';

describe('CustomerServicePact', () => {

  let provider;

  // Setup Pact mock server for this service
  beforeAll(async () => {

    provider = new PactWeb({
      port: 1234,
      host: '127.0.0.1',
      logLevel: 'debug',
      spec: 2
    });

    // required for slower CI environments
    await new Promise(resolve => setTimeout(resolve, 200000));

    // Required if run with `singleRun: false`
    await provider.removeInteractions();
  });

  // Configure Angular Testbed for this service
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        CustomerService
      ]
    });
  });

  // Verify mock service
  afterEach(async () => {
    await provider.verify();
  });

  // Create contract
  afterAll(async () => {
    await provider.finalize();
  });

  describe('getCustomer()', () => {

    const customerId = 1;

    const expectedCustomer: Customer = {
      id: 1,
      firstName: 'Jeff',
      lastName: 'Lyte',
      email: 'jeff_lyte@mail.com'
    };

    beforeAll(async () => {
      await provider.addInteraction({
        state: `customer 1 exists`,
        uponReceiving: 'a request to GET a customer',
        withRequest: {
          method: 'GET',
          path: `/customers/${customerId}`
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: Matchers.like(expectedCustomer)
        }
      });
    });

    it('should get a customer', async () => {
      const customerService: CustomerService = TestBed.get(CustomerService);

      await customerService.getCustomer(customerId).toPromise().then(response => {
        expect(response).toEqual(expectedCustomer);
      });
    });
  });

  describe('getCustomerByFunkyId()', () => {

    const customerId = '0yswEm7ET4';

    const expectedCustomer: Customer = {
      id: 13,
      firstName: 'Sonn',
      lastName: 'Onlie',
      email: 'sonn_onlie@mail.com',
      funkyId: '0yswEm7ET4'
    };

    beforeAll(async () => {
      await provider.addInteraction({
        state: `customer with funky id '0yswEm7ET4' exists`,
        uponReceiving: 'a request to GET a customer by funky id',
        withRequest: {
          method: 'GET',
          path: `/customers/funky/${customerId}`
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: Matchers.somethingLike(expectedCustomer)
        }
      });
    });

    it('should get a customer by funky id', async () => {
      const customerService: CustomerService = TestBed.get(CustomerService);

      await customerService.getCustomerByFunkyId(customerId).toPromise().then(response => {
        expect(response).toEqual(expectedCustomer);
      });
    });
  });

  describe('createCustomer()', () => {

    const expectedCustomer: Customer = {
      firstName: 'Ross',
      lastName: 'Sam',
      email: 'ross_sam@mail.com'
    };

    const createdCustomerId = 100;

    beforeAll(async () => {
      await provider.addInteraction({
        state: `provider accepts a new customer`,
        uponReceiving: 'a request to POST a customer',
        withRequest: {
          method: 'POST',
          path: '/customers',
          body: expectedCustomer,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        willRespondWith: {
          status: 201,
          headers: {
            'Content-Type': 'application/json'
          },
          body: Matchers.somethingLike({
            id: createdCustomerId
          })
        }
      });
    });

    it('should create a customer', async () => {
      const customerService: CustomerService = TestBed.get(CustomerService);
      await customerService.createCustomer(expectedCustomer).toPromise().then(response => {
        expect(response).toEqual(createdCustomerId);
      });
    });

  });

  describe('update()', () => {

    const expectedCustomer: Customer = {
      id: 42,
      firstName: 'Milli',
      lastName: 'Nesa',
      email: 'milli_nesa@mail.com'
    };

    beforeAll(async () => {
      await provider.addInteraction({
        state: `customer 42 exists`,
        uponReceiving: 'a request to PUT a customer',
        withRequest: {
          method: 'PUT',
          path: '/customers/42',
          headers: {'Content-Type': 'application/json'},
          body: Matchers.somethingLike(expectedCustomer)
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: Matchers.somethingLike(expectedCustomer)
        }
      });
    });

    it('should update a customer', async () => {
      const customerService: CustomerService = TestBed.get(CustomerService);

      await customerService.updateCustomer(expectedCustomer, 42).toPromise().then(response => {
        expect(response).toEqual(expectedCustomer);
      });
    });
  });
});
