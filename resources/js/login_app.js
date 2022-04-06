import User from "./models/user";

/**
 */

require('./configs');   //  load configurations
require('./bootstrap'); //  load bootstrap

// load vue library
import Vue from 'vue';

Vue.component('login-component', require('./components/public/Login').default);

/**
 * Import VueCookies
 *
 * And configure for cookies to last for 6 hours by default
 * */
// import VueCookies from 'vue-cookies';
// Vue.use(VueCookies);
// $cookies.config('10h');

// import Vuex state storage object
import store from './store/index';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading, {canCancel: true, color: '#5e72e4', loader: 'dots' });

require('./save'); //  token storage mechanism

let token = window.Save.get('token');
if (token != null) {

    /**
     * If Authorization header not added to axios,
     * add Bearer token to axios header.
     * */
    if (window.axios.defaults.headers.common['Authorization'] == null) {

        window.axios.defaults.headers.common['Accept'] = 'application/json';
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    axios.get('/user')
        .then(res => {

            if (res.data.user !== undefined)
            {
                store.state.auth = new User(res.data.user);
                location.href = store.state.auth.getHome;
            }

        }).catch(err => {
            //console.error(err);
        });
}

const app = new Vue({
    el: '#app',
    store,
}); // construct vue app object
