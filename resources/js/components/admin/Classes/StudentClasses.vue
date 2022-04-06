<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0" id="view">
            <div class="card-header bg-transparent">
                <h2 class="mb-0">
                    Students
                </h2>
                <div class="float-right">
                    <button class="btn btn-primary btn-sm"
                    v-on:click="$router.go(-1)">Back</button>
                </div>
            </div>
            <div class="table-responsive" v-if="profile">
                <table class="table align-items-center table-flush">
                    <tbody>
                    <tr>
                        <td>Student</td>
                        <th>
                            {{$root.full_name(profile.user)}}<br>
                            <small>Email: {{profile.user.email}}</small>
                        </th>
                    </tr>
                    <tr>
                        <td>Course</td>
                        <th v-if="term_class.course">{{term_class.course.name}}</th>
                    </tr>
                    <tr>
                        <td>Term</td>
                        <th v-if="term_class.term">
                            <router-link :to="{name:'ad.terms',params:{id:term_class.term.id}}">
                                {{term_class.term.name}}
                            </router-link>
                        </th>
                    </tr>
                    <tr>
                        <td>Venue</td>
                        <th v-if="term_class.venue">{{term_class.venue.name}}</th>
                    </tr>
                    </tbody>
                </table>
                <table class="table align-items-center table-flush" v-if="grade">
                    <thead>
                    <tr class="thead-light">
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr class="thead-light">
                        <th></th>
                        <th>Grading System</th>
                        <th>
                            <button class="btn btn-sm btn-link text-underline" v-on:click="$modal.show('view_grades')">
                                {{grade.grading_system.name}}
                            </button>
                        </th>
                    </tr>
                    <tr class="thead-light">
                        <th>Assessment</th>
                        <th>By</th>
                        <th>
                            Score
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="gr in Object.keys(grade.scores)"v-if="grade.scores[gr]">
                        <td>{{assessments[gr].name}}</td>
                        <td>{{$root.full_name(assessments[gr].lecturer_profile.user)}}</td>
                        <td>{{grade.scores[gr]+' / '+assessments[gr].score}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <th>Total</th>
                        <th>{{totals.grade+' / '+totals.score}}</th>
                    </tr>
                    </tbody>

                    <modal :scrollable="true" name="view_grades" height="auto">
                        <div class="modal-content">
                            <div class="modal-body"
                                 v-html="$root.view_grades(grade.grading_system.grades)">
                            </div>
                        </div>
                    </modal>
                </table>
            </div>
        </div>

        <modal  name="students" height="auto" :draggable="true">
            <div class="modal modal-content">
                <div class="modal-header">
                    Registered Students
                </div>
                <div class="modal-body">
                    <!--                                -->
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "StudentClasses",
        data() {
            return {
                profile: null,
                form: null,
                term_class: null,
                grade: null,
                assessments: {},
                totals: {
                    grade: 0,
                    score: 0,
                }
            }
        },
        created () {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            submitForm: function(e) {
                e.preventDefault();

                this.form.input.term_class_id = this.term_class.id;
            },
            fetchData: function() {
                this.get_student();
            },
            get_student: function()
            {
                axios.get('/admin/classes/student='+this.$route.params.id+'/'+this.$route.params.class)
                    .then(res => {
                        this.profile = res.data.profile;
                        this.term_class = res.data.term_class;
                        this.grade = res.data.grade;
                        for (let ass of this.term_class.assessments) {
                            this.assessments[ass.id] = ass;
                            if (this.grade.scores[ass.id] != null)
                                this.totals.grade += parseFloat(this.grade.scores[ass.id]);
                            this.totals.score += parseFloat(ass.score);
                        }
                    });
            }
        },
    }
</script>

<style scoped>

</style>
