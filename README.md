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
#Options
所有参数和默认值
```
.pipe(gsc({
    target:"./seajs-config.js",
    algorithm:"sha1",
    length:null,
    flatten:false,
    cwd:process.cwd()
}))
```
简单用法参数
```
.pipe(gsc("./seajs-config.js"))
```
Or
```
.pipe(gsc())
```

#License

MIT