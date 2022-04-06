<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">
            <!-- Toggler -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Brand -->
            <router-link class="navbar-brand pt-0" :to="{name:this.$store.state.auth.type+'.index'}">
                <img :src="'/img/'+this.$store.state.auth.type+'_portal.png'" class="navbar-brand-img" alt="UTG">
            </router-link>
            <!-- User -->
            <ul class="nav align-items-center d-md-none">
                <layout-navbar-profile></layout-navbar-profile>
            </ul>
            <!-- Collapse -->
            <div class="collapse navbar-collapse" id="sidenav-collapse-main">
                <!-- Collapse header -->
                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <a :href="this.$store.state.home">
                                <img :src="'/img/'+this.$store.state.auth.type+'_portal.png'">
                            </a>
                        </div>
                        <div class="col-6 collapse-close">
                            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Navigation -->
                <ul class="navbar-nav">
                    <span v-if="this.$store.state.auth.type === 'ad'">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'ad.index'}">
                                <i class="ni ni-tv-2 text-primary"></i> Home
                            </router-link>
                        </li>
                        <li class="nav-item" v-show="$store.state.auth.hasRole('ad-0')">
                        <router-link class="nav-link" :to="{name:'ad.terms'}">
                            <i class="ni ni-calendar-grid-58 text-primary"></i> Academic Terms
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-7.1')">
                        <router-link class="nav-link" :to="{name:'ad.groups'}">
                            <i class="ni ni-key-25 text-primary"></i> Role Groups
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-8.1')">
                        <router-link class="nav-link" :to="{name:'ad.sets'}">
                            <i class="ni ni-badge text-primary"></i> Sets
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-9.1')">
                        <router-link class="nav-link" :to="{name:'ad.grading-systems'}">
                            <i class="ni ni-chart-bar-32 text-primary"></i> Grading Systems
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-10.1')">
                        <router-link class="nav-link" :to="{name:'ad.venues'}">
                            <i class="ni ni-square-pin text-primary"></i> Venues
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-11.1')">
                        <router-link class="nav-link" :to="{name:'ad.departments'}">
                            <i class="ni ni-building text-primary"></i> Departments
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-12.1')">
                        <router-link class="nav-link" :to="{name:'ad.courses'}">
                            <i class="ni ni-books text-primary"></i> Courses
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-13.1')">
                        <router-link class="nav-link" :to="{name:'ad.users'}">
                            <i class="ni ni-single-02 text-primary"></i> Users
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-15')">
                        <router-link class="nav-link" :to="{name:'ad.transcripts'}">
                            <i class="ni ni-paper-diploma text-primary"></i> Transcript
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-23')">
                        <router-link class="nav-link" :to="{name:'ad.grades'}">
                            <i class="ni ni-bullet-list-67 text-primary"></i> Grades
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-17')">
                        <router-link class="nav-link" :to="{name:'ad.finance'}">
                            <i class="ni ni-money-coins text-primary"></i> Finance
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-16')">
                        <router-link class="nav-link" :to="{name:'ad.options'}">
                            <i class="ni ni-settings-gear-65 text-primary"></i> Configs
                        </router-link>
                    </li>
                    <li class="nav-item" v-show="$store.state.auth.hasRole('ad-22')">
                        <router-link class="nav-link" :to="{name:'ad.logs'}">
                            <i class="ni ni-archive-2 text-primary"></i> Logs
                        </router-link>
                    </li>
                    </span>
                    <span v-else-if="this.$store.state.auth.type === 's'">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'s.index'}">
                                <i class="ni ni-tv-2 text-primary"></i> Home
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'s.classes'}">
                                <i class="ni ni-building text-primary"></i> Classes
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'s.transcript'}">
                            <i class="ni ni-paper-diploma text-primary"></i> Transcript
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'s.timetables'}">
                                <i class="ni ni-bullet-list-67 text-primary"></i> Timetable
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'s.calendar'}">
                                <i class="ni ni-calendar-grid-58 text-primary"></i> Calendar
                            </router-link>
                        </li>
                        <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'s.finance'}">
                            <i class="ni ni-money-coins text-primary"></i> Finance
                        </router-link>
                    </li>
                    </span>
                    <span v-else>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'ac.index'}">
                                <i class="ni ni-tv-2 text-primary"></i> Home
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'ac.classes'}">
                                <i class="ni ni-building text-primary"></i> Classes
                            </router-link>
                        </li>
                        <li class="nav-item" v-show="$store.state.auth.hasRole('ac-1')">
                            <router-link class="nav-link" :to="{name:'ac.students'}">
                                <i class="ni ni-circle-08 text-primary"></i> Students
                            </router-link>
                        </li>
                    </span>
                </ul>
                <!-- Divider -->
                <hr class="my-3">
                <!-- Heading -->
<!--                <h6 class="navbar-heading text-muted">Campus</h6>-->
                <!-- Navigation -->
<!--                <ul class="navbar-nav mb-md-3">-->
<!--                    <li class="nav-item">-->
<!--                        <a class="nav-link" href="/info#news">-->
<!--                            <i class="ni ni-single-copy-04 text-warning"></i> News-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                        <a class="nav-link" href="/info#calendar">-->
<!--                            <i class="ni ni-calendar-grid-58 text-info"></i> Calendar-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                        <a class="nav-link" href="/info#announcements">-->
<!--                            <i class="ni ni-notification-70 text-danger"></i> Announcements-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                        <a href="https://demos.creative-tim.com/argon-dashboard/index.html" target="_blank" class="nav-link">-->
<!--                            <i class="ni ni-image"></i> Argon Theme-->
<!--                        </a>-->
<!--                    </li>-->
<!--                </ul>-->
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Sidebar",
        mounted() {

            // check if user in their portal, else redirect to their portal
            //if (!location.pathname.startsWith(this.$store.state.home))
                //location.href = this.$store.state.auth.getTypeName;
        },

        methods: {

            hasRole: function(role) {

                return this.$store.state.auth.hasRole(role);
            }
        },
    }
</script>

<style scoped>

</style>
