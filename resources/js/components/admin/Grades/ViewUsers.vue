<template>
    <div class="row">
        <div class="col-8">
            <div class="card shadow">
                <div class="card-header bg-transparent">
                    <h3 class="mb-0">
                        Grades
                    </h3>
                </div>
                <div class="table-responsive">
                    <table class="table align-items-center table-flush">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Score</th>
                            <th>Class</th>
                            <th>Term</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="grade in $parent.profile.grades">
                            <td>
                                <button
                                    v-on:click="view_grade(grade)"
                                    class="btn btn-sm btn-primary mb-3">
                                    <i class="ni ni-bold-right"></i>
                                </button>
                            </td>
                            <th>
                                {{grade.total}}%
                            </th>
                            <td>
                                <span v-if="grade.term_class.course">
                                    {{grade.term_class.course.name}}
                                </span>
                                <span v-else>
                                    External Exam
                                </span>
                            </td>
                            <td>
                                {{grade.term_class.term.name}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card shadow">
                <div class="card-body">
                    <router-link :to="{name:'ad.transcripts'}"
                                 class="btn btn-sm btn-outline-primary mb-3">
                        <i class="ni ni-bold-left"></i> Back
                    </router-link>
                    <img class="img-thumbnail" :src="'/storage/profiles/'+$parent.user['img']">
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <tbody>
                            <tr>
                                <th>
                                    <small>MAT #</small><br>
                                    {{$parent.user.num}}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <small>First Name</small><br>
                                    {{$parent.user.first_name}}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <small>Middle Name</small><br>
                                    {{$parent.user.middle_name}}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <small>Last Name</small><br>
                                    {{$parent.user.last_name}}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <small>Email</small><br>
                                    {{$parent.user.email}}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <small>Tel</small><br>
                                    {{$parent.user.tel}}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <small>Address</small><br>
                                    {{$parent.user.address}}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <small>Gender</small><br>
                                    {{this.$root.gender($parent.user.gender)}}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <small>Date of Birth</small><br>
                                    {{this.$root.format_date($parent.user.dob)}}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <small>Nationality</small><br>
                                    {{this.$root.country($parent.user.nationality)}}
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <modal :scrollable="true" name="view_grade" height="auto">
            <h2 class="modal-header">
                Grade
            </h2>
            <div class="modal-body" v-if="grade">
                <button class="btn btn-sm btn-warning float-right"
                        v-show="$store.state.auth.hasRole('ad-23.1')"
                        v-on:click="resit_grade(grade)">
                    Enter Reset Score
                </button>
                <table class="table">
                    <tbody>
                    <tr v-for="assessment in grade.term_class.assessments">
                        <td width="75%">{{assessment.name}}</td>
                        <td>
                                <span v-if="grade.scores[assessment.id]">
                                    {{grade.scores[assessment.id]+' / '+assessment.score}}
                                    <button class="btn btn-sm btn-warning"
                                            v-show="$store.state.auth.hasRole('ad-23.1')"
                                            v-on:click="edit_score(assessment)">
                                        <i class="ni ni-settings-gear-65"></i>
                                    </button>
                                </span>
                        </td>
                    </tr>
                    <tr>
                        <th width="75%">
                            Total
                        </th>
                        <th>{{grade.total}} / 100</th>
                    </tr>
                    </tbody>
                    <tbody v-if="grade.resit_grades">
                    <tr v-for="resit_grade of grade.resit_grades">
                        <th width="75%">
                            Resit Grade
                            <small>- {{ $root.format_date(resit_grade.created_at) }}</small>
                        </th>
                        <th>
                            <span>
                                {{resit_grade.scores[0]}} / 100
                                    <button class="btn btn-sm btn-warning"
                                            v-show="$store.state.auth.hasRole('ad-23.1')"
                                            v-on:click="edit_resit(resit_grade)">
                                        <i class="ni ni-settings-gear-65"></i>
                                    </button>
                                </span>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </modal>
        <modal :scrollable="true" name="edit_score" height="auto">
            <h2 class="modal-header">Edit Grade</h2>
            <div class="modal-body">
                <form @submit="submitForm">
                    <fake-form-input></fake-form-input>

                    <div class="form-group" v-if="assessment">
                        <div class="input-group input-group-sm mb-4">
                            <input class="form-control" placeholder="score" type="number"
                                   v-model="form.input.score"
                                   step="0.01" min="0" :max="assessment.score">
                            <div class="input-group-append">
                                <span class="input-group-text">/ {{assessment.score}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" v-if="grade_resit">
                        <div class="input-group input-group-sm mb-4">
                            <input class="form-control" placeholder="score" type="number"
                                   v-model="form.input.score"
                                   step="0.01" min="0" max="100">
                            <div class="input-group-append">
                                <span class="input-group-text">/ 100</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                            </div>
                            <input class="form-control" placeholder="Password confirmation"
                                   type="password" v-model="form.input.password"
                                   required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                        <button type="reset" class="btn btn-danger" v-on:click="$modal.hide('edit_score')">Cancel</button>
                    </div>
                </form>
            </div>
        </modal>
        <modal :scrollable="true" name="resit_score" height="auto">
            <h2 class="modal-header">
                Resit Score
            </h2>

            <div class="modal-body" v-if="resit.grade">
                <h3>
                    <small>Student:</small> {{ $root.full_name($parent.user) }} #{{$parent.user.num}}
                </h3>
                <h3>
                    <small>Course:</small> {{resit.grade.term_class.course.name}}
                </h3>
                <form @submit="submitResitForm">
                    <fake-form-input></fake-form-input>

                    <div class="form-group">
                        <div class="input-group input-group-sm mb-4">
                            <input class="form-control" placeholder="score" type="number"
                                   v-model="resit.input.score"
                                   step="0.01" min="0" max="100">
                            <div class="input-group-append">
                                <span class="input-group-text">/ 100</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                            </div>
                            <input class="form-control" placeholder="Password confirmation"
                                   type="password" v-model="resit.input.password"
                                   required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                        <button type="reset" class="btn btn-danger" v-on:click="$modal.hide('resit_score')">Cancel</button>
                    </div>
                </form>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "ViewUsers",
        data() {
            return {
                grade: null,
                resit: {
                    grade: null,
                    input: {}
                },
                assessment: null,
                grade_resit: null,
                form: {
                    input: {
                        grade: null,
                        score: null,
                        assessment: null,
                        password: null,
                        grade_resit: null,
                    }
                }
            }
        },
        methods: {
            submitResitForm: function (e) {
                e.preventDefault();
                this.resit.input.grade_id = this.resit.grade.id;

                this.resit.input.score *= 1;
                axios.post('/admin/grades/resit', this.resit.input)
                    .then(res => {
                        this.$root.post_success(res.data.success);
                        this.grade = res.data.grade;
                        // console.log(res.data.grade);
                        this.cal_grades();
                        this.$modal.hide('resit_score');
                    });

                // console.log(this.resit.input);
            },
            resit_grade: function (grade) {
                this.resit.grade = grade;
                this.$modal.show('resit_score');
            },
            edit_resit: function(grade_resit) {
                this.grade_resit = grade_resit;
                this.assessment = null;
                this.form.input.assessment = 0;
                this.form.input.grade = this.grade_resit.id;
                this.form.input.score = this.grade_resit.scores[0];
                this.$modal.show('edit_score');
            },
            edit_score: function(assessment) {
                this.assessment = assessment;
                this.grade_resit = null;
                this.form.input.assessment = assessment.id;
                this.form.input.grade = this.grade.id;
                this.form.input.score = this.grade.scores[assessment.id];
                this.$modal.show('edit_score');
            },
            submitForm: function(e) {
                e.preventDefault();

                this.form.input.score *= 1;
                axios.post('/admin/grades/update', this.form.input)
                    .then(res => {
                        this.$root.post_success(res.data.success);
                        this.grade = res.data.grade;
                        this.cal_grades();
                        this.$modal.hide('edit_score');
                        this.$parent.get_user();
                    });
            },
            view_grade: function(grade) {
                axios.get('/admin/grades/get='+grade.id)
                    .then(res => {
                        this.grade = res.data.grade;
                        this.cal_grades();
                        this.$modal.show('view_grade');
                    });
            },
            cal_grades: function () {

                this.grade.total = 0;
                for (let si in this.grade.scores)
                {
                    if (this.grade.scores[si] != null)
                        this.grade.total += this.grade.scores[si]*1;
                }

                if (this.grade.resit_grade)
                {
                    this.grade.resit_grade.total = 0;
                    for (let si in this.grade.resit_grade.scores)
                    {
                        if (this.grade.resit_grade.scores[si] != null)
                            this.grade.resit_grade.total += this.grade.resit_grade.scores[si]*1;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
