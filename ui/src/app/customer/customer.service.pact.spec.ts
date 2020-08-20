import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { Matchers, PactWeb } from '@pact-foundation/pact-web';


describe('CustomerServicePact', () => {

  let provider;

  // Setup Pact mock server for this service
  beforeAll(async () => {

    provider = new PactWeb({
      port: 1235,
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
      firstname: 'Jeff',
      lastname: 'Lyte',
      email: 'jeff_lyte@mail.com'
    };

    beforeAll(async () => {
      provider.addInteraction({
        state: `customer 1 exists`,
        uponReceiving: 'a request to GET a customer',
        withRequest: {
          method: 'GET',
          path: `/api/customers/${customerId}`
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
      const customerService:CustomerService = TestBed.get(CustomerService);
      await customerService.getById(customerId).toPromise().then(response => {
        expect(response).toEqual(expectedCustomer);
      });
    });
  });

  describe('getCustomerByFunkyId()', () => {

    const customerId = '0yswEm7ET4';

    const expectedCustomer: Customer = {
      id: 13,
      firstname: 'Son',
      lastname: 'Orous',
      email: 'sonorous@mail.com',
      funkyId: '0yswEm7ET4'
    };

    beforeAll(async () => {
      provider.addInteraction({
        state: `customer with funky id '0yswEm7ET4' exists`,
        uponReceiving: 'a request to GET a customer by funky id',
        withRequest: {
          method: 'GET',
          path: `/api/customers/funky/${customerId}`
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

    it('should get a customer', async () => {
      const customerService:CustomerService = TestBed.inject(CustomerService);
      await customerService.getByFunkyId(customerId).toPromise().then(response => {
        expect(response).toEqual(expectedCustomer);
      });
    });
  });

  describe('createCustomer()', () => {

    const expectedCustomer: Customer = {
      firstname: 'Ross',
      lastname: 'Sam',
      email: 'ross_sam@mail.com'
    };

    const createdCustomer: Customer = { ...expectedCustomer, id: 100 };

    beforeAll(async () => {
      provider.addInteraction({
        state: `provider accepts a new customer`,
        uponReceiving: 'a request to POST a customer',
        withRequest: {
          method: 'POST',
          path: '/api/customers',
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
          body: Matchers.somethingLike(createdCustomer)
        }
      });
    });

    it('should create a customer', async () => {
      const customerService:CustomerService = TestBed.inject(CustomerService);
      await customerService.create(expectedCustomer).toPromise().then(response => {
        expect(response).toEqual(createdCustomer);
      });
    });
  });

  describe('update()', () => {

    const customerId = 42;
    const expectedCustomer: Customer = {
      id: 42,
      firstname: 'Milli',
      lastname: 'Nesa',
      email: 'milli_nesa@mail.com'
    };

    beforeAll(async () => {
      provider.addInteraction({
        state: `customer 42 exists`,
        uponReceiving: 'a request to PUT a customer',
        withRequest: {
          method: 'PUT',
          path: `/api/customers/${customerId}`,
          headers: {'Content-Type': 'application/json'},
          body: Matchers.somethingLike(expectedCustomer)
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: Matchers.somethingLike(expectedCustomer)
        }
      });
    });

    it('should update a customer',  async () => {
      const customerService:CustomerService = TestBed.inject(CustomerService);
      await customerService.update(42, expectedCustomer).toPromise().then(response => {
        expect(response).toEqual(expectedCustomer);
      });
    });
  });

});
