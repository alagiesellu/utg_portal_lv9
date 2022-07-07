const authTokenKey = 'auth_token';
const loginRedirectKey = 'auth_token';

window.Save = {

    storeAuthToken: function (data)
    {
        this.store(authTokenKey, data)
    },

    getAuthToken: function ()
    {
        return this.get(authTokenKey)
    },

    removeAuthToken: function ()
    {
        this.remove(authTokenKey)
    },

    storeLoginRedirect: function (data) {
        this.store(loginRedirectKey, data)
    },

    getLoginRedirect: function ()
    {
        return this.get(loginRedirectKey)
    },

    removeLoginRedirect: function ()
    {
        this.remove(loginRedirectKey)
    },

    get: function(key)
    {
        return localStorage.getItem(window.cookies_key_start + key);
    },

    store: function(key, data)
    {
        console.log(data)
        localStorage.setItem(window.cookies_key_start + key, data);
    },

    remove: function (key)
    {
        localStorage.removeItem(key)
    },

    clear: function()
    {
        localStorage.clear()
    },
};
