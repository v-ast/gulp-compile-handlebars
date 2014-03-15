# [gulp](https://github.com/wearefractal/gulp)-template-handlebars
Forked from [gulp-template](https://github.com/sindresorhus/gulp-template)

> Compile [Handlebars templates](http://www.handlebarsjs.com/)

## Install

Install with [npm](https://npmjs.org/package/gulp-template-handlebars)

```
npm install --save-dev gulp-template-handlebars
```


## Example

### `src/hello.handlebars`

```erb
<h1>Hello {{firstName}}</h1>
```

### `gulpfile.js`

```js
var gulp = require('gulp');
var handlebars = require('gulp-template-handlebars');

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
