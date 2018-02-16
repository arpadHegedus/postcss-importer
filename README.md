# PostCSS Node Sass [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">](https://github.com/postcss/postcss)

A [PostCSS](https://github.com/postcss/postcss) plugin to load and inline imports


## Installation

```js
npm install postcss-importer
```

## Features
* Import local files
* Declare import without extension to use the same extension as source file
* Multiple levels of importing files
* Import external files (from CDNs, etc.)

## Example

### Simple example

```css
/* main.css */
@import 'other.css';
div { color: black }

/* other.css */
body { color: red }
```
```css
/* result */
body { color: red }
div { color: black }
```

### External example

```css
/* input */
@import 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css';
div { color: black }
```
```css
/* result */
html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}
div { color: black }
```


## Usage

### [Postcss JS API](https://github.com/postcss/postcss#js-api)

```js
postcss([require('postcss-importer')]).process(yourCSS);
```

### [Gulp](https://github.com/gulpjs/gulp)

```js
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const importer = require('postcss-importer');
gulp.task('css', () => {
    gulp.src('path/to/dev/css')
        .pipe(postcss([
            /* postcss plugins before parsing sass */
            importer()
            /* postcss plugins after parsing sass */
        ]))
        .pipe(gulp.dest('path/to/build/css'));
});

/* rest of gulp file */
```

## Tests

```
npm test
```

## License
This project is licensed under the [MIT License](./LICENSE).
