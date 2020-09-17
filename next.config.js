// next.config.js
// const withCSS = require('@zeit/next-css')
// module.exports = withCSS({
//   /* config options here */
// })

const withImages = require('next-images')
const withStyles = require('@webdeb/next-styles')

module.exports = withImages(
  withStyles({
    sass: true, // use .scss files
    modules: false, // style.(m|module).css & style.(m|module).scss for module files
    cssLoaderOptions: {
      url: false,
    },
  })
)
