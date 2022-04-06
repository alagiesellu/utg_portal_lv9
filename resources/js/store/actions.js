import methods from "../methods";

let actions = {

    should_be_in({commit}) {

        commit('SHOULD_BE_IN');
    },

    should_be_out({commit}) {

        commit('SHOULD_BE_OUT');
    },

    login({commit}, post) {

        axios.post('/login', post)
            .then(res => {

                if (res.data.success === undefined)
                    commit('STORE_ERRORS', res.data.error);

                else {

                    Object.keys(res.data.success.user).forEach(function (key) {
                        sessionStorage.setItem(window.cookies_key_start+key, res.data.success.user[key]);
                    });

                    // keep backup at in cookies
                    $cookies.set(window.cookies_key_start+'token', res.data.success.user['token']);

                    const login_redirect = sessionStorage.getItem('login_redirect');

                    if (login_redirect)
                        window.location.href = login_redirect;
                    else
                        window.location.href = window.user_type[res.data.success.user['type']];
                }
            }).catch(err => {
                //console.error(err);
            });

    },

    reset_errors({commit}) {
        commit('RESET_ERRORS');
    },

    logout({commit}) {

        // request token deletion at api server
        axios.post('/logout')
            .then(res => {
                commit('STORE_ERRORS', res.data)
            }).catch(err => {
                //console.error(err);
            });

        commit('DROP_AUTH');

        methods.clear_auth();
    },

};

export default actions
