module.exports = {
    version: "0.0.2",

    css: {
        scss: {
            config: {
                outputStyle: "compressed" // nested, compact, expanded and compressed are available options
            }
        },
        autoprefixer: {
            enabled: true,
            config: {
                browsers: ["> 0.1%"]
            }
        },
        pxToRem: {
            enabled: true,
            config: {
                rootValue: 16,
                propList: [
                    "font",
                    "font-size",
                    "line-height",
                    "letter-spacing"
                ],
                selectorBlackList: [/^html$/, /^body$/], // Ignore font-size definition on html or body
                replace: false
            }
        },
        cleanCss: {
            enabled: "dev, prep, prod",
            config: {
                compatibility: "ie8"
            }
        }
    },

    js: {
        babeljs: {
            enabled: true,
            config: {
                minified: true,
                presets: [
                    [
                        "env",
                        {
                            targets: {
                                browsers: ["> 0.1%"]
                            }
                        }
                    ]
                ]
            }
        }
    },

    images: {
        imagemin: {
            enabled: true,
            config: [
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({ plugins: [{ removeViewBox: true }] })
            ]
        }
    },

    svg: {
        svgmin: {
            enabled: true,
            config: {}
        }
    },

    paths: {
        // "DESTINATION" : ['SOURCE']
        css: {
            "{env}/css/main1and2/": ["scss/main1.scss", "scss/main2.scss"],
            "{env}/css/mainAll/": ["scss/main*.scss"],
            "{env}/css/all/": ["scss/**/*.scss"]
            // "{env}/css/mainAll/": ['sass/main*.scss'] // Please make sure, that your compiled files pointing to an unique destination.
            // "{env}/css/all/": ['sass/**/*.scss']
        },
        js: {
            "{env}/js/main.min.js": ["js/**/*.js"],
            "{env}/jsDir/": ["js/**/*.js"]
        },
        images: {
            "public_html/images/": "public_html/images/*"
        },
        svg: {
            "public_html/svgs/": [
                "svgs/scene02_earn_overview.svg",
                "svgs/scene03_pay_overview.svg"
            ]
        }
    },

    // All tasks above are available (css, js, images and svg)
    combinedTasks: {
        default: ["css", "js"],
        compile: ["css", "js"],
        compress: ["images", "svg"]
    },

    watchTask: {
        css: ["css"],
        js: ["js"]
    }
};
