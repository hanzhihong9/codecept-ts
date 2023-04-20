require('dotenv').config()
import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
import {devices} from 'playwright'
import envConfig = require('./resources/config')

import bootstrap = require('./presettings');
import testData = require('./resources/test_data/dev/test_data');


// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

// https://github.com/Microsoft/playwright/blob/master/src/deviceDescriptors.ts

const isHeadless = process.env.HEADLESS === 'true'

const browser = envConfig.browser
const isMobile = envConfig.isMobile
const mobileDevice = envConfig.mobileDevice


let playwrightConfig: CodeceptJS.PlaywrightConfig = {
    url: testData.homePageUrl || '',
    show: !isHeadless,
    restart: true,
    // basicAuth: {
    //     username: process.env.USERNAME_HOST,
    //     password: process.env.PASSWORD_HOST,
    // },
    waitForNavigation: 'networkidle0',
    waitForTimeout: 30000,
    getPageTimeout: 60000,
    waitForAction: 500,
    browser: 'chromium',
    chromium: {
        headless: isHeadless,
        args: [
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
        ],
    },
}

const mobileConfig = {
    emulate: devices[mobileDevice],
}

const webConfig = {
    windowSize: `${process.env.WINDOWS_WIDTH}x${process.env.WINDOWS_HEIGHT}`,
}

if (isMobile) {
    switch (browser) {
        case 'chromium':
            playwrightConfig = {
                ...mobileConfig,
                ...playwrightConfig,
                browser: 'chromium',
                chromium: {
                    headless: isHeadless,
                    args: [
                        '--no-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-setuid-sandbox',
                    ],
                },
            }
            break
        case 'webkit':
            playwrightConfig = {
                ...mobileConfig,
                ...playwrightConfig,
                browser: 'webkit',
            }
            break
        default:
            throw new Error(
                'Please setting up environtment BROWSER to webkit or chromium',
            )
    }
} else {
    switch (browser) {
        case 'chromium':
            playwrightConfig = {
                ...webConfig,
                ...playwrightConfig,
                browser: 'chromium',
                chromium: {
                    headless: isHeadless,
                    args: [
                        `--window-size=${process.env.WINDOWS_WIDTH},${process.env.WINDOWS_HEIGHT}`,
                        '--no-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-setuid-sandbox',
                    ],
                },
            }
            break
        case 'webkit':
            playwrightConfig = {
                ...webConfig,
                ...playwrightConfig,
                browser: 'webkit',
            }
            break
        default:
            throw new Error(
                'Please setting up environtment BROWSER to webkit or chromium',
            )
    }
}

export const config: CodeceptJS.MainConfig = {
    tests: './tests/**/*_test.ts',
    output: './codecept_output',
    helpers: {
        Playwright: playwrightConfig,
        CustomCommands: {
            require: './helpers/custom_commands_helper',
        },
        PlaywrightBrowser: {
            require: './helpers/playwright_browser_helper',
        },
        CatchRequestsHelper: {
            require: './helpers/catch_request_helper',
        },
        ChaiWrapper: {
            require: 'codeceptjs-chai',
        },
    },
    // https://codecept.io/bootstrap/
    bootstrap: bootstrap.bootstrap,
    teardown: bootstrap.teardown,
    bootstrapAll: bootstrap.bootstrapAll,
    teardownAll: bootstrap.teardownAll,

    include: {
        config: './resources/config',
        I: './steps_file',
        pages: './pages/pages_import',
        steps: './steps/steps_import',
        api: './api/index',
        translate: `./resources/translation/${process.env.SITE_LANGUAGE}`,
        testData: `./resources/test_data/${process.env.TEST_ENV}/test_data`,
    },
    plugins: {
        allure: {
            enabled: true,
            require: '@codeceptjs/allure-legacy',
            outputDir: './output',
        },
        autoDelay: {
            enabled: true,
            delayBefore: 1000,
        },
        retryFailedStep: {
            enabled: true,
            defaultIgnoredSteps: [],
            ignoredSteps: [
                'amOnPage',
                'send*',
                'execute*',
                'run*',
                'assert*',
                'waitFor*',
                'waitEmail*',
            ],
            minTimeout: 5000,
        },
        screenshotOnFail: {
            enabled: true,
        },
        customLocator: {
            enabled: true,
            showActual: true,
            // prefix: '$',
            // strategy: 'css',
            attribute: 'data-testid',
        },
    },
    mocha: {},
    name: 'boilerplate',
    fullPromiseBased: true
}
