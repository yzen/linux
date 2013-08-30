/*

GPII Integration Testing

Copyright 2013 Raising the Floor International

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

/*global __dirname, require*/

"use strict";

var fluid = require("universal"),
    path = require("path"),
    gpii = fluid.registerNamespace("gpii");

fluid.require("../../node_modules/universal/tests/IntegrationTests.js",
    require);

require("gsettingsBridge");
require("orca");

var configPath = path.resolve(__dirname, "./integrationTests/setup1/configs");
var gpiiConfig = {
   nodeEnv: "development-config",
   configPath: configPath
};

var testDefs = [{
    name: "Testing Mikel Vargas using Flat matchmaker (onscreen keyboard)",
    gpiiConfig: gpiiConfig,
    token: "MikelVargas",
    settingsHandlers: {
        "gpii.gsettings": {
            "data": [{
                "settings": {
                    "slowkeys-delay": 400,
                    "slowkeys-enable": true,
                    "bouncekeys-delay": 200,
                    "mousekeys-enable": true,
                    "stickykeys-enable": true,
                    "bouncekeys-enable": true,
                    "mousekeys-max-speed": 850,
                    "mousekeys-init-delay": 120,
                    "mousekeys-accel-time": 800
                },
                "options": {
                    "schema": "org.gnome.desktop.a11y.keyboard"
                }
            }]
        }
    },
    processes: [{
        command: "gsettings get org.gnome.desktop.a11y.applications " +
            "screen-keyboard-enabled",
        expect: "true"
    }]
}, {
    name: "Testing Sammy using Flat matchmaker",
    gpiiConfig: gpiiConfig,
    token: "sammy",
    settingsHandlers: {
        "gpii.gsettings": {
            "data": [{
                "settings": {
                    "mag-factor": 2,
                    "mouse-tracking": "centered"
                },
                "options": {
                    "schema": "org.gnome.desktop.a11y.magnifier"
                }
            }, {
                "settings": {
                    "text-scaling-factor":1
                },
                "options": {
                    "schema": "org.gnome.desktop.interface"
                }
            }]
        }
    },
    processes: [{
        command: "gsettings get org.gnome.desktop.a11y.applications " +
            "screen-magnifier-enabled",
        expect: "true"
    }]
},
{
    name: "Testing os_common using Flat matchmaker",
    gpiiConfig: gpiiConfig,
    token: "os_common",
    settingsHandlers: {
       "gpii.gsettings": {
            "data": [{
                "settings": {
                    "mag-factor": 1.5,
                    "screen-position": "full-screen",
                    "show-cross-hairs": false
                },
                "options": {
                    "schema": "org.gnome.desktop.a11y.magnifier"
                },
            }, {
                "settings": {
                    "gtk-theme": "HighContrast",
                    "icon-theme": "HighContrast",
                    "text-scaling-factor": 1.0,
                    "cursor-size": 41
                },
                "options": {
                    "schema": "org.gnome.desktop.interface"
                }
            }]
        }
    },
    processes: [{
        command: "gsettings get org.gnome.desktop.a11y.applications " +
            "screen-magnifier-enabled",
        expect: "true"
    }]
},
{
    name: "Testing screenreader_common using Flat matchmaker",
    gpiiConfig: gpiiConfig,
    token: "screenreader_common",
    settingsHandlers: {
        "gpii.orca": {
            "data": [{
                "settings": {
                    "sayAllStyle": 1,
                    "enableEchoByWord": true,
                    "enableEchoByCharacter": false,
                    "enableTutorialMessages": false,
                    "verbalizePunctuationStyle": 0,
                    "enableSpeech": true,
                    "voices" : {
                        "default" : {
                            "established": false,
                            "rate": 102.27272727272727,
                            "family": {
                                "locale": "en",
                                "name": "en-westindies"
                            }
                        },
                        "uppercase": { "average-pitch": 5.6 },
                        "system": { "established": false },
                        "hyperlink": { "established": false }
                    }
                },
                "options": {
                    "user": "screenreader_common"
                }
            }]
        }
    },
    processes: []
}];

fluid.defaults("gpii.integrationTesting.tests", {
    gradeNames: ["autoInit", "gpii.integrationTesting.testCaseHolder"],
    testDefs: testDefs,
    modules: [ {
        name: "Full login/logout cycle",
        tests: gpii.integrationTesting.buildTestFixtures(testDefs)
    }]
});

fluid.test.runTests([
    "gpii.integrationTesting.testEnv"
]);
