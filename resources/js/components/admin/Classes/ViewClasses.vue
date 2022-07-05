<template>
    <div class="col-md-12">
        <EditClasses v-if="form.input.term_class"></EditClasses>
        <div class="card shadow mb-4 mb-xl-0" id="view" v-else>
            <div class="card-header bg-transparent">
                <h2 class="mb-0">
                    <i class="ni ni-calendar-grid-58"></i>
                    <router-link
                        v-if="term_class.term"
                        :to="{name:'ad.term.classes', params:{term:term_class.term.id}}">
                        {{term_class.term.name}}
                    </router-link>
                    Class
                    <div class="float-right">
                        <button
                            class="btn btn-danger btn-sm"
                            v-on:click="$modal.show('delete_modal')">Delete</button>
                        <router-link
                            class="btn btn-warning btn-sm"
                            :to="{name:'ad.show.classes', params:{term:term_class.id,ops:'edit'}}">
                            Edit
                        </router-link>
                    </div>
                </h2>
            </div>
            <modal :scrollable="true" name="delete_modal" height="auto">
                <h2 class="modal-header">Delete Class</h2>
                <div class="modal-body">
                    <form @submit="submitDeleteForm">
                        <fake-form-input></fake-form-input>

<!--//*pass                         <div class="form-group mb-3">-->
<!--                            <div class="input-group">-->
<!--                                <div class="input-group-prepend">-->
<!--                                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                </div>-->
<!--                                <input class="form-control" placeholder="Password confirmation"-->
<!--                                       type="password" v-model="form.delete.password"-->
<!--                                       required>-->
<!--                            </div>-->
<!--                        </div>-->
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </modal>
            <div class="table-responsive">
                <table class="table align-items-center table-flush">
                    <tbody>
                    <tr>
                        <td>Course</td>
                        <th v-if="term_class.course">
                            <span class="text-underline" v-if="term_class.term_class">{{term_class.term_class.course.name}} <br></span>
                            {{term_class.course.name}}
                        </th>
                    </tr>
                    <tr>
                        <td>Venue</td>
                        <th v-if="term_class.venue_id !== 0">{{term_class.venue.name}}</th>
                    </tr>
                    <tr>
                        <td>Times</td>
                        <th v-if="term_class.times">
                            <li v-for="time in term_class.times">
                                <strong>{{time.day}}</strong>, {{$root.moment(time.time)}}
                            </li>
                        </th>
                    </tr>
                    <tr>
                        <td>Size</td>
                        <th>
                            {{term_class.taken}} <small>taken</small>
                            +
                            {{term_class.size - term_class.taken}} <small>available</small>
                            /
                            <small>total</small> {{term_class.size}}
                            <div class="progress">
                                <div class="progress-bar bg-danger" role="progressbar"
                                     :aria-valuenow="term_class.taken" aria-valuemin="0" :aria-valuemax="term_class.size"
                                     :style="'width: '+((term_class.taken/term_class.size)*100)+'%;'"></div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <td>Students</td>
                        <th>
                            <button class="btn btn-primary btn-sm"
                            v-on:click="view_students">
                                {{term_class.taken}} registered students.
                            </button>
                        </th>
                    </tr>
                    <modal  name="students" height="auto" :draggable="true">
                        <div class="modal modal-content">
                            <div class="modal-header">
                                Registered Students
                            </div>
                            <button
                                class="btn btn-danger btn-sm float-right"
                                v-on:click="registerAllStudents">Register All Students from Set</button>
                            <div class="modal-body">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Student</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="regs in class_registrations.data">
                                        <td>{{regs.profile.user.num}}</td>
                                        <td>{{$root.full_name(regs.profile.user)}}</td>
                                        <td>
                                            <router-link :to="{name:'ad.student.classes',params:{class:term_class.id,id:regs.profile.id}}"
                                            target="_blank" class="btn btn-sm btn-primary">
                                                <i class="ni ni-bullet-list-67"></i>
                                            </router-link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <laravel-vue-pagination :limit="5" :data="class_registrations" align="center" @pagination-change-page="get_students"></laravel-vue-pagination>
                            </div>
                        </div>
                    </modal>
                    <tr>
                        <td>Lecturers</td>
                        <th v-if="term_class.class_lecturers">
                            <li v-for="lect in term_class.class_lecturers">
                                {{$root.full_name(lect.profile.user)}}
                                <small class="text-underline">{{lect.profile.user.email}}</small>
                            </li>
                            <br>
                            <button v-on:click="addLecturer"
                                    v-show="$store.state.auth.hasRole('ad-6')"
                                    class="btn btn-sm btn-outline-dark">
                                <i class="ni ni-ruler-pencil"></i> Lecturer Allocation
                            </button>
                            <modal :scrollable="true" name="add_lecturer" height="auto">
                                <div class="modal modal-content">
                                    <h1 class="modal-header">Lecturer Allocation</h1>
                                    <form class="modal-body" @submit="submitForm">
                                        <fake-form-input></fake-form-input>
                                        <div class="row">
                                            <div class="col-12">
                                                <label>Add Lecturer</label>
                                            </div>
                                            <div class="form-group  col-md-4">
                                                <div class="input-group mb-4">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                                                    </div>
                                                    <input v-on:change="search" v-model="form.input.search"
                                                           class="form-control" placeholder="Search lecturer by name or email.." type="text">
                                                </div>
                                            </div>
                                            <div class="form-group mb-3 col-md-8">
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        User:
                                                    </span>
                                                    </div>
                                                    <select class="form-control" v-if="lecturers.length" v-model="form.input.profile_id" required>
                                                        <option
                                                            v-for="lecturer in lecturers"
                                                            :value="lecturer.profile.id">
                                                            {{$root.full_name(lecturer.user)+' - '+lecturer.user.email}}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group mb-3 col-12">
                                                <label>Remove Lecturer</label>
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="ni ni-fat-remove"></i></span>
                                                    </div>
                                                    <select class="form-control" v-model="form.input.remove_id">
                                                        <option value="0">*** None</option>
                                                        <option v-for="lect in term_class.class_lecturers" :value="lect.id">
                                                            {{$root.full_name(lect.profile.user)}} -
                                                            {{lect.profile.user.email}}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
