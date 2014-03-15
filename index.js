'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var Handlebars = require('handlebars');

module.exports = function (data, options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-compile-handlebars', 'Streaming not supported'));
			return cb();
		}

		try {
			var template = Handlebars.compile(file.contents.toString());
			file.contents = new Buffer(template(data));
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-compile-handlebars', err));
		}

		this.push(file);
		cb();
	});
};
