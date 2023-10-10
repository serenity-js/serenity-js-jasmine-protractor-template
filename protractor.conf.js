const
    { ArtifactArchiver } = require('@serenity-js/core'),
    { ConsoleReporter } = require('@serenity-js/console-reporter'),
    { SerenityBDDReporter } = require('@serenity-js/serenity-bdd'),
    { Photographer, TakePhotosOfInteractions } = require('@serenity-js/web');

exports.config = {
    baseUrl: 'http://localhost:3000',

    chromeDriver: require(`chromedriver/lib/chromedriver`).path,

    SELENIUM_PROMISE_MANAGER: false,

    directConnect: true,

    // https://github.com/angular/protractor/blob/master/docs/timeouts.md
    allScriptsTimeout: 110000,

    framework:      'custom',
    frameworkPath:  require.resolve('@serenity-js/protractor/adapter'),

    specs: [ './spec/*.spec.ts', ],

    serenity: {
        runner: 'jasmine',
        crew: [
            ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
            ConsoleReporter.forDarkTerminals(),
            Photographer.whoWill(TakePhotosOfInteractions),     // slower execution, more comprehensive reports
            // Photographer.whoWill(TakePhotosOfFailures),      // fast execution, screenshots only when tests fail
            new SerenityBDDReporter(),
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
