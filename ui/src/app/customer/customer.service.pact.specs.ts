import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';

const { Pact, Matchers } = require("@pact-foundation/pact")

const CONSUMER = 'CustomerUI';
const PROVIDER = 'CustomerService';
const MOCK_PROVIDER_PORT = 3000;
const { id } = Matchers;

describe('Pact', () => {
  let provider
  let service: CustomerService;

  beforeAll(async () => {
    // Create the Pact object to represent your provider
    provider = new Pact({
      consumer: CONSUMER,
      provider: PROVIDER,
      port: MOCK_PROVIDER_PORT,
      log: process.cwd() + '/logs/pact.log',
      dir: process.cwd() + '/pacts',
      logLevel: 'INFO',
      spec: 2
    })
    await provider.setup()
  })

  describe('getById', () => {

    const

    beforeAll(function(done)) {
      provider.addInteraction({
        uponReceiving: 'A customer fetched by id',
        withRequest: {
          method: 'GET',
          path: `/customers/${id}`
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: Matchers.somethingLike(ex)
        }

      })
    }
  })






  // validate the interactions you've registered and expected occurred
  // this will throw an error if it fails telling you what went wrong
  // This should be performed once per interaction test
  afterEach(() => provider.verify())

  // write the pact file for this consumer-provider pair,
  // and shutdown the associated mock server.
  // You should do this only _once_ per Provider you are testing,
  // and after _all_ tests have run for that suite
  afterAll(async () => {
    await.provider.finalize()
  })

});
