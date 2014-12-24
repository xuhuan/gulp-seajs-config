"use strict";
var crypto = require("crypto"),
	through = require("through2"),
	path = require("path"),
	File = require("gulp-util").File;

module.exports = function(opts) {
	opts = typeof(opts) === "string" ? {
		target: opts
	} : (opts || {});
	opts.target = opts.target || "./seajs-config.js";
	opts.algorithm = opts.algorithm || "sha1";
	opts.length = opts.length || null;
	opts.flatten = opts.flatten === true;
	opts.cwd = opts.cwd || process.cwd();

	var map = {};

	if (!map.hasOwnProperty(opts.target)) {
		map[opts.target] = {
			'map': []
		};
	}

	var getHashName = function(file) {
		if (file.isNull()) return '';
		var contents = file.isBuffer() ? file.contents : new Buffer();
		if (file.isStream()) file.contents.pipe(contents);
		var digest = crypto.createHash(opts.algorithm);
		digest.update(file.contents);
		var tag = digest.digest("hex");
		var name = opts.flatten ? path.basename(file.path) : path.relative(opts.cwd, file.path).replace(/\\/g, '/');
		return [name, name + '?' + (opts.length ? tag.substr(0, opts.length) : tag)];
	}

	var stream = through.obj(function(file, enc, done) {
		if (file.isNull()) return;
		map[opts.target].map.push(getHashName(file));
		done();
	}, function(done) {
		this.push(new File({
			cwd: opts.cwd,
			base: opts.cwd,
			path: path.join(opts.cwd, opts.target),
			contents: new Buffer('seajs.config(' + JSON.stringify(map[opts.target]) + ');')
		}));
		done();
	});

	return stream;
};
