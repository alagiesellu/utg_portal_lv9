<template>
    <div class="container-fluid">
        <div class="header-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-stats mb-4 mb-xl-0">
                        <div class="card-body">
                            <router-link :to="{name:'ac.classes.assessments',params:{id:term_class.id}}"
                                         class="btn btn-link btn-sm">
                                <i class="ni ni-ruler-pencil"></i> Assessments
                            </router-link>
                            <router-link :to="{name:'ac.classes.students',params:{id:term_class.id}}"
                                         class="btn btn-link btn-sm">
                                <i class="ni ni-single-02"></i> Registered Students
                            </router-link>
                            <router-link :to="{name:'ac.classes.files',params:{id:term_class.id}}"
                                         class="btn btn-link btn-sm">
                                <i class="ni ni-folder-17"></i> Files
                            </router-link>
                            <router-link :to="{name:'ac.classes.mails',params:{id:term_class.id}}"
                                         class="btn btn-link btn-sm">
                                <i class="ni ni-email-83"></i> Mails
                            </router-link>
                            <table class="table">
                                <tbody>
                                <tr v-if="term_class.course">
                                    <td>Course</td>
                                    <th>{{term_class.course.code+' - '+term_class.course.name}}</th>
                                </tr>
                                <tr v-if="term_class.term">
                                    <td>Academic Term</td>
                                    <th>
                                        {{term_class.term.name}}<br>
                                        <small>Start Date:</small> {{$root.format_date(term_class.term.starting_at)}}<br>
                                        <small>End Date:</small> {{$root.format_date(term_class.term.ending_at)}}
                                    </th>
                                </tr>
                                <tr v-if="term_class.venue">
                                    <td>Venue</td>
                                    <th>{{term_class.venue.name+', '+term_class.venue.description}}</th>
                                </tr>
                                <tr>
                                    <td>Lecturers</td>
                                    <th>
                                        <ul>
                                            <li class="" v-for="lect in term_class.class_lecturers">
                                                {{$root.full_name(lect.profile.user)}}
                                            </li>
                                        </ul>
                                    </th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewClasses",
        data() {
            return {
                term_class: {},
                class_registrations: {},
                form: {
                    input: {},
                },
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
                this.get_term_class();
            },
            get_term_class: function () {
                axios.get('/academic/classes/'+this.$route.params.id)
                    .then((res) => {
                        this.term_class = res.data.term_class;
                    })
            },
        },
    }
</script>

<style scoped>

</style>
