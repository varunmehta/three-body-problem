// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');
//process.env.CHROME_BIN = require("puppeteer").executablePath()
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular', 'pact'],
    plugins: [
      require('karma-jasmine'),
      require('@pact-foundation/karma-pact'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      "node_modules/@pact-foundation/pact-web/pact-web.js"
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        timeoutInterval: 800000
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/ui'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true,
    restartOnFileChange: true,
    browserNoActivityTimeout: 1000000,
    /*pact: [
      {
        consumer: "ui",
        provider: "CustomerService",
        spec: 2,
        host: '127.0.0.1',
        port: 3000,
        log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
        dir: path.resolve(process.cwd(), '../pacts'),
        cors: true,
        logLevel: 'debug'
      }
    ],*/
    proxies: {
      '/customers': 'http://127.0.0.1:3000/customers'
    }
  });
};