<!--//*pass                                             <div class="form-group mb-3 col-12">-->
<!--                                                <div class="input-group">-->
<!--                                                    <div class="input-group-prepend">-->
<!--                                                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                                    </div>-->
<!--                                                    <input class="form-control" placeholder="Password confirmation"-->
<!--                                                           type="password" v-model="form.input.password"-->
<!--                                                           required>-->
<!--                                                </div>-->
<!--                                            </div>-->
                                            <div class="modal-footer">
                                                <button type="submit" class="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </modal>
                        </th>
                    </tr>
                    <tr v-if="term_class.assessments"
                        v-show="$store.state.auth.hasRole('ad-5.1')">
                        <td>Assessments</td>
                        <th>
                            <li v-for="assessment in term_class.assessments">
                                {{assessment.name}}
                                <small class="text-underline">{{assessment.score}} / 100</small>
                                <button class="btn btn-link text-warning" v-on:click="reset_assessment(assessment)">
                                    <i class="ni ni-settings-gear-65"></i>
                                </button>
                                <modal  name="reset_assessment" height="auto" :draggable="true">
                                    <div class="modal modal-content">
                                        <div class="modal-header">
                                            Reset Assessment
                                        </div>
                                        <div class="modal-body">
                                            <p>
                                                When save changes clicked, all grades uploaded under this assessment
                                                <br>
                                                will be reset. Assessment score can be changed from this form.
                                            </p>
                                            <table class="table align-items-center table-flush" v-if="reset.assessment">
                                                <tbody>
                                                <tr>
                                                    <td>Assessment</td>
                                                    <th>{{reset.assessment.name}}</th>
                                                </tr>
                                                <tr>
                                                    <td>Current Score</td>
                                                    <th>{{reset.assessment.score}} / 100</th>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <hr>
                                            <form @submit="resetAssessmentForm">
                                                <fake-form-input></fake-form-input>

