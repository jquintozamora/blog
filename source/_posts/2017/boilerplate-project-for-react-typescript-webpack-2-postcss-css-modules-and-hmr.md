---
title: Boilerplate project for React, TypeScript, Webpack 2, postCSS, CSS-Modules and HMR
language: English
url: boilerplate-project-for-react-typescript-webpack-2-postcss-css-modules-and-hmr
id: 925
categories:
  - boilerplate
  - css modules
  - itcss
  - postcss
  - react
  - React Hot Loader 3
  - TypeScript
  - webpack
  - webpack 2
date: 2017-04-19 21:21:21
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
Few months ago, I was starting to use **WebPack 2** and **TypeScript** on my **React** projects. To be fair with ES6 and Babel, I really enjoyed build applications with them and they are in my hearth and that is why I did other post as well, about [how to build a new SPA with ES6, SCSS, React, Webpack and HMR](https://blog.josequinto.com/2016/11/14/how-to-build-a-new-spa-with-es6-scss-react-webpack-and-hmr-the-beginners-guide/).

But, then I met **TypeScript** and to be honest at the beginning was so annoying to deal with typings… but once you get used to it, that really rocks!

Then I decided to create a boilerplate, starter template, (o whatever name you like more) to help me and other people in the community create the baseline project for our React applications written in TypeScript, using webpack 2 as a bundler system, using **postcss** combined with **CSS Modules** as a Style technique and having **Hot Module Replacement **as a powerful feature which allows us to see the changes reflected on the browsers immediately.

You can see, download and use freely the boilerplate on this link: [https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS](https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS "https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS").

## Folder Structure

[![image](https://blog.josequinto.com/wp-content/uploads/2017/04/image_thumb-1.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/04/image-1.png)

&nbsp;

Lot’s of configurations are happening on this template, but I will recap the main features:

## Main Features

* [React](https://facebook.github.io/react)
* [TypeScript](https://www.typescriptlang.org/) (compiling directly to **ES5**)
    * Using [@types instead of TSD or typings folder](https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS/blob/master/tsconfig.json#L14)
* [Hot Module Replacement](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.xh6v0ht7j) ([React Hot Loader 3](https://github.com/gaearon/react-hot-loader/issues/243))
* [Webpack 2](https://webpack.js.org/)
    * [Webpack-dev-server](https://webpack.js.org/configuration/dev-server/)
    * [Webpack configuration for HMR](https://webpack.js.org/concepts/hot-module-replacement/)
    * Webpack production configuration
        * Split out css files using [ExtractTextPlugin](https://webpack.js.org/plugins/extract-text-webpack-plugin)
        * [UglifyJsPlugin with options](https://github.com/webpack/webpack/blob/v2.4.1/lib/optimize/UglifyJsPlugin.js)
        * Use include in the loader instead of the exclude. [More info](http://stackoverflow.com/questions/37823764/how-include-and-exclude-works-in-webpack-loader)
        * More perfomance tips: [here](https://medium.com/@khanght/optimize-webpack-production-build-ec594242b222#.bj3eyg65p)
        * [Webpack stats](https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS/blob/master/webpack/webpack.config.stats.js) (bundle optimization helper)
        * Generate stats.json file with profiler. Use [[http://webpack.github.io/analyse/](http://webpack.github.io/analyse/)] to analyze it.
        * [webpack visualizer](https://chrisbateman.github.io/webpack-visualizer/)
* [EditorConfig](http://editorconfig.org/)
* **Styling**
    * **General Styling** (app/stylesheets):
        * To include variables, generic CSS, normalize, reset, type selectors, ...
        * Methodology: [ITCSS](http://itcss.io/)
        * Tools: [postCSS](http://postcss.org/) with [import](https://github.com/postcss/postcss-import), [nesting](https://www.npmjs.com/package/postcss-nesting), [custom properties](https://github.com/postcss/postcss-custom-properties) and [autoprefixer](https://github.com/postcss/autoprefixer).

    * **Components Styling** (app/src/components/...):
        * To be the module's CSS
        * Techniques: [CSS Modules](https://github.com/css-modules/css-modules) + [postCSS](http://postcss.org/) ([import](https://github.com/postcss/postcss-import), [nesting](https://www.npmjs.com/package/postcss-nesting), [custom properties](https://github.com/postcss/postcss-custom-properties) and [autoprefixer](https://github.com/postcss/autoprefixer)).

* **Linting**
    * **TypeScript**:
        * [TSLint](https://palantir.github.io/tslint): general rules + [react rules](https://github.com/palantir/tslint-react)
        * [VS Code TSLint extension](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

    * **Styles**
        * [Stylint](https://stylelint.io/): CSS rules
            * Rules are on .stylelintrc.json
            * [All the rules](https://stylelint.io/user-guide/rules)
            * Install VS Code extensions:
                * [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
                * [stylefmt](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-stylefmt)
                    * Shift + Alt + F (Format Code)
                    * Be sure you have these configurations on your .vscode/settings.json:
                        * "css.validate": false,
                        * "stylelint.enable": true

## Stats
If you run “**npm run stats**” you will generate a HTML file with the bundle stats. That is really helpful to see which npm packages are you including and the size of them.

[![image](./image-2.png "image")](./image-2.png)


## Useful demo
As part of the **boilerplate**, you will see a **fancy demo** app with two react components already created:
*   **Viewer**
    *   [Stateless component](https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS/blob/master/app/src/components/Viewer/Viewer.tsx) (no state)
    *   Use [CSS-Modules](https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS/blob/master/app/src/components/Viewer/Viewer.module.css)

*   **ViewerItem**
    *   Create [3 types of Item Card object](https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS/blob/master/app/src/components/ViewerItem/ViewerItemCardType.ts) (singleton, factory static)
    *   Use [inline css using a function to assign CSS depending on the object](https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS/blob/master/app/src/components/ViewerItem/ViewerItem.inlined.css.ts)
    *   Render [Table layout compatible with emails](https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS/blob/master/app/src/components/ViewerItem/ViewerItem.tsx)
[![image](./image-3.png "image")](./image-3.png)

## Star it!
If you like it, [don't forget to ★ on Github](https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS).
