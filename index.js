const fs = require("fs")
const browserify = require("browserify")
const watchify = require("watchify")
const errorify = require("errorify")

const b = browserify({
  entries: ["./src/index.jsx"],
  cache: {},
  packageCache: {},
  plugin: [watchify, errorify],
}).transform("babelify", {
  presets: ["es2015", "react"],
})

function bundle() {
  b.bundle().pipe(fs.createWriteStream("./static/js/bundle.js"))
}

b.on("update", bundle)
b.on("log", console.log)
b.on("error", console.error)
bundle()
