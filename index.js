var gutil = require('gulp-util');
var through = require('through2');
var Handlebars = require('handlebars');
var fs = require('fs');

module.exports = function (data, opts) {

	var options = opts || {};
	//Go through a partials object
	if(options.partials){
		for(var p in options.partials){
			Handlebars.registerPartial(p, options.partials[p]);
		}
	}
	//Go through a helpers object
	if(options.helpers){
		for(var h in options.helpers){
			Handlebars.registerHelper(h, options.helpers[h]);
		}
	}


	// Go through a partials directory array
	if(options.batch){
		// Allow single string
		if(typeof options.batch === 'string') options.batch = [options.batch];
			
		options.batch.forEach(function (b) {
			var filenames = fs.readdirSync(b);

			filenames.forEach(function (filename) {
				// Needs a better name extractor (maybe with the path module)
				var name = filename.split('.')[0];
				// Don't allow hidden files
				if(!name.length) return;
				var template = fs.readFileSync(b + '/' + filename, 'utf8');
				Handlebars.registerPartial(b.split('/').pop() + '/' + name, template);
			});
		});
	}

	/**
	 * For handling unknown partials
	 * @method mockPartials
	 * @param  {string}     content Contents of handlebars file
	 */
	var mockPartials = function(content){
		var regex = /{{> (.*)}}/gim, match, partial;
		if(content.match(regex)){
			while((match = regex.exec(content)) !== null){
				partial = match[1];
				//Only register an empty partial if the partial has not already been registered
				if(Handlebars.partials.hasOwnProperty(partial)){
					Handlebars.registerPartial(partial, gutil.noop);	
				}
			}
		}
	};


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
			var fileContents = file.contents.toString();
			if(options.ignorePartials){
				mockPartials(fileContents);		
			}
			var template = Handlebars.compile(fileContents);
			file.contents = new Buffer(template(data));
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-compile-handlebars', err));
		}

		this.push(file);
		cb();
	});
};