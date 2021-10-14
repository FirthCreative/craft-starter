// Master Gulp file for Firth Creative CraftCMS Projects
const { dest, parallel, series, src, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
const cleancss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');

function devbuild(){
		return src('src/css/**/*.css')
				.pipe(postcss([tailwindcss,autoprefixer]))
				.pipe(dest('web/assets/css/'))
				.pipe(browsersync.stream());
}

function devwatch(){
		browsersync.init({
				proxy: 'https://PROJECTDOMAIN.local'
		});
		watch('./src/css/**/*.css', devbuild);
		watch('./*.js', devbuild);
		watch('./templates/**/*.twig').on('change', series(devbuild, browsersync.reload));
}

function prodbuild(){
		return src('src/css/**/*.css')
				.pipe(postcss([tailwindcss,autoprefixer]))
				.pipe(cleancss())
				.pipe(dest('web/assets/css/'))
}

exports.watch     = series(devbuild, devwatch);
exports.devbuild  = devbuild;
exports.prodbuild = prodbuild;