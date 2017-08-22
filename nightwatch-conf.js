"use strict";

const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const geckodriver = require("geckodriver");

const basePath = "tests";
const reportsPath = "reports";

require("nightwatch-cucumber")({
    cucumberArgs: [
        "--require", `${basePath}/hooks.js`,
        "--require", `${basePath}/step-definitions`,
        "--retry", "2",
        "--format", "progress",
        "--format", `json:${reportsPath}/cucumber.json`,
        `${basePath}/features`
    ]
});

const options = {
    output_folder: reportsPath,
    page_objects_path: `${basePath}/page-objects`,
    custom_commands_path: "",
    custom_assertions_path: "",
    live_output: true,
    disable_colors: false,
    selenium: {
        start_process: true,
        server_path: seleniumServer.path,
        log_path: reportsPath,
        host: "127.0.0.1",
        port: 5557,
        cli_args: {
            "webdriver.chrome.driver": chromedriver.path,
            "webdriver.gecko.driver": geckodriver.path
        }
    },
    test_settings: {
        default: {
            screenshots: {
                enabled: true,
                on_failure: true,
                on_error: true,
                path: `${reportsPath}/screenshots`
            },
            launch_url: "http://localhost",
            selenium_host: "127.0.0.1",
            desiredCapabilities: {
                browserName: "chrome",
                javascriptEnabled: true,
                acceptSslCerts: true,
                chromeOptions: {
                    args: [
                        "window-size=1400,1000"
                    ]
                }
            },
            globals: {
                abortOnAssertionFailure: true,
                stepTimeout: 11000,
                retryAssertionTimeout: 1000,
                waitForConditionTimeout: 10000,
                asyncHookTimeout: 10000
            }
        }
    }
};

module.exports = options;
