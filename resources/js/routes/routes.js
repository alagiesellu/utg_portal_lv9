import AdminBase from "../components/admin/AdminBase";
import Classes from "../components/admin/Classes";
import StudentsBase from "../components/students/StudentsBase";
import AcademicBase from "../components/academic/AcademicBase";
import NotFound from "../components/public/NotFound";
import state from "../store/state";
export default {
    routes: [
        {
            component: AdminBase,
            beforeEnter: (to, from, next) => {
                if (state.auth.type === 'ad') next();
                else next(window.user_type[state.auth.type]);
            },
            path: '/admin',
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
                        {
                            path: 'student/:class/:id/:ops?',
                            name: 'ad.student.classes',
                            component: () => import('../components/admin/Classes/StudentClasses'),
                        },
                    ],
                },
                {
                    path: 'profile',
                    name: 'ad.profile',
                    component: () => import('../components/Profile')
                },
                {
                    path: 'courses/:id?/:ops?',
                    name: 'ad.courses',
                    component: () => import('../components/admin/Courses')
                },
                {
                    path: 'grading-systems/:id?/:ops?',
                    name: 'ad.grading-systems',
                    component: () => import('../components/admin/GradingSystem')
                },
                {
                    path: 'departments/:id?/:ops?',
                    name: 'ad.departments',
                    component: () => import('../components/admin/Departments')
                },
                {
                    path: 'groups/:id?/:ops?',
                    name: 'ad.groups',
                    component: () => import('../components/admin/Groups')
                },
                {
                    path: 'sets/:id?/:ops?',
                    name: 'ad.sets',
                    component: () => import('../components/admin/Sets')
                },
                {
                    path: 'terms/:id?/:ops?',
                    name: 'ad.terms',
                    component: () => import('../components/admin/Terms')
                },
                {
                    path: 'users/:id?/:ops?',
                    name: 'ad.users',
                    component: () => import('../components/admin/Users')
                },
                {
                    path: 'transcripts/:id?',
                    name: 'ad.transcripts',
                    component: () => import('../components/admin/Transcripts')
                },
                {
                    path: 'finance/:id?',
                    name: 'ad.finance',
                    component: () => import('../components/admin/Finance')
                },
                {
                    path: 'venues/:id?/:ops?',
                    name: 'ad.venues',
                    component: () => import('../components/admin/Venues')
                },
                {
                    path: 'configs',
                    name: 'ad.options',
                    component: () => import('../components/admin/Options')
                },
                {
                    path: 'logs',
                    name: 'ad.logs',
                    component: () => import('../components/admin/Logs')
                },
                {
                    path: 'grades/approvals/:id?/:tc?',
                    name: 'ad.grades.approvals',
                    component: () => import('../components/admin/GradeApproval')
                },
                {
                    path: 'grades/:id?',
                    name: 'ad.grades',
                    component: () => import('../components/admin/Grades')
                },
            ],
        },
        {
            component: StudentsBase,
            beforeEnter: (to, from, next) => {
                if (state.auth.type === 's') next();
                else next(window.user_type[state.auth.type]);
            },
            path: '/student',
            children: [
                {
                    path: '',
                    name: 's.index',
                    component: () => import('../components/students/Index')
                },
                {
                    path: 'classes/:id?',
                    name: 's.classes',
                    component: () => import('../components/students/Classes')
                },
                {
                    path: 'mails/:id?',
                    name: 's.mails',
                    component: () => import('../components/students/Mails')
                },
                {
                    path: 'transcript',
                    name: 's.transcript',
                    component: () => import('../components/students/Transcript')
                },
                {
                    path: 'calendar',
                    name: 's.calendar',
                    component: () => import('../components/students/Calendar')
                },
                {
                    path: 'timetable/:term?',
                    name: 's.timetables',
                    component: () => import('../components/students/Timetable')
                },
                {
                    path: 'finance',
                    name: 's.finance',
                    component: () => import('../components/students/Finance')
                },
                {
                    path: 'profile',
                    name: 's.profile',
                    component: () => import('../components/Profile')
                },
            ],
        },
        {
            component: AcademicBase,
            beforeEnter: (to, from, next) => {
                if (state.auth.type === 'ac') next();
                else next(window.user_type[state.auth.type]);
            },
            path: '/academic',
            children: [
                {
                    path: '',
                    name: 'ac.index',
                    component: () => import('../components/academic/Index')
                },
                {
                    path: 'classes',
                    component: () => import('../components/academic/Classes'),
                    children: [
                        {
                            path: '',
                            name: 'ac.classes',
                            component: () => import('../components/academic/Classes/IndexClasses')
                        },
                        {
                            path: ':id',
                            name: 'ac.classes.show',
                            component: () => import('../components/academic/Classes/ViewClasses')
                        },
                        {
                            path: ':id?/students',
                            name: 'ac.classes.students',
                            component: () => import('../components/academic/Classes/StudentsClasses')
                        },
                        {
                            path: ':id?/files',
                            name: 'ac.classes.files',
                            component: () => import('../components/academic/Classes/FilesClasses')
                        },
                        {
                            path: ':id?/mails',
                            name: 'ac.classes.mails',
                            component: () => import('../components/academic/Classes/MailsClasses')
                        },
                        {
                            path: ':id?/assessments',
                            name: 'ac.classes.assessments',
                            component: () => import('../components/academic/Classes/AssessmentsClasses')
                        },
                        {
                            path: ':ass?/:tc?/grades',
                            name: 'ac.classes.assessment.grade',
                            component: () => import('../components/academic/Classes/AssessmentGrade')
                        },
                    ],
                },
                {
                    path: 'profile',
                    name: 'ac.profile',
                    component: () => import('../components/Profile')
                },
                {
                    path: 'students/:id?',
                    name: 'ac.students',
                    component: () => import('../components/academic/Students')
                },
            ],
        },
        {
            path: "/profile/:id",
            component: () => import('../components/public/Profile'),
            name: 'public.profile',
        },
        {
            path: "*",
            component: NotFound
        },
    ],
    mode: 'history', // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    linkActiveClass: 'active',
};
