// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
var path = require('path');
  process.env.CHROME_BIN = require("puppeteer").executablePath()
module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine', '@angular-devkit/build-angular', 'pact'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@pact-foundation/karma-pact'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      "node_modules/@pact-foundation/pact-web/pact-web.js"
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        timeoutInterval: 2000
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
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome_without_security'],

    customLaunchers: {
      Chrome_without_security: {
        base: "ChromeHeadless",
        flags: ["--disable-web-security", "--disable-site-isolation-trials"],
      },
    },

    singleRun: false,
    restartOnFileChange: true,
    browserNoActivityTimeout: 400000,
    // pact: [
    //   {
    //     consumer: "ui",
    //     provider: "CustomerService",
    //     spec: 2,
    //     host: '127.0.0.1',
    //     port: 3000,
    //     log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    //     dir: path.resolve(process.cwd(), '../pacts'),
    //     cors: true
    //   }
    // ]
    // proxies: {
    //   '/customers': 'http://127.0.0.1:1234/customers'
    // }
  });
};
