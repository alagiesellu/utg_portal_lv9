
/**
 * Layout Components
 * */
Vue.component('layout-navbar', require('./components/layouts/Navbar').default);
Vue.component('layout-navbar-profile', require('./components/layouts/NavbarProfile').default);
Vue.component('layout-footer', require('./components/layouts/Footer.vue').default);
Vue.component('layout-sidebar', require('./components/layouts/Sidebar.vue').default);

Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('popups', require('./components/layouts/Popups'));
Vue.component('successful-gif', require('./components/layouts/Successful'));

Vue.component('login-component', require('./components/public/Login'));

/**
 * Dynamically define magic component
 * */

// Vue.component(
//     'magic-component',
//     require('./components/'+document.head.querySelector('meta[name="magic-component"]').content+'.vue').default
// );

// const req = require.context('./components/admin/', true, /\.(js|vue)$/i);
// req.keys().map(key => {
//     const name = key.match(/\w+/)[0];
//     window.components.push(name+'-component');
//     return Vue.component(name+'-component', req(key).default)
// });
