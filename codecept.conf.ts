exports.config = {
  output: 'reports',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://try.vikunja.io',
      show: true
    }
  },
  include: {
    I: './steps_file',
    LoginPage: './pages/LoginPage.ts',
    config: './framework/config/configBdd'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.ts']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: 'tests/*_test.ts',
  name: 'OTUS-Test'
}