const { computeExecutablePath } = require('@puppeteer/browsers')
const { resolve } = require('path')

// Chrome 129 is the last version that correctly supports Selenium 3
// Chrome 130 and later require Selenium 4 for browser.executeScript to correctly resolve WebElement arguments
const chromeVersion = '129';

const binaries = {
    chromedriver: computeExecutablePath({ browser: 'chromedriver', buildId: chromeVersion, cacheDir: '.' }),
    chrome: computeExecutablePath({ browser: 'chrome', buildId: chromeVersion, cacheDir: '.' }),
}

exports.config = {
    baseUrl: 'http://localhost:3000',

    SELENIUM_PROMISE_MANAGER: false,

    directConnect: true,

    chromeDriver: binaries.chromedriver,

    // https://github.com/angular/protractor/blob/master/docs/timeouts.md
    allScriptsTimeout: 110000,

    specs: [ './spec/*.spec.ts', ],

    // =========================
    // Serenity/JS Configuration
    // =========================

    framework:      'custom',
    frameworkPath:  require.resolve('@serenity-js/protractor/adapter'),

    serenity: {
        // Use Jasmine test runner adapter
        // see: https://serenity-js.org/api/jasmine/
        runner: 'jasmine',

        // Configure reporting services
        // see: https://serenity-js.org/handbook/reporting/
        crew: [
            '@serenity-js/console-reporter',
            [ '@serenity-js/serenity-bdd',          { specDirectory: './spec' } ],
            [ '@serenity-js/web:Photographer',      { strategy: 'TakePhotosOfInteractions'    } ],
            // [ '@serenity-js/web:Photographer',   { strategy: 'TakePhotosOfFailures'        } ],
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: './target/site/serenity' } ],
        ]
    },

    onPrepare: function() {
        require('ts-node/register');

        /**
         * If you're interacting with a non-Angular application,
         * uncomment the below onPrepare section,
         * which disables Angular-specific test synchronisation.
         */
        // browser.waitForAngularEnabled(false);
    },

    jasmineNodeOpts: {
        // Jasmine configuration, see https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/
        specDirectory: './spec',
    },

    capabilities: {
        browserName: 'chrome',

        // see https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities#loggingpreferences-json-object
        loggingPrefs: {
            browser: 'SEVERE' // "OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL".
        },

        chromeOptions: {
            w3c: false,
            binary: binaries.chrome,
            excludeSwitches: [ 'enable-automation' ],
            args: [
                '--disable-web-security',
                '--allow-file-access-from-files',
                '--allow-file-access',
                '--disable-infobars',
                '--ignore-certificate-errors',
                '--headless',
                '--disable-gpu',
                '--window-size=1024x768',
                // Additional flags for CI environments (GitHub Actions, etc.)
                '--no-sandbox',                     // Required for running as root in Docker/CI
                '--disable-dev-shm-usage',          // Overcome limited resource problems
                '--disable-setuid-sandbox',         // Additional sandbox disabling for CI
                '--remote-debugging-port=9222',     // Helps with DevToolsActivePort issues
            ]
        }
    }
};
