---
title: 'A beginner’s guide to build a new SPA with ES6, SCSS, React, Webpack and HMR.'
tags:
  - English
url: 831.html
id: 831
categories:
  - ES6
  - HMR
  - javascript
  - react
  - React Hot Loader 3
  - SCSS
  - SPA
  - webpack
date: 2016-11-14 18:45:18
---

Recently, I have been working on a project which used **ReactJS** to build several SPAs (Single Page Applications).

I’ll openly admit it was a pain for me to get working even a basic project or starter template. The reason is because there **are lots of new concepts,** **frameworks** and **technologies**. I decided to write down some clarifications, notes, learning techniques and starter template which I did in the process to understand all this front end stack.

The reason for doing other React starter template for single page applications (**SPA**) is because when I started to look into templates it took to me hours and hours of googling and testing different templates to have some starting point for my SPA application.

There are templates with hundreds of dependencies. Why not reduce to [the minimal needed to start playing with React](https://github.com/jquintozamora/react-es6-webpack-minimal-starter-template)?

**Let's try! **

Let´s describe the main components to configure in our project:

*   **Development Server**
*   **JavaScript and Frameworks**
*   **Package Manager**
*   **Build System - Bundler **
*   **Browser Sync, Live Reload and HMR (Hot Module Replacement) **
*   **Styling**
&nbsp;

## Development Server

As we pretend to do Web Development could be ideal to configure some web server locally for faster developing.

What web server should we use? IIS Express? Tomcat? Node Server?... **We don´t want a full-featured Web Server for our dev local machine**, what we want is more integration with tooling, plugins, transpilers, etc. So instead of using Web Server, we will use a Dev Server. Normally, using React + ES6 + Webpack we should a Node.js server.

### express vs webpack-dev-server

*   **Express** is a Node.js server. If you want advanced configuration you can use Express directly + configure yourself the integration with webpack.
*   **Webpack-dev-server** is a Node.js Express server, which uses webpack-dev-middleware under the hood, which provides fast in-memory access to the webpack assets to generate the webpack bundle.

### webpack-dev-server vs webpack-dev-middleware

*   **webpack-dev-server** provides you with a Node.js Express server + WebPack Integration + [Live Reloading](https://vimeo.com/100010922)
*   **webpack-dev-middleware** is kind of webpack connector for dev servers. This can be useful if you already have a Node.js server or if you want to have full control over the server.
**NOTE**: You should use webpack-dev-server strictly for development. If you want to host your application, consider other standard solutions, such as IIS, Apache or Nginx.
> _I decided to start using _[_webpack-dev-server_](https://webpack.js.org/how-to/develop/#webpack-dev-server)_ initially as it is _[_easy to configure_](https://webpack.js.org/configuration/dev-server/)_ and require less dependencies._
&nbsp;

&nbsp;

## JavaScript and Frameworks

Nowadays, there are lot of languages and frameworks to do **Modern Web Development**. This is again, a swamp of doubts for beginners… Eventually, which will be generated is plain JavaScript + CSS + HTML because what browsers understands. But using some modern web [intermediate languages](https://en.wikipedia.org/wiki/JavaScript#Use_as_an_intermediate_language) and frameworks will make our life easier. This post is not about which language is the best to use, everyone has his own opinion… Depending on the language and frameworks we use we should be configuring our development environment in a different way.
> _I decided to use _[_ES6_](http://es6-features.org/)_ compiled with _[_Babel_](https://babeljs.io/)_ + _[_React_](https://github.com/petehunt/react-howto)_. For the starter template is enough, later we can add more external JS libraries if required._
&nbsp;

&nbsp;

## Package Manager

**NPM** is the most used package manager for JavaScript.

There is a new tool called [**yarn**](https://yarnpkg.com/), which is a dependency management tool. Just to avoid confusions, yarn is not a replacement for [NPM registry](https://medium.com/javascript-scene/faster-more-reliable-ci-builds-with-yarn-7dbc0ef31580#.pcu51efcw). Yarn is a client tool which allows us to manage** Deterministic dependencies **— with yarn.lock, you’ll get the same versions of the same packages installed in the same directory structure every time. That will save a lots of development efforts and frustrations.
> _I decided to use yarn as a client tool for package management instead of using npm install, I will use yarn._
&nbsp;

&nbsp;

## Build System - Bundler

Building large scale JavaScript applications requires functional programming and apply "divide and conquer"… In the same way we use classes using different files when programming on C#, we use Modules in JavaScript. Historically were introduced different Module Formats (**AMD**, **CommonJS**, **UMD**, …) and Module Loaders (**RequireJS**, **SystemJS**, …) where Module Format means syntax and Module Loader means execution or implementation. There are lots of JS projects developed using different approaches. Even **ES2015 (ES6)** has its own module format. Anyways, this post isn´t about [modules in JS](https://www.airpair.com/javascript/posts/the-mind-boggling-universe-of-javascript-modules), so let´s say that we have two different approaches to load modules to the browsers:

*   **Module Loaders**. Load the required JS Modules as a different files using JavaScript at execution time.
*   **Bundlers**. Package all the solution in one bundle.js file which contains all your application modules.

    *   Browserify, WebPack, …
> _I decided to use the build system / bundler called _[_WebPack_](https://webpack.js.org/concepts/)_ because it has some good features like: _> 
> 
> *   _Bundles AMD, CommonJS and ES2015 modules _
> *   [_Code splitting_](http://webpack.github.io/docs/code-splitting.html)
> *   _Bundles more than just a JavaScript modules (CSS, images, …) _
> *   _Uses loaders for transformation before bundling _> 
> 
>     *   _ES2015, SCSS, …_
&nbsp;

&nbsp;

## Browser Sync, Live Reload and HMR (Hot Module Replacement)

One of the coolest features in Web Development is **live reload** which means that every time you save your source files, the changes will be automatically reflected in the browser, and that means quick and fast development flow.

### Live Reloading vs Hot Module Replacement

*   **Live Reloading.** Provides a way to refresh browser when a source file has been changed.
*   **Hot Module Replacement.** This is a further step. It provides a way to patch the browser state without a full refresh. It is particularly powerful with technology such as React, because [allows for page refreshes without losing state](https://quickleft.com/blog/redux-in-plain-english-building-boilerplate/), So, if you have navigated through several pages and filled out several forms to arrive at a corner of your application where you’d like to test a bug, making a change in your application triggers an instant page refresh, while maintaining that state.

    *   Note: An IDE feature known as safe write can break hot loading. Please turn it off when using HMR.

### Which HMR do we need?

Just to be clear, what we need is a **Hot Module Replacement (HMR)** that integrates perfectly with **WebPack** and **React**. After googling a lot, there are different options to configure it:

*   **Using react-transform-hmr.** This [blog post](https://ctheu.com/2015/12/29/webpack-hot-reloading-and-react-how/) explains all the concepts really well and how to configure it. (it didn´t work for me).
*   Using r**eact-hot-loader.**

    *   This [blog post](https://medium.com/@baphemot/react-hot-module-reload-f6b3d34b9b86#.6mg303not) explains all the concepts and how to configure it. (it didn´t work for me neither)
    *   In this [issue of react-hot-loader Github´s page](https://github.com/gaearon/react-hot-loader/issues/243) it´s explained how to get it working!!!
    *   If you are using proxies or advanced scenarios, please [read this article](https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96#.2gmd2gpru).
> _I decided to use _[_React Hot Loader 3_](https://github.com/gaearon/react-hot-loader)_ integrated with WebPack as a HMR._
&nbsp;

&nbsp;

## Styling

There are three main CSS pre-processors: **Stylus**, **LESS** and **SASS**. SASS is a great option as it’s widely adopted and there are tons of mixins and tool sets available in the community.

### SASS integration with WebPack

We could use **SASS** directly using node-ssas tool which allows us to pre-process all .scss files and their @imports. An example of use here:

> node -i node-sass -g

> node-sass app/stylesheets/main.scss > dist/stylesheets/main.css

But ideally we should integrate SASS in webpack and HMR workflow. For development environment [it's recommended](https://github.com/webpack/extract-text-webpack-plugin/issues/30) NOT to separate the output CSS file from the bundle.js. As webpack is able to use the same bundle.js file for css as well and inject the CSS properly by using JS. Doing that, will be easier the HMR configuration for SASS (SCSS files). For production environment, we will need to publish the final CSS final as a separate file and we could use the plugin [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) to achieve it.
> _I decided to use SASS and follow directives of The _[_7-1 Pattern_](https://sass-guidelin.es/#the-7-1-pattern)_ using this _[_blog post_](http://hugogiraudel.com/2015/06/18/styling-react-components-in-sass)_ as a reference._
&nbsp;

&nbsp;

## Things To include in the template

There is a bunch of things I'd like to include in the starter template like:

*   [React Router](https://css-tricks.com/learning-react-router)
*   [Redux](https://css-tricks.com/learning-react-redux)
*   [Server Side Rendering](https://medium.com/@firasd/quick-start-tutorial-universal-react-with-server-side-rendering-76fe5363d6e#.s8k4bz7ki)
*   TDD. Configure Test Driven Development environment. Jest / Mocha, Chai, ...
*   Linting. Integrate with [eslint](http://eslint.org/docs/user-guide/configuring)
*   Webpack production configuration

    *   Add ExtractTextPluging, etc.
&nbsp;

&nbsp;

## Minimal Starter Template

> You can see and download the minimal starter template on Github: [https://github.com/jquintozamora/react-es6-webpack-minimal-starter-template](https://github.com/jquintozamora/react-es6-webpack-minimal-starter-template)> 
> 
> &nbsp;
&nbsp;

## More Starter Templates

There we have more well tested starter templates (more complex as well) as a reference:

*   Facebook Create React App: [https://github.com/facebookincubator/create-react-app](https://github.com/facebookincubator/create-react-app)
*   React, Redux, WebPack (well documented): [https://github.com/davezuko/react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)
*   Starter for Express, React, Redux, SCSS applications: [https://github.com/DimitriMikadze/express-react-redux-starter](https://github.com/DimitriMikadze/express-react-redux-starter)
*   React Hot Loader: [https://github.com/gaearon/react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)
*   Cory House: [https://github.com/coryhouse/react-slingshot](https://github.com/coryhouse/react-slingshot "https://github.com/coryhouse/react-slingshot")