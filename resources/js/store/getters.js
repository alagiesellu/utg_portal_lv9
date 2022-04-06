let getters = {

    is_authenticated: state => {
        return state.auth.type !== "";
    },
    get_departments: state => {
        return state.admin_departments.concat(state.academic_departments);
    },
    get_admin_departments: state => {
        return state.admin_departments.concat(state.academic_departments);
    },
    get_academic_departments: state => {
        return state.admin_departments.concat(state.academic_departments);
    },
}

export default  getters
