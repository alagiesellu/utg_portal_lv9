// application api endpoint
window.api_url = location.origin+'/api';

// user profile type
window.user_type = {
    'ad': 'admin',
    'ac': 'academic',
    's': 'student',
};

// storage keys
window.storage_keys = [
    'name',
    'img',
    'roles',
    'type',
    'token',
];

// cookies key starts with..
window.cookies_key_start = '_a_u_';
window.cookies_expire_hour = 1;

// user profile roles
window.roles = {};

window.week_days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

window.options = {};

window.utg = {
    class: {
        'min-size': 0,
        'max-size': 100,
        'max-registration': 6,
    },
};

window.models = [
    { 'key': 'venues', 'name': 'Venues' },
    { 'key': 'grades', 'name': 'Grades' },
];

//    axios.get('/url', {headers:{do_not_load: true}})
//    axios.post('/url', {headers:{do_not_load: true}})
