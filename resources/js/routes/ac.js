import Base from "../components/students/StudentsBase";
export default {
    ac_routes: [
        {
            path: '/academics',
            component: Base,
            children: [
                {
                    path: '',
                    name: 'ac.index',
                    component: () => import('../components/admin/Index')
                },
                {
                    path: 'profile',
                    name: 'ac.profile',
                    component: () => import('../components/Profile')
                },
            ],
        },
    ],
    mode: 'history', // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    linkActiveClass: 'active',
};