<!--//*pass                                                 <div class="form-group mb-3">-->
<!--                                                    <div class="input-group">-->
<!--                                                        <div class="input-group-prepend">-->
<!--                                                            <span class="input-group-text">Score</span>-->
<!--                                                        </div>-->
<!--                                                        <input class="form-control" placeholder="Password confirmation"-->
<!--                                                               type="number" v-model="reset.form.score"-->
<!--                                                               min="0" max="100"-->
<!--                                                               required>-->
<!--                                                    </div>-->
<!--                                                </div>-->

<!--                                                <div class="form-group mb-3">-->
<!--                                                    <div class="input-group">-->
<!--                                                        <div class="input-group-prepend">-->
<!--                                                            <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                                        </div>-->
<!--                                                        <input class="form-control" placeholder="Password confirmation"-->
<!--                                                               type="password" v-model="reset.form.password"-->
<!--                                                               required>-->
<!--                                                    </div>-->
<!--                                                </div>-->
                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </modal>
                            </li>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import FakeFormInputs from "../../layouts/FakeFormInputs";
    import EditClasses from "./EditClasses";
    export default {
        components: {EditClasses, FakeFormInputs},
        name: "ViewClasses",
        data() {
            return {
                term_class: {},
                reset: {
                    assessment: null,
                    form: {}
                },
                form: {
                    input: {
                        profile_id: null,
                        remove_id: null,
                        password: null,
                        search: '',
                        term_class: null,
                    },
                    delete: {
                        id: null,
                        password: null,
                    }
                },
                lecturers: [],
                errors: null,
                class_registrations: {},
            }
        },
        created () {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            registerAllStudents: function ()
            {
                axios.post('/admin/classes/register-all-students', {
                    class: this.$route.params.class,
                })
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.term_class = res.data.term_class;
                    });
            },
            resetAssessmentForm: function (e)
            {
                e.preventDefault();

                axios.post('/admin/classes/reset/assessment', this.reset.form)
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.term_class = res.data.term_class;
                    });
            },
            reset_assessment: function (assessment)
            {
                this.reset.assessment = assessment;
                this.reset.form.id = assessment.id;
                this.reset.form.score = assessment.score;
                this.reset.form.term_class_id = this.term_class.id;
                this.reset.form.password = null;
                this.$modal.show('reset_assessment');
            },
            view_students: function() {
                this.get_students();
                this.$modal.show('students');
            },
            get_students: function(page=1) {
                axios.get('/admin/classes/registrations='+this.term_class.id+'?page='+page)
                    .then((res) => {
                        this.class_registrations = res.data.class_registrations;
                    });
            },
            search: function() {
                this.lecturers = {};
                axios.post('/admin/search/lecturers', {search:this.form.input.search})
                    .then((res) => {
                        this.lecturers = res.data.lecturers;
                    })
            },
            submitDeleteForm: function(e) {
                e.preventDefault();

                this.form.delete.id = this.term_class.id;
                this.form.delete.term = this.term_class.term;
                axios.post('/admin/classes/destroy', this.form.delete)
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.$router.push({name:'ad.term.classes', params:{term:this.form.delete.term.id}});
                    });
            },
            submitForm: function(e) {
                e.preventDefault();

                this.form.input.term_class_id = this.term_class.id;
                if (this.form.type === 'al')
                {
                axios.post('/admin/classes/add-lecturer', this.form.input)
                        .then((res) => {
                            this.term_class = res.data.term_class;
                            this.$root.post_success(res.data.success);
                            this.get_class(this.$route.params.class);
                            this.$modal.hide('add_lecturer');
                    });
                }
            },
            addLecturer: function() {
                this.$modal.show('add_lecturer');

                this.form.input = {
                    password: '',
                    profile_id: null,
                    remove_id: 0,
                };
                this.form.type = 'al';
            },
            fetchData: function() {
                this.get_class(this.$route.params.class);

                if (this.$route.params.ops === undefined)
                    this.form.input.term_class = null;
            },
            get_class: function(id)
            {
                axios.get('/admin/classes/show='+id)
                    .then(res => {
                        this.term_class = res.data.term_class;

                        // console.log(this.term_class)

                        if (this.$route.params.ops === 'edit')
                            this.form.input.term_class = this.term_class;
                    });
            }
        },
    }
</script>

<style scoped>

</style>
