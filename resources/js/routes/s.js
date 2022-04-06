import Base from "../components/students/StudentsBase";
export default {
    s_routes: [
        {
            path: '/student',
            component: Base,
            children: [
                {
                    path: '',
                    name: 's.index',
                    component: () => import('../components/students/Index')
                },
                {
                    path: 'profile',
                    name: 's.profile',
                    component: () => import('../components/Profile')
                },
            ],
        },
    ],
    mode: 'history', // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    linkActiveClass: 'active',
};
