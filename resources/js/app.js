require('./configs');   //  load configurations
require('./bootstrap'); //  load bootstrap

// load vue library
import Vue from 'vue';
window.Vue = Vue;

import Vuex from 'vuex';
import User from "./models/user";       // user object to store user in vue state
import methods from "./methods";        // useful functions
import routes from "./routes/routes";   // router class for all routes
import state from './store/state';

let store = new Vuex.Store({state});

/**
 * Imports :
 *      - VueCookies,
 *      - VModal
 *      - VueRouter
 *      - vueCountryRegionSelect
 *      - vSelect
 *      - VueHtmlToPaper
 *      - Loading
 *      - Notifications
 *
 * & imported as vue component :
 *      - laravel-vue-pagination
 * */

import VModal from 'vue-js-modal';
Vue.use(VModal);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import vueCountryRegionSelect from 'vue-country-region-select';
Vue.use(vueCountryRegionSelect);

import vSelect from 'vue-select';
Vue.component('v-select', vSelect);
import 'vue-select/dist/vue-select.css';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading, {canCancel: true, color: '#5e72e4', loader: 'dots' });

import Notifications from 'vue-notification';
Vue.use(Notifications);

Vue.component('laravel-vue-pagination', require('laravel-vue-pagination'));

Vue.component('fake-form-input', require('./components/layouts/FakeFormInputs').default);
Vue.component('layout-navbar-profile', require('./components/layouts/NavbarProfile').default);
Vue.component('layout-footer', require('./components/layouts/Footer.vue').default);
Vue.component('layout-sidebar', require('./components/layouts/Sidebar.vue').default);
Vue.component('layout-navbar', require('./components/layouts/Navbar').default);

require('./save'); //  token storage mechanism

let token = window.Save.getAuthToken();

console.log(token)

if (token != null) { // if token exist

    /**
     * If Authorization header not added to axios,
     * add Bearer token to axios header.
     * */
    if (window.axios.defaults.headers.common['Authorization'] == null) {

        window.axios.defaults.headers.common['Accept'] = 'application/json';
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    // get user to see if token still valid
    axios.get('/user')
        .then(res => {

            store.state.auth = new User(res.data.user); // store user object in vue state
            store.state.home = store.state.auth.getHome; // store the users home page link in vue state

            // load vue component with state and appropriate objects
            window.app = new Vue({
                el: '#app',
                store: store,
                methods: methods,
                router: new VueRouter(routes),
            }); // construct vue app object

            // methods.refresh_token();
            methods.fetch_configs();

        })
        .catch(err => {
            methods.axios_error(err);
        });
} else {
    // if token dose not exist, redirect to login page
    methods.keep_redirect();
    location.href = '/';
}


axios.interceptors.request.use(
    request => methods.axios_request(request),
);

axios.interceptors.response.use(
    response => methods.axios_response(response),
    error => methods.axios_error(error),
);
