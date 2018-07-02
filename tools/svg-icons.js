const fs = require('fs');
const glob = require("glob");
const path = require('path');
const ejs = require('ejs');

const SVGO = require('svgo');
const svgstore = require('svgstore');
// const SVGSpriter = require('svg-sprite')

const template = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SVG Icons</title>
    <style>
    </style>
  </head>
  <body>
  <span style="visibility: hidden; position: absolute; z-index: -1;">
    <!-- SVG-Sprite -->
    <%- svgSymbols %>
  </span>
  <div class="svgsprite">
    <ul class="svgsprite_list">
      <% icons.forEach(function(file){ %>
      <li class="svgsprite_list_item">
        <svg class="svgsprite_icon">
          <use xlink:href="#<%- file.id %>"/>
        </svg>
        <p class="svgsprite_id"><%- file.id %></p>
      </li>
      <% }); %>
    </ul>
  </div>
  </body>
  </html>
`;

let svgRawFolder = 'src/assets/icons/raw/*.svg',
  svgSymbols;

let svgo = new SVGO({
  plugins: [
    {cleanupIDs: {remove: true}},
    {cleanupNumericValues: {floatPrecision: 2}},
    {removeStyleElement: true},
    {removeTitle: true},
  ],
  multipass: true,
});

let rawSvgs = glob.sync(svgRawFolder);

let cleanSvgPromises = rawSvgs.map(filepath => (
  new Promise((resove, reject) => {
    svgo.optimize(
      fs.readFileSync(path.resolve(__dirname, '../', filepath), 'utf8'),
      {path: path.resolve(__dirname, '../', filepath)}
    ).then(({data, info}) => {
      resove({
        filepath,
        data,
        info,
      });
    })
      .catch(e => reject(e));
  })
));

let svgIDName = (filepath) => ('icon-' + path.basename(filepath, '.svg'));

Promise.all(cleanSvgPromises.map(p => p.catch(e => e)))
  .then(cleanSvgArry => {
    // svgs have been clean
    // console.log('cleanSvgArry length: ', cleanSvgArry);
    svgSymbols = cleanSvgArry.reduce((sprites, {filepath, data}) => {
      if(!data) return sprites;
      // console.log( path.basename(filepath, '.svg'))
      // console.log(data);
      return sprites.add(svgIDName(filepath), data);

    }, svgstore({inline: true}));


    fs.writeFileSync(
      path.resolve(__dirname, '../', 'src/assets/icons/symbols.svg'),
      svgSymbols
    );
    fs.writeFileSync(
      path.resolve(__dirname, '../', 'src/assets/icons/symbols.html'),
      ejs.render(template, {
        svgSymbols: svgSymbols.element.html(),
        icons: cleanSvgArry.map(({filepath}) => {
          if(!filepath) return {id: 'error'};
          return {id: svgIDName(filepath)};
        }),
      })
    );
  });

// console.log(files);
//
// imagemin(['src/assets/icons/raw/*.svg'], 'src/assets/icons/clean', {
//   use: [
//     imageminSvgo({
//       plugins: [
//         {cleanupIDs: {remove: true}},
//         {cleanupNumericValues: {floatPrecision: 2}},
//         {removeStyleElement: true},
//         {removeTitle: true},
//         {removeEditorsNSData: true},
//         {removeUnusedNS: true},
//       ],
//       multipass: true,
//     }),
//   ],
// }).then(function () {
//   // Svgs have been cleaned now combine
//   const t = svgstore({
//
//   })
//
//   console.log('T: ', t);
//
//   // svgspriteContent = fs.readFileSync('src/main/resources/svg/casa-svgsprite.svg', 'utf8');
//
// });
