const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

let version = 11;

mix.config.webpackConfig.output = {
    chunkFilename: 'v/' + version + '/scripts/[name].js',
    publicPath: '/',
};

mix.js('resources/js/app.js', 'public/v/'+version+'/js')
    .sass('resources/sass/app.scss', 'public/v/'+version+'/css');
mix.js('resources/js/login_app.js', 'public/v/'+version+'/js');

// mix.js('resources/js/app.js', 'public/js')
//     .postCss('resources/css/app.css', 'public/css', [
//         //
//     ]);
