# [gulp](https://github.com/wearefractal/gulp)-compile-handlebars
Forked from [gulp-template](https://github.com/sindresorhus/gulp-template)
Inspired by [grunt-compile-handlebars](https://github.com/patrickkettner/grunt-compile-handlebars)

> Compile [Handlebars templates](http://www.handlebarsjs.com/)

## Install

Install with [npm](https://npmjs.org/package/gulp-compile-handlebars)

```
npm install --save-dev gulp-compile-handlebars
```


## Example

### `src/hello.handlebars`

```erb
<h1>Hello {{firstName}}</h1>
```

### `gulpfile.js`

```js
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');

gulp.task('default', function () {
	gulp.src('src/hello.handlebars')
		.pipe(handlebars({
			name: 'Kaanon'
		}))
		.pipe(rename('hello.html'))
		.pipe(gulp.dest('dist'));
});
```

### `dist/hello.html`

```html
<h1>Hello Kaanon</h1>
```

## License

MIT © [Kaanon MacFarlane](http://kaanon.com)
