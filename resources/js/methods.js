import User from "./models/user";
import countryRegionData from "country-region-data";
import store from "./store";
const dateFormat = require('dateformat');

export default {
    axios_request: function(request) {

        if (!request.headers.do_not_load)
            this.trigger_loading('');

        return request;
    },
    axios_response: function(response) {

        // console.log(response.data);

        if (!response.config.headers.do_not_load)
            this.close_loading();

        return response;
    },
    axios_error: function(error) {

        switch (error.response.status) {

            case 401: // authentication error
                this.keep_redirect();
                this.logout();
                break;

            case 468: // custom application errors
                this.post_errors(
                    JSON.parse(error.response.data.message),
                    'Application Error'
                );
                break;

            case 403: // forbidden error => user not allowed to do action
                this.post_errors(
                    [['You don\'t have role to do the following action.']],
                    error.response.statusText
                );
                break;

            default: // else
                this.post_errors(
                    [['System error.']],
                    error.response.statusText
                );
                break;
        }
        this.close_loading();

        return Promise.reject({ ...error });
    },
    fetch_configs: function() {

        axios.get('/admin/get/options-roles')
            .then((res) => {
                for (let option of res.data.options)
                    window.options[option.key] = option.value;
                window.roles = res.data.roles;
            })
            .catch(err => {
                this.axios_error(err);
            });
    },
    amount: function(amount) {
        return amount;
    },
    country: function(n) {
        for (let country of countryRegionData)
            if (country.countryShortCode === n)
                return country.countryName;
    },
    new_generate_transcript: function(profile) {
        console.log(profile)

        profile.transcript = {
            gpa: {
                point: 0,
                count: 0,
                calculated: 0,
            },
            terms: [],
            medical_terms: [],
        };

        let final_gs = null;
        let _grade = null;

        for (let grade of profile.grades) {

        }
    },

    generate_transcript: function(profile) {

        profile.transcript = {
            gpa: {
                point: 0,
                count: 0,
                calculated: 0,
            },
            terms: [],
            medical_terms: [],
        };

        let final_gs = null;
        let _grade = null;

        try {
            for (let grade of profile.grades) {
                if (
                    ! this.isNullOrUndefined(grade.term_class)
                    &&
                    ! this.isNullOrUndefined(grade.term_class.term)
                ) {

                    if (
                        this.isNullOrUndefined(profile.transcript.terms[grade.term_class.term_id])
                    )
                        profile.transcript.terms[grade.term_class.term_id] = {
                            grades: [],
                            term: grade.term_class.term,
                        };

                    // if normal term
                    if (
                        (
                            grade.term_class.term.external_exam_percentage === 0
                            ||
                            this.isNullOrUndefined(grade.term_class.term.external_exam_percentage)
                        )
                        &&
                        this.isNullOrUndefined(grade.term_class.term.term_id)
                    )
                    {
                        // get calculated grade data
                        _grade = this.calculate_grade_score(grade);

                        profile.transcript.terms[grade.term_class.term_id].grades.push(_grade);

                        // start with lowest gpa
                        final_gs = {point: 0};

                        // go though the grades and choose the grade with the highest total as final
                        for (let _g_t_d of _grade.transcript_data)
                        {
                            if (_g_t_d.gs.point > final_gs.point)
                            {
                                final_gs = _g_t_d.gs;
                            }
                        }

                        // count the final grade's point into gpa calculation
                        profile.transcript.gpa.point += parseFloat(final_gs.point) * grade.term_class.course.credit_hours;
                        profile.transcript.gpa.count += grade.term_class.course.credit_hours;
                    }
                    // else if term under medical year term, rotation academic term
                    else if (! this.isNullOrUndefined(grade.term_class.term.term_id))
                    {
                        // if rotation grade found first, so medical year already set but grade and term not set
                        // year needed before adding rotation grades
                        if (
                            this.isNullOrUndefined(profile.transcript.medical_terms[grade.term_class.term.term_id])
                        )
                            profile.transcript.medical_terms[grade.term_class.term.term_id] = {
                                rotations: [],
                                term: grade.term_class.term.term,
                                grades: [],
                            };
                        if (
                            this.isNullOrUndefined(
                                profile.transcript.medical_terms[grade.term_class.term.term_id].rotations[grade.term_class.term_id]
                            )
                        )
                            profile.transcript.medical_terms[grade.term_class.term.term_id].rotations[grade.term_class.term_id] = {
                                grades: [],
                                term: grade.term_class.term,
                            };

                        // get calculated grade data
                        profile.transcript.medical_terms[grade.term_class.term.term_id].rotations[grade.term_class.term_id].grades.push(
                            this.calculate_grade_score(grade)
                        );
                    }
                    // else if medical year term
                    else
                    //     if (! this.isNullOrUndefined(grade.term_class.term.external_exam_percentage) || grade.term_class.term.external_exam_percentage !== 0)
                    {
                        if (this.isNullOrUndefined(profile.transcript.medical_terms[grade.term_class.term.id]))
                            profile.transcript.medical_terms[grade.term_class.term.id] = {
                                term: grade.term_class.term,
                                rotations: [],
                                grades: [],
                                // grade: grade
                            };

                        // if rotation grade found first, so medical year already set but grade and term not set
                        // if (
                        //     this.isNullOrUndefined(profile.transcript.medical_terms[grade.term_class.term.id].grade)
                        // )
                        // {
                        //     profile.transcript.medical_terms[grade.term_class.term.id].term = grade.term_class.term;
                        //     profile.transcript.medical_terms[grade.term_class.term.id].grade = grade;
                        // }

                        profile.transcript.terms[grade.term_class.term.id].grades.push(
                            this.calculate_grade_score(grade)
                        );
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }

        // calculate GPA
        profile.transcript.gpa.calculated = profile.transcript.gpa.point/profile.transcript.gpa.count;

        profile.transcript.gpa.point = profile.transcript.gpa.count = 0;

        // now calculate medical year GPA
        for (const m_term of profile.transcript.medical_terms)
        {
            if (! this.isNullOrUndefined(m_term) && ! this.isNullOrUndefined(profile.transcript.terms[m_term.term.id])) {
                profile.transcript.terms[m_term.term.id].rotation_grades = []

                for (const rotation of m_term.rotations) {
                    if (! this.isNullOrUndefined(rotation)) {
                        for (const grade of rotation.grades) {
                            profile.transcript.terms[m_term.term.id].rotation_grades.push(grade)
                        }
                    }
                }
            }
        }


        // if there is medical terms, calculate new GPA
        if (profile.transcript.gpa.count !== 0)
            profile.transcript.gpa.calculated
                = (profile.transcript.gpa.calculated + (profile.transcript.gpa.point/profile.transcript.gpa.count)) / 2;

        return profile;
    },
    isNullOrUndefined: function (value) {
      return value === null || value === undefined;
    },
    calculate_grade_score: function(grade) {

        // store total grades from all assessments
        let score = 0;

        // cal total scores
        for (let i in grade.scores)
            if (grade.scores[i] != null) // if grade entered
                score += parseFloat(grade.scores[i]);

        // to hold grades data to be used on transcript generation
        grade.transcript_data = [
            {
                total:score,
                is_not_approved: this.isNullOrUndefined(grade.approved_by_profile_id),
                is_resit: false,
                gs: this.getGradingSystemPoint(score, grade.grading_system),
            }
        ];

        // if resit grade exist
        for (let resit_grade of grade.resit_grades)
        {
            // resit total score holder again for resit
            score = 0;

            // calculate resit total score
            for (let i in resit_grade.scores)
                if (resit_grade.scores[i] != null)
                    score += parseFloat(resit_grade.scores[i]);

            // add resit grade data to transcript data too
            grade.transcript_data.push({
                total: score,
                is_not_approved: this.isNullOrUndefined(resit_grade.approved_by_profile_id),
                is_resit: true,
                gs: this.getGradingSystemPoint(score, grade.grading_system),
            });
        }

        // go through grades; first grade and resit if exits
        for (let i of Object.keys(grade.transcript_data))
        {
            // go through grading systems ranges
            for (let gs_grade of grade.grading_system.grades)
            {
                // find range the total score belong to
                if (
                    parseFloat(gs_grade.from) <= grade.transcript_data[i].total
                    &&
                    parseFloat(gs_grade.to) >= grade.transcript_data[i].total
                )
                {
                    // attach range to the grade
                    grade.transcript_data[i].gs = gs_grade;
                }
            }
        }

        return grade;
    },
    timeDifferenceInWord: function (term) {
        let starting_at = new Date(term.starting_at);
        let ending_at = new Date(term.ending_at);
        let difference = Math.abs(ending_at - starting_at);

        return Math.ceil(difference / (1000 * 60 * 60 * 24 * 7)) + ' Weeks';
    },
    monthAndYearInWord: function (date) {
        return dateFormat(new Date(date), "mmm yyyy");
    },
    view_grades: function(grades) {
        let ret = '';
        for (let gr of grades)
            ret +=
                '<li>' +
                '<span class="text-uppercase">'+gr.grade+' - '+gr.point+'</span>, ' +
                '<strong class="text-underline">'+gr.from+' - '+gr.to+'</strong>'+
                '</li>';
        return ret;
    },
    minutes_lapsed: function(date) {
        return Math.abs(new Date().getTime() - new Date(date).getTime()) / 3600000;
    },
    not_expired: function(date) {
        return new Date(date) > new Date();
    },
    user_link: function(user) {
        return '<a href="/profile/'+user.id+'" target="_blank">'+this.full_name(user)+'</a>';
    },
    full_name: function(user) {
        return user.first_name+' '+(user.middle_name === null ? '':user.middle_name)+' '+user.last_name;
    },
    file_size: function(file_size) {
        return (file_size / 1048576).toFixed(2)+'MB';
    },
    post_errors: function(errors = [], title = 'Errors..!') {

        let errors_list = '';
        for (let ei in errors)
            for (let i in errors[ei])
                errors_list += '<li>'+errors[ei][i]+'</li>';

        window.app.$notify({
            group: 'alert',
            title: title,
            text: errors_list,
            type: 'error',
            duration: 10000,
            speed: 1000,
        });
    },
    post_success: function(message) {
        window.app.$notify({
            group: 'alert',
            title: 'Successful..!',
            text: message,
            type: 'success',
            duration: 10000,
            speed: 1000,
        });
    },
    trigger_loading: function(message = ' loading...') {
        store.state.loading.push(window.app.$loading.show({},{after:message}));
    },
    close_loading: function() {
        store.state.loading.pop().hide();
    },
    get_sets: function(department_id){
        axios.get('/admin/get/sets/department='+department_id)
            .then(res => {
                window.app.$store.state.inputs.sets = res.data.sets;
            })
            .catch(err => {
                this.catch_error(err);
            });
    },

    gender: function(gender) {
        return gender === 'm' ? 'Male' : 'Female';
    },

    profile_type: function(type) {
        return window.user_type[type];
    },

    pause: function(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    },

    catch_error: function(err)
    {
        //console.error(err);
        //window.app.$store.state.loading.push(window.app.$loading.show({},{after:'Application error.! Inform system admin.'}));
        this.is_logged_in();
    },

    getProfileDepartment: function(profile_type)
    {
        let departments = [];

        if (profile_type === 'ad') {
            departments = window.app.$store.state.admin_departments;
        } else {
            for (let dep of window.app.$store.state.academic_departments) {
                if (!dep.is_major) {
                    departments.push(dep);
                }
            }
        }

        return departments;
    },
    getDepartments: function(is_admin = 0)
    {
        let url;
        if (is_admin === null)
            url = '/admin/get/departments';
        else
            url = '/admin/get/departments?is_admin='+is_admin;

        axios.get(url)
            .then(res => {

                if (is_admin === null)
                    window.app.$store.state.departments = res.data.departments;

                else {
                    // if admin department requested
                    if (is_admin)
                        window.app.$store.state.admin_departments = res.data.departments;

                    // else if none admin department requested
                    else
                        window.app.$store.state.academic_departments = res.data.departments;
                }
            });
    },
    moment: function(time) {
        return time;
    },
    format_date: function (date) {
        return dateFormat(new Date(date), " dS mmmm, yyyy");
    },

    can_visit: function (role) {

        if (!window.app.$store.state.auth.hasRole(role))
            history.back();
    },

    get_role: function(role) {
        return window.roles[role];
    },

    get_roles: function(roles) {
        let _roles = [];
        for (let role of roles)
            _roles.push(window.roles[role]);
        return _roles;
    },

    keep_redirect: function() { // if user login expired, store previous url and logout.

        window.Save.storeLoginRedirect(window.location.href)
        // localStorage.setItem(window.cookies_key_start+'login_redirect', window.location.href);
    },

    is_logged_in: function() {
        axios.get('/logged-in')
            .then(res => {
                return true;
            }).catch(err => {
                this.logout();
            });
    },

    clear_auth: function() {

        // clear stored token
        window.Save.clear();
    },

    logout: function() {

        this.clear_auth();

        // window.app.$store.state.auth = new User({});
        window.location.href = "/";

        // request token deletion at api server
        // axios.post('/logout')
        //     .then(res => {
        //         if (res.data.success)
        //             this.post_success(res.data.success);
        //     }).catch(err => {
        //         console.error(err);
        //     });
    },

    load_auth: function() {

        if (window.Save.get('name') != null)
        {
            window.app.$store.state.auth = new User({
                name: window.Save.get('name'),
                img: window.Save.get('img'),
                type: window.Save.get('type'),
                roles: window.Save.get('roles'),
            });
            window.app.$store.state.home = window.app.$store.state.auth.getHome;

            return true;
        }
        else return false;
    },

    should_be_out: function () {

        if (store.getters.is_authenticated)
            location.href = window.app.$store.state.home;
    },

    should_be_in: function () {
        if (!store.getters.is_authenticated) {
            window.location.href = "/";
        }
    },

    should_be_here: function () {

        if (!location.pathname.startsWith(store.state.home))
            location.href = window.app.$store.state.auth.getHome;
    },
    getGradingSystemPoint(score, grading_system) {
        for (let gs_grade of grading_system.grades)
        {
            // find range the total score belong to
            if (
                parseFloat(gs_grade.from) <= score
                &&
                parseFloat(gs_grade.to) >= score
            )
                return gs_grade;
        }
    }
};
