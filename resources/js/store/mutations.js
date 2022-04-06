let mutations = {

    STORE_ERRORS(state, errors) {

        errors.forEach(function(error){
            state.errors.push({'msg':error});
        });
    },

    RESET_ERRORS(state) {

        state.errors = [];
    },

    DROP_AUTH(state) {

        state.auth = null;
    },
};

export default mutations;
