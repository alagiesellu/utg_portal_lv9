const authTokenKey = 'token';

window.Save = {

    storeAuthToken: function (data)
    {
        sessionStorage.setItem(window.cookies_key_start + authTokenKey, data);
    },

    getAuthToken: function ()
    {
        return sessionStorage.getItem(window.cookies_key_start + authTokenKey);
    },

    get: function(key)
    {
        return sessionStorage.getItem(window.cookies_key_start+key);
    },

    store: function(key, data)
    {
        sessionStorage.setItem(window.cookies_key_start+key, data);
    },

    clear: function()
    {
        sessionStorage.clear();
    },
};
