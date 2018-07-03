'use strict';

var fs        = require('fs');
var path      = require('path');
var glob      = require('glob');
var svgstore  = require('svgstore');
const SVGO    = require('svgo');
const ejs = require('ejs');

let svgo = new SVGO({
  plugins: [
    {cleanupNumericValues: {floatPrecision: 2}},
    {removeStyleElement: true},
    {removeTitle: true},
    {removeViewBox: false}
  ],
  multipass: true,
});

const template = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SVG Icons</title>
    <style>
      body{margin: 0; background: black; text-align: center; font-family: sans-serif}
      ul{margin: 0; padding: 0; list-style: none;}
      li{
        display: inline-block;
        padding: 2em;
        width: 90px;
        height: 90px;
        vertical-align: top;
      }
      .icon{max-width: 28px; max-height: 28px; fill: white; display: inline-block; vertical-align: middle;}
      .name{
        font-size: 80%;
        background: black;
        padding: 10px;
        color: white;
        margin-top: 1em;
      }
    </style>
  </head>
  <body>
  <span style="visibility: hidden; position: absolute; z-index: -1;">
    <!-- SVG-Sprite -->
    <%- svgSymbols %>
  </span>
  <div class="svgsprite">
    <ul>
      <% icons.forEach(function(file){ %>
      <li>
        <svg class="icon">
          <use xlink:href="#<%- file.id %>"/>
        </svg>
        <div class="name"><%- file.id %></div>
      </li>
      <% }); %>
    </ul>
  </div>
  </body>
  </html>
`;

var inputs = glob.sync('src/assets/icons/raw/*.svg');

let cleanSvgPromises = inputs.map(filepath => (
  new Promise((resove, reject) => {
    svgo.optimize(
      fs.readFileSync(filepath, 'utf8'),
      {path: filepath}
    ).then(({data, info}) => {
      resove({
        filepath,
        data,
        info,
      });
    }).catch(e => reject(e));
  })
));

let name = (file) => ('icon-' + path.basename(file, '.svg'));

Promise.all(cleanSvgPromises.map(p => p.catch(e => e)))
  .then(cleanSvgArry => {

    // Build up the spritesheet
    var sprites = cleanSvgArry.reduce(function(sprites, file) {
      if(!file.data) return sprites;
      //return sprites.add(name(file), fs.readFileSync(file, 'utf8'));
      return sprites.add(name(file.filepath), file.data);
    }, svgstore({ inline: true }));

    fs.writeFileSync('src/assets/icons/symbols.svg', sprites);
    fs.writeFileSync(
      'src/assets/icons/symbols.html',
      ejs.render(template, {
        svgSymbols: sprites.element.html(),
        icons: cleanSvgArry.map((file) => {
          if(!file.data) return {id: 'error:'};
          return {id: name(file.filepath)};
        }),
      })
    );
  });
