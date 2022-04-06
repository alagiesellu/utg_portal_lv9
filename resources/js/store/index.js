import mutations from './mutations';
import getters from './getters';
import state from "./state";

let store = {
    state,
    mutations,
    getters,
};

export default store;
