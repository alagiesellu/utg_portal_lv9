const authTokenKey = 'UTG_PORTAL_';

window.Save = {

    storeAuthToken: function (data)
    {
        localStorage.setItem(window.cookies_key_start + authTokenKey, data);
    },

    getAuthToken: function ()
    {
        return localStorage.getItem(window.cookies_key_start + authTokenKey);
    },

    get: function(key)
    {
        return localStorage.getItem(window.cookies_key_start+key);
    },

    store: function(key, data)
    {
        localStorage.setItem(window.cookies_key_start+key, data);
    },

    clear: function()
    {
        localStorage.clear()
    },
};
