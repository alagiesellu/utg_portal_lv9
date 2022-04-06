import Admin from "../components/admin/Admin";
import Classes from "../components/admin/Classes";
export default {
    ad_routes: [
        {
            path: '/admin',
            component: Admin,

            // sub routes   =>      /admin/{page}
            children: [
                {
                    path: '',
                    name: 'ad.index',
                    component: () => import('../components/admin/Index')
                },
                {
                    path: 'classes',
                    component: Classes,
                    children: [
                        {
                            path: 'term/:term/:ops?',
                            name: 'ad.term.classes',
                            component: () => import('../components/admin/Classes/TermClasses'),
                        },
                        {
                            path: 'show/:class/:ops?',
                            name: 'ad.show.classes',
                            component: () => import('../components/admin/Classes/ViewClasses'),
                        },
                    ],
                },
                {
                    path: 'profile',
                    name: 'ad.profile',
                    component: () => import('../components/Profile')
                },
                {
                    path: 'courses/:id?',
                    name: 'ad.courses',
                    component: () => import('../components/admin/Courses')
                },
                {
                    path: 'departments/:id?',
                    name: 'ad.departments',
                    component: () => import('../components/admin/Departments')
                },
                {
                    path: 'groups/:id?',
                    name: 'ad.groups',
                    component: () => import('../components/admin/Groups')
                },
                {
                    path: 'sets/:id?',
                    name: 'ad.sets',
                    component: () => import('../components/admin/Sets')
                },
                {
                    path: 'terms/:id?',
                    name: 'ad.terms',
                    component: () => import('../components/admin/Terms')
                },
                {
                    path: 'users/:id?',
                    name: 'ad.users',
                    component: () => import('../components/admin/Users')
                },
                {
                    path: 'venues/:id?',
                    name: 'ad.venues',
                    component: () => import('../components/admin/Venues')
                },
            ],
        },
    ],
    mode: 'history', // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    linkActiveClass: 'active',
};
