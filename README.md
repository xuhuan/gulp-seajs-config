gulp-seajs-config
=================
生成seajs-config 的 map 参数的js文件，因为spm-build没有生成map的功能，所以写了这一个。

#Usage
```
var gulp = require('gulp');
var gsc = require('gulp-seajs-config');

gulp.task('default', function() {
	return gulp.src('./spm-modules/**/*.js')
		.pipe(gsc({
			target: './seajs-config.js',
			cwd: './spm-modules'
		}))
		.pipe(gulp.dest('./dest'));
});
```
#License

MIT