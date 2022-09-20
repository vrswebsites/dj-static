let mix = require('laravel-mix');
let path = require('path');
require('laravel-mix-purgecss');

mix.setPublicPath('./dist/')

	.disableSuccessNotifications()
	
	.options({
		terser: {
			extractComments: false,
		},
		processCssUrls: false
	})
	
	.sass('resources/styles/main.scss', 'dist/styles')
		
	.copy('resources/fonts/*', 'dist/fonts')
	
	.copy('resources/images/*', 'dist/images')
	
	.browserSync({
		server: true,
		injectChanges: true,
		files: [
			'dist/**/*css',
			'resources/styles/**/*.scss',
			'**/*.html',
			'**/*.php',
		],
	})
	
	if (mix.inProduction()) {
		mix.version();
		mix.purgeCss({
			content: [path.join(__dirname, '**/*.html')],
			keyframes: true,
		});
	}