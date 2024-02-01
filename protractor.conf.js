exports.config = {
    baseUrl: 'http://localhost:3000',

    chromeDriver: require(`chromedriver/lib/chromedriver`).path,

    SELENIUM_PROMISE_MANAGER: false,

    directConnect: true,

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
            args: [
                '--disable-web-security',
                '--allow-file-access-from-files',
                '--allow-file-access',
                '--disable-infobars',
                '--ignore-certificate-errors',
                '--headless',
                '--disable-gpu',
                '--window-size=1024x768',
            ],
        }
    }
};
