import Login from "../components/public/Login";

export default {
    routes: [
        {
            path: "/",
            component: Login,
            name: 'public.login',
        },
    ],
    mode: 'history', // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    linkActiveClass: 'active',
};
