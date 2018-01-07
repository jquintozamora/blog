module.exports = {
    "globDirectory": "./public/",
    "globPatterns": [
        "*.html",
        "*.xml",
        "favicon.ico",
        "devLogo.png",
        "manifest.json",
        "2016/**/*.{html,png,svg,jpg,gif,jpeg}",
        "2017/**/*.{html,png,svg,jpg,gif,jpeg}",
        "page/**/*.html",
        "js/**/*.js",
        "css/index.css",
        "icons/**/*.{png,svg,jpg,gif,jpeg}",
        "img/**/*.{png,svg,jpg,gif,jpeg}"
    ],
    "swDest": "public/sw.js",
    "clientsClaim": true,
    "skipWaiting": true,
    "ignoreUrlParametersMatching": [/version/],
    "runtimeCaching": [
        {
            "urlPattern": new RegExp('https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.min.css*'),
            "handler": "staleWhileRevalidate"
        },
        {
            "urlPattern": new RegExp('https://cdn.staticfile.org/font-awesome/4.7.0/fonts/fontawesome-webfont*'),
            "handler": "staleWhileRevalidate"
        }
    ]
}