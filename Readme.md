# Jose Quinto Blog

This is the source code for my blog [blog.josequinto.com](https://jquintozamora.github.io). 

These are some interesting features:
    - [Hexo](https://hexo.io) to generate static pages.
    - [Algolia](https://www.algolia.com) as a platform to search posts.
    - My own theme customized based on [hexo-theme-melody](https://github.com/Molunerfinn/hexo-theme-melody).
    - It is hosted as GitHub pages and served with a custom domain.
    - It uses [clean-css](https://github.com/jakubpawlowicz/clean-css) to minify CSS assets, which are later inlined.


## Install

After cloning the project, install the `npm` dependencies and `Hexo`:

`$ npm i && npm i hexo -g`

## Develop

`$ npm run dev`

Then open http://localhost:4000/ in a browser.

## Deploy

`$ npm run deploy`