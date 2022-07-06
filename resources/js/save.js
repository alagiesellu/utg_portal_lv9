import Vue from 'vue';
import VueCookies from 'vue-cookies'
Vue.use(VueCookies, { expire: '7d'})

const authTokenKey = 'UTG_PORTAL_';

window.Save = {

    storeAuthToken: function (data)
    {
        Vue.$cookies.set(window.cookies_key_start + authTokenKey, data);
    },

    getAuthToken: function ()
    {
        return Vue.$cookies.get(window.cookies_key_start + authTokenKey);
    },

    get: function(key)
    {
        return Vue.$cookies.get(window.cookies_key_start+key);
    },

    store: function(key, data)
    {
        Vue.$cookies.set(window.cookies_key_start+key, data);
    },

    clear: function()
    {
        for (const key of Vue.$cookies.keys()) {
            Vue.$cookies.remove(key);
        }
    },
};
