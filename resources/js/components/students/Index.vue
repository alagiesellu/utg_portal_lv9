<template>
    <div class="container-fluid">
        <div class="header-body">
            <div class="row">
                <div class="col-12" v-show="classes.total">
                    <div class="card card-stats mb-4 mb-xl-0">
                        <div class="card-header h3">
                            <i class="ni ni-bag-17"></i> Current Classes
                        </div>
                        <div class="card-body row">
                            <div class="col-md-6" v-for="_class in classes.data">
                                <h5 class="card-title text-uppercase text-muted mb-0">
                                    {{_class.term_class.course.code}}
                                    <small class="badge badge-warning float-right" v-if="!_class.approved_by_profile_id">Un Approved</small>
                                </h5>
                                <router-link :to="{name:'s.classes',params:{id:_class.term_class.id}}" class="h4 text-underline">
                                    {{_class.term_class.course.name}}
                                </router-link>
                                <p class="text-muted text-sm float-right">
                                <span class="text-nowrap">
                                    <li v-for="time in _class.term_class.times">
                                        {{time.day}}, {{$root.moment(time.time)}}
                                    </li>
                                </span>
                                </p>
                                <hr>
                            </div>
                            <div class="float-right" v-if="classes.next_page_url">
                                <router-link :to="{name:'s.classes'}"
                                             class="btn btn-icon btn-3 btn-secondary">
                                    <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                                    <span class="btn-inner--text">more classes</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <br>
                </div>
                <div class="col-12" v-show="terms.total">
                    <div class="card card-stats mb-4 mb-xl-0">
                        <div class="card-header h3">
                            <i class="ni ni-calendar-grid-58"></i> Academic Terms Open For Registration
                        </div>
                        <div class="card-body row">
                            <div class="col-md-6" v-for="term in terms.data">
                                <h1>
                                    <button
                                        v-on:click="$parent.$router.push({name:'s.timetables', params:{term:term.id}})"
                                        class="btn btn-primary btn-sm">
                                        <i class="ni ni-button-play"></i>
                                    </button>
                                    {{term.name}}
                                </h1>
                                <h3 class="blockquote-footer">
                                    <small>Start Date:</small> {{$root.format_date(term.starting_at)}}
                                </h3>
                                <h3 class="blockquote-footer">
                                    <small>End Date:</small> {{$root.format_date(term.ending_at)}}
                                </h3>
                                <h3 class="blockquote-footer" v-if="term.registration_deadline">
                                    <small>Registration Deadline:</small> {{$root.format_date(term.registration_deadline)}}
                                </h3>
                                <h3 class="blockquote-footer" v-if="term.unregistration_deadline">
                                    <small>Un-Registration Deadline:</small> {{$root.format_date(term.unregistration_deadline)}}
                                </h3>
                                <hr>
                            </div>
                            <div class="float-right" v-if="terms.next_page_url">
                                <router-link :to="{name:'s.transcript'}"
                                             class="btn btn-icon btn-3 btn-secondary">
                                    <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                                    <span class="btn-inner--text">more terms</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                classes: {},
                terms: {},
            }
        },
        mounted() {
            this.$store.state.page = 'Students Portal';
            this.get_current_classes();
            this.get_current_terms();
        },
        methods: {
            get_current_terms: function(page = 1) {
                axios.get('/students/terms?page='+page)
                    .then((res) => {
                        this.terms = res.data.terms;
                    })
                    .catch((err) => {
                        this.$root.post_errors(err);
                    });
            },
            get_current_classes: function () {
                //axios.get('/students/get/current-classes')
                axios.get('/students/classes')
                    .then((res) => {
                        this.classes = res.data.class_registrations;
                    })
            },
        },
    }
</script>

<style scoped>

</style>
