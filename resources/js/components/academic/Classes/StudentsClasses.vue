<template>
    <div class="row">
        <div class="col-xl-12 order-xl-1">
            <div class="card bg-secondary shadow">
                <div class="card-header bg-white border-0">
                    <h3>
                        <i class="ni ni-single-02"></i>
                        <router-link class=""
                                     :to="{name:'ac.classes.show',params:{id:$parent.term_class.id}}"
                                     v-if="$parent.term_class.course">
                            {{$parent.term_class.course.name}}
                        </router-link>
                        Registered Students
                        <div class="float-right">
                            <button
                                v-on:click="$parent.$router.back()"
                                class="btn btn-outline-primary btn-sm">
                                <i class="ni ni-bold-left"></i> Back
                            </button>
                        </div>
                    </h3>
                    <div class="progress-wrapper">
                        <div class="progress-info">
                            <div class="progress-label">
                                <span>Approvals</span>
                            </div>
                            <div class="progress-percentage">
                                <span>{{students_registrations.approved}}/{{students_registrations.approved+students_registrations.unapproved}}</span>
                            </div>
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-default" role="progressbar"  aria-valuemin="0" aria-valuemax="100"
                                 :aria-valuenow="students_registrations.approval_percentage"
                                 v-bind:style="{ width: students_registrations.approval_percentage + '%' }"></div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Student</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="sr in students_registrations.data">
                            <th>
                                <button v-on:click="view_student(sr)"
                                    class="btn btn-primary btn-sm">
                                    <i class="ni ni-bold-right"></i>
                                </button>
                            </th>
                            <td>{{sr.profile.user.num}}</td>
                            <td>{{$root.full_name(sr.profile.user)}}</td>
                            <td>{{sr.profile.user.email}}</td>
                            <td>
                                <div class="dbtn-group"
                                     v-show="$store.state.auth.hasRole('ac-4')">
                                    <a class="btn btn-sm dropdown-toggle" :class="[sr.approved_by_profile_id ? 'btn-outline-danger':'btn-outline-success']" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="ni" :class="[!sr.approved_by_profile_id ? 'ni-fat-add':'ni-fat-remove']"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <button class="dropdown-item" v-on:click="approval(sr)" v-if="sr.approved_by_profile_id">Cancel</button>
                                        <button class="dropdown-item" v-on:click="approval(sr)" v-else>Approve</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <laravel-vue-pagination :limit="5" :data="students_registrations" align="center" @pagination-change-page="get_students"></laravel-vue-pagination>
                </div>
            </div>
        </div>
        <modal :scrollable="true" name="view-modal" height="auto">
            <div class="modal modal-content" v-if="registration">
                <div class="modal-body">
                    <table class="table">
                        <tbody>
                        <tr>
                            <th colspan="2" class="text-center bg-light">
                                Students Info
                            </th>
                        </tr>
                        <tr>
                            <td>MAT #</td>
                            <th>{{registration.profile.user.num}}</th>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <th>{{$root.full_name(registration.profile.user)}}</th>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <th>{{registration.profile.user.email}}</th>
                        </tr>
                        <tr>
                            <td>Tel #</td>
                            <th>{{registration.profile.user.tel}}</th>
                        </tr>
                        </tbody>
                        <tbody v-if="registration.grades">
                            <tr>
                                <th colspan="2" class="text-center bg-light">
                                    Assessments
                                </th>
                            </tr>
                            <tr v-for="ass in registration.grades.term_class.assessments">
                                <td>{{ass.name}}</td>
                                <th>
                                <span class="text-danger" v-if="registration.grades.scores[ass.id] == null">
                                    Not Entered
                                </span>
                                    <span class="text-underline" v-else>
                                    {{registration.grades.scores[ass.id]}} / {{ass.score}}
                                </span>
                                </th>
                            </tr>
                            <tr class="bg-danger">
                                <td>Total</td>
                                <th class="text-underline">
                                    {{registration.grades.score}} / {{registration.grades.total}}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </modal>
        <modal :scrollable="true" name="approval" height="auto">
            <div class="modal-body" v-if="sr">
                <h2><small>#</small>{{sr.profile.user.num}}</h2>
                <h1>{{$root.full_name(sr.profile.user)}}</h1>
                <h2>{{sr.profile.user.email}}</h2>
                <hr>
                <div v-if="sr.approved_by_profile_id">
                    <h1 class="text-danger">Cancel Approval</h1>
                    <form v-on:submit="submitForm">
                        <fake-form-input></fake-form-input>
<!--//*pass                         <div class="form-group mb-3">-->
<!--                            <div class="input-group">-->
<!--                                <div class="input-group-prepend">-->
<!--                                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                </div>-->
<!--                                <input class="form-control" placeholder="Password confirmation"-->
<!--                                       type="password" v-model="form.input.password"-->
<!--                                       required>-->
<!--                            </div>-->
<!--                        </div>-->
                        <button type="submit" class="btn btn-danger btn-block">Cancel</button>
                    </form>
                </div>
                <div v-else>
                    <form v-on:submit="submitForm">
                        <fake-form-input></fake-form-input>
                        <button type="submit" class="btn btn-primary btn-block">Approve Class Registration</button>
                    </form>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "StudentsClasses",
        data() {
            return {
                students_registrations: {},
                registration: null,
                sr: null,
                form: {
                    input: {}
                },
            }
        },
        created () {
            this.fetchData();
            this.$parent.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            submitForm: function(e) {
                e.preventDefault();
                axios.post('/academic/classes/'+this.sr.id+'/approve-registrations', this.form.input)
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.get_students(this.students_registrations.current_page);
                        this.sr = null;
                        this.$modal.hide('approval');
                    });
            },
            approval: function (sr) {
                this.sr = sr;
                this.$modal.show('approval');
            },
            view_student: function (student) {
                axios.get('/academic/classes/registrations/get/'+student.id)
                    .then((res) => {
                        this.registration = res.data.registration;

                        if (this.registration.grades)
                        {
                            this.registration.grades.score = this.registration.grades.total = 0;

                            for (let ass of this.registration.grades.term_class.assessments) {

                                if (this.registration.grades.scores[ass.id] != null)
                                    this.registration.grades.score += parseFloat(this.registration.grades.scores[ass.id]);
                                this.registration.grades.total += parseFloat(ass.score);
                            }
                        }
                    });
                this.$modal.show('view-modal');
            },
            fetchData: function() {
                this.get_students();
            },
            get_students: function(page=1) {
                axios.get('/academic/classes/'+this.$route.params.id+'/registrations?page='+page)
                    .then((res) => {
                        this.students_registrations = res.data.class_registrations;
                        this.students_registrations.approved = res.data.approved;
                        this.students_registrations.unapproved = res.data.unapproved;
                        this.students_registrations.approval_percentage =
                            (res.data.approved/(res.data.approved+res.data.unapproved))*100;
                    });
            },
        },
    }
</script>

<style scoped>
</style>
