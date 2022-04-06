<template>
    <div class="col-xl-12 order-xl-1">
        <div class="card shadow" v-if="local_term">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-2">
                        <button class="btn btn-primary btn-sm"
                                v-on:click="$router.go(-1)">Go Back</button>
                    </div>
                    <div class="col-md-10">
                        <h2>
                            <span class="text-underline">{{local_term.name}}</span>
                            External Exams
                        </h2>
                        <h5>
                            <small>Assessment: </small>
                            {{assessment.name}}
                        </h5>
                        <h5 class="text-danger text-underline">
                            <strong v-if="yours">Can Edit</strong>
                            <strong v-else>Cannot Edit</strong>
                        </h5>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <form v-on:submit="submitForm">
                    <table class="table">
                        <thead>
                        <tr>
                            <th colspan="2">Student</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="grade in grades">
                            <th>{{$root.full_name(grade.student_profile.user)}}</th>
                            <th>{{grade.student_profile.user.num}}</th>
                            <th>
                                <div v-if="editable[grade.id] == null" class="form-group">
                                    <div class="input-group input-group-sm mb-4">
                                        <input class="form-control" placeholder="score" type="number"
                                               required v-model="grade.scores[assessment.id]"
                                               step="0.01" min="0" :max="assessment.score">
                                        <div class="input-group-append">
                                            <span class="input-group-text">/ {{assessment.score}}</span>
                                        </div>
                                    </div>
                                </div>
                                <span v-else>
                                    {{grade.scores[assessment.id]+' / '+assessment.score}}
                                </span>
                            </th>
                        </tr>
                        <tr v-if="!all_stored">
                            <td colspan="2" class="text-right">
                                Save Scores
                            </td>
                            <td>
                                    <span v-if="confirm">
                                         <div class="form-group mb-3">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                                </div>
                                                <input class="form-control" placeholder="Password confirmation"
                                                       type="password" v-model="password">
                                            </div>
                                        </div>
                                        <button type="button" v-on:click="confirm = false" class="btn btn-danger btn-sm">Cancel</button>
                                        <button type="submit" class="btn btn-primary btn-sm">Save Changes</button>
                                    </span>
                                <button v-else type="submit" class="btn btn-primary btn-sm">Store</button>
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="3" class="h1 text-danger">You cannot modify grades! Inform appropriate authorities if need be.</td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
        <div v-else class="card shadow">
            <div class="card-header" v-if="term">
                <div class="row">
                    <div class="col-md-2">
                        <button class="btn btn-primary btn-sm"
                                v-on:click="$router.go(-1)">Go Back</button>
                    </div>
                    <div class="col-md-10">
                        <h2>
                            <span class="text-underline">{{term.name}}</span>
                            External Exams
                        </h2>
                        <small>
                            Verify with your password.
                            <strong>When confirmed</strong>
                        </small>
                    </div>
                </div>
            </div>
            <div class="card-body row">
                <div class="col-2"></div>
                <form @submit="get_grades" class="col-8">
                    <fake-form-input></fake-form-input>

                    <div class="form-group mb-3">
                        <small>Major Course</small>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Course:
                                        </span>
                            </div>
                            <select class="form-control" v-model="major_course_id" required>
                                <option
                                    v-for="term_class in major_term_classes"
                                    :value="term_class.id">
                                    {{term_class.course.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                            </div>
                            <input class="form-control" placeholder="Password confirmation"
                                   type="password" v-model="password"
                                   required>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Get Grades</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExternalGrade",
        props: ['term'],
        data() {
            return {
                assessment: {},
                term_class: {},
                major_term_classes: [],
                local_term: null,
                confirm: false,
                editable: [],
                grades: null,
                all_stored: true,
                password: null,
                major_course_id: null,
                yours: false,
            }
        },
        created () {
            this.fetchData();

            axios.get('/admin/get/current_courses/term='+this.$route.params.id)
                .then(res => {
                    this.major_term_classes = res.data.term_classes;
                });

        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function () {
                // this.get_grades();
            },
            get_grades: function(e) {
                e.preventDefault();
                axios.post('/admin/terms/external-grades', {
                    course: this.major_course_id,
                    password: this.password,
                })
                    .then((res) => {
                        this.local_term = res.data.term;
                        this.term_class = res.data.term_class;
                        this.grades = res.data.grades;
                        this.assessment = res.data.assessment;
                        this.yours = res.data.yours;
                        this.calEditable();
                    })
            },
            submitForm: function(e) {
                e.preventDefault();

                if (this.confirm) {

                    if (!this.password)
                        this.$root.post_errors([['Confirm your password to be able to complete the action.']]);

                    else {
                        // let grades = [];
                        // for (let sr of this.students_registrations)
                        //     grades.push({id:sr.profile_id, score:sr.score});
                axios.post('/admin/grades/external/store',
                            {
                                grades: this.grades,
                                password: this.password,
                                assessment: this.assessment.id,
                            })
                            .then((res) => {
                                this.$root.post_success(res.data.success);
                                this.grades = res.data.grades;
                                this.calEditable();
                    })
                    }
                } else this.confirm = true;
            },
            calEditable: function() {
                this.all_stored = true;
                for (let grade of this.grades) {
                    this.editable[grade.id] = grade.scores[this.assessment.id];

                    if (this.editable[grade.id] === undefined || this.editable[grade.id] === null)
                        this.all_stored = false;
                }
            },
        },
    }
</script>

<style scoped>

</style>
