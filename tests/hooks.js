"use strict";

const { defineSupportCode } = require("cucumber");
const browser = require("nightwatch-cucumber").client;

defineSupportCode(({ registerHandler }) => {
    registerHandler("BeforeFeatures", { timeout: browser.globals.stepTimeout * 4 }, () => {
        return browser;
    });

    registerHandler("BeforeFeature", () => {
        return browser;
    });

    registerHandler("AfterStep", () => {
        return browser;
    });
});
