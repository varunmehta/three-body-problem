import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { Matchers, PactWeb } from '@pact-foundation/pact-web';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";

describe('CustomerServicePact', () => {

  let provider;

  // Setup Pact mock server for this service
  beforeAll(function (done) {

    provider = new PactWeb({
      host: '127.0.0.1',
      port: 3000,
      cors: true,
      logLevel: 'debug'
    });

    // required for slower CI environments
    setTimeout(done, 800000);

    // Required if run with `singleRun: false`
    //provider.removeInteractions();

    provider.setup()
  });

  // Configure Angular Testbed for this service
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        CustomerService
      ]
    });
  });

  // Verify mock service
  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  // Create contract
  afterAll(function (done) {
    provider.finalize()
      .then(function () {
        done();
      }, function (err) {
        done.fail(err);
      });
  });

  describe('getCustomer()', () => {

    const customerId = 1;

    const expectedCustomer: Customer = {
      id: 1,
      firstName: 'Jeff',
      lastName: 'Lyte',
      email: 'jeff_lyte@mail.com'
    };

    beforeAll((done) => {
      provider.addInteraction({
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
      }).then(done, error => done.fail(error));
    });

    it('should get a customer', function (done) {
      const customerService:CustomerService = TestBed.inject(CustomerService);
      customerService.getCustomer(customerId).subscribe(response => {
        expect(response).toEqual(expectedCustomer);
        done();
      }, error => {
        done.fail(error);
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

    beforeAll((done) => {
      provider.addInteraction({
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
      }).then(done, error => done.fail(error));
    });

    it('should get a customer by funky id', function (done) {
      const customerService:CustomerService = TestBed.inject(CustomerService);
      customerService.getCustomerByFunkyId(customerId).subscribe(response => {
        expect(response).toEqual(expectedCustomer);
        done();
      }, error => {
        done.fail(error);
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

    beforeAll((done) => {
      provider.addInteraction({
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
      }).then(done, error => done.fail(error));
    });

    it('should create a customer', function(done) {
      const customerService:CustomerService = TestBed.inject(CustomerService);
      customerService.createCustomer(expectedCustomer).subscribe((response) => {
        expect(response).toEqual(createdCustomerId);
        done();
      }, error => {
        done.fail(error);
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

    beforeAll((done) => {
      provider.addInteraction({
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
      }).then(done, error => done.fail(error));
    });

    it('should update a customer', function(done) {
      const customerService:CustomerService = TestBed.inject(CustomerService);
      customerService.updateCustomer(expectedCustomer, 42).subscribe((response) => {
        expect(response).toEqual(expectedCustomer);
        done();
      }, error => {
        done.fail(error);
      });
    });
  });
});
