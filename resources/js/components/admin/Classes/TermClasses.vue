<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0" v-if="class_terms && !form">
            <div class="card-header bg-transparent">
                <h2 class="mb-0">
                    <i class="ni ni-calendar-grid-58"></i>
                    <router-link :to="{name:'ad.terms',params:{id:term.id}}">
                        {{term.name}}
                    </router-link>
                    <div class="float-right">
                        <router-link
                            class="btn btn-sm btn-outline-primary mb-3"
                            :to="{name:'ad.term.classes',params:{ops:'create'}}">
                            Add Class
                        </router-link>
                    </div>
                </h2>
                <p>
                    Classes
                </p>
            </div>
            <div class="table-responsive">
                <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Course</th>
                        <th scope="col">Venue</th>
                        <th scope="col">Times</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="class_term in class_terms.data">
                        <td>
                            <button
                                v-on:click="$parent.$router.push({name:'ad.show.classes', params:{class:class_term.id}})"
                                class="btn btn-primary btn-sm">
                                <i class="ni ni-button-play"></i>
                            </button>
                        </td>
                        <th scope="row">{{class_term.course.name}}</th>
                        <th scope="row" v-if="class_term.venue_id">{{class_term.venue.name}}</th>
                        <td>
                            <li v-for="time in class_term.times">
                                <strong>{{time.day}}</strong>, {{$root.moment(time.time)}}
                            </li>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <laravel-vue-pagination :limit="5" :data="class_terms" align="center" @pagination-change-page="$parent.get_class_terms($route.params.term)"></laravel-vue-pagination>
            </div>
        </div>
        <FormClasses v-else-if="form && class_term"></FormClasses>
        <div class="card shadow mb-4 mb-xl-0" v-else>
            <div class="card-header bg-transparent">
                <h2 class="mb-0">
                    <i class="ni ni-calendar-grid-58"></i>
                    {{class_term.name}}
                </h2>
            </div>
        </div>
    </div>
</template>

<script>
    import FormClasses from "./FormClasses";
    export default {
        components: {
            FormClasses,
        },
        name: "TermClasses",
        data() {
            return {
                class_term: null,
                class_terms: {},
                term: {},
                form: null,
            }
        },
        created () {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {

            fetchData: function() {
                if (this.$route.params.ops === 'create') {
                axios.get('/admin/terms/'+this.$route.params.term)
                        .then(res => {
                            this.term = res.data.term;

                            //console.log(this.term)

                            this.class_term = {};
                            this.class_terms = null;
                            this.form = {
                                type: 'c',
                                title: 'New Class',
                                input: {
                                    course_id: '',
                                    term_id: this.$route.params.term,
                                    venue_id: '',
                                    times: [
                                        {day: '', time: ''},
                                    ],
                                    size: this.term.set ? this.term.set.profiles.length : null,
                                    _size: this.term.set ? 0 : 1,
                                }
                            };
                    });
                }
                else {
                    this.get_class_terms(this.$route.params.term);
                }
            },
            get_term: function(id)
            {
                axios.get('/admin/terms/'+id)
                    .then(res => {
                        this.term = res.data.term;
                    });
            },
            get_class_terms: function(term, page = 1)
            {
                axios.get('/admin/classes/term='+term+'?page=' + page)
                    .then(res => {
                        this.class_terms = res.data.class_terms;
                        this.term = res.data.term;
                        this.class_term = null;
                        this.form = null;
                    });
            },
            get_class_term: function(id)
            {
                axios.get('/admin/classes/show='+id)
                    .then(res => {
                        this.class_term = res.data.class_term;
                        this.class_terms = null;
                    });
            },
        },
    }
</script>

<style scoped>
</style>
