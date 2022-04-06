<template>
    <div class="row">
        <div class="col-xl-12 order-xl-1">
            <div class="card bg-secondary shadow">
                <div class="card-header ">
                    <h3>
                        <i class="ni ni-ruler-pencil"></i>
                        <router-link class=""
                                     :to="{name:'ac.classes.show',params:{id:$parent.term_class.id}}"
                                     v-if="$parent.term_class.course">
                            {{$parent.term_class.course.name}}
                        </router-link>
                        Assessments
                        <div class="float-right">
                            <button
                                v-on:click="$parent.$router.back()"
                                class="btn btn-outline-primary btn-sm">
                                <i class="ni ni-bold-left"></i> Back
                            </button>
                            <button v-on:click="new_assessment"
                                    v-show="$store.state.auth.hasRole('ac-2')"
                                    class="btn btn-primary btn-sm">
                                Create New
                            </button>
                        </div>
                    </h3>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Times</th>
                            <th>Score</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="ass in assessments">
                            <td>
                                <button
                                    v-on:click="viewAss(ass)"
                                    class="btn btn-primary btn-sm">
                                    <i class="ni ni-bold-right"></i>
                                </button>
                            </td>
                            <td>{{ass.name}}</td>
                            <td>
                                <li>{{$root.moment(ass.starting_at)}}</li>
                                <li>{{$root.moment(ass.ending_at)}}</li>
                            </td>
                            <td>{{ass.score}}</td>
                            <td>
                                <router-link
                                    v-show="$store.state.auth.hasRole('ac-3')"
                                    :to="{name:'ac.classes.assessment.grade',params:{ass:ass.id,tc:$parent.term_class.id}}"
                                             class="btn btn-sm btn-link">
                                    Grades
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="3" class="text-right">Total</th>
                            <th class="text-underline"><h3>{{total}} / 100</h3></th>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    <modal :scrollable="true" name="form-modal" height="auto">
                        <div class="modal modal-content">
                            <h2 class="modal-header">
                                {{form.title}}
                            </h2>
                            <div class="modal-body">
                                <form v-on:submit="submitForm">
                                    <fake-form-input></fake-form-input>
                                    <div class="form-group mb-3" v-if="form.input.name !== undefined">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Name :</span>
                                            </div>
                                            <input class="form-control" placeholder="...."
                                                   type="text" v-model="form.input.name"
                                                   required>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3" v-if="form.input.starting_at !== undefined">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Starting At :</span>
                                            </div>
                                            <input type="datetime-local" class="form-control" v-model="form.input.starting_at" required>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3" v-if="form.input.ending_at !== undefined">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Ending At :</span>
                                            </div>
                                            <input type="datetime-local" class="form-control" v-model="form.input.ending_at" required>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3" v-if="form.input.info !== undefined">
                                        <label></label>
                                        <textarea
                                            v-model="form.input.info" required
                                            rows="4" class="form-control form-control" placeholder="Provide Venue and other necessary informations here..."></textarea>
                                    </div>
                                    <div class="form-group col-8" v-if="form.input.score !== undefined">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Score :</span>
                                            </div>
                                            <input class="form-control" placeholder="...."
                                                   type="number" step="0.01" min="1" max="100"
                                                   v-model="form.input.score" required>
                                        </div>
                                    </div>
<!--//*pass                                     <div class="form-group mb-3">-->
<!--                                        <div class="input-group">-->
<!--                                            <div class="input-group-prepend">-->
<!--                                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                            </div>-->
<!--                                            <input class="form-control" placeholder="Password confirmation"-->
<!--                                                   type="password" v-model="form.input.password"-->
<!--                                                   required>-->
<!--                                        </div>-->
<!--                                    </div>-->
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </form>
                            </div>
                        </div>
                    </modal>
                    <modal :scrollable="true" name="view-ass" height="auto">
                        <div class="modal modal-content" v-if="assessment">
                            <div class="modal-body">
                                <button v-on:click="editAss" class="btn btn-warning btn-sm"
                                        v-show="$store.state.auth.hasRole('ac-2')">
                                    Edit
                                </button>
                                <button v-on:click="deleteAss" class="btn btn-danger btn-sm"
                                        v-show="$store.state.auth.hasRole('ac-2')">
                                    Delete
                                </button>
                                <table class="table">
                                    <tr>
                                        <td>Name</td>
                                        <th>{{assessment.name}}</th>
                                    </tr>
                                    <tr>
                                        <td>Starting At</td>
                                        <th>{{$root.moment(assessment.starting_at)}}</th>
                                    </tr>
                                    <tr>
                                        <td>Ending At</td>
                                        <th>{{$root.moment(assessment.ending_at)}}</th>
                                    </tr>
                                    <tr>
                                        <td>Score</td>
                                        <th>{{assessment.score}}%</th>
                                    </tr>
                                    <tr>
                                        <td>Info</td>
                                        <th>{{assessment.info}}</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AssessmentsClasses",
        data() {
            return {
                assessments: {},
                assessment: null,
                total: 0,
                form: {
                    input: {},
                }
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
            deleteAss: function() {
                this.form = {
                    title: 'Delete '+this.assessment.name,
                    type: 'delete',
                    input: {
                        id: this.assessment.id,
                        term_class_id: this.assessment.term_class_id,
                    }
                };
                this.$modal.show('form-modal');
                this.$modal.hide('view-ass');
            },
            editAss: function() {
                this.form = {
                    title: 'Edit '+this.assessment.name,
                    type: 'update',
                    input: {
                        id: this.assessment.id,
                        name: this.assessment.name,
                        starting_at: this.assessment.starting_at,
                        ending_at: this.assessment.ending_at,
                        info: this.assessment.info,
                        score: this.assessment.score,
                        term_class_id: this.assessment.term_class_id,
                    }
                };
                this.$modal.show('form-modal');
                this.$modal.hide('view-ass');
            },
            viewAss: function(ass) {
                axios.get('/academic/assessments/'+ass.id)
                    .then((res) => {
                        this.assessment = res.data.assessment;
                        this.$modal.show('view-ass');
                    });
            },
            submitForm: function(e) {
                e.preventDefault();
                axios.post('/academic/assessments/'+this.form.type, this.form.input)
                    .then((res) => {

                        this.assessments = res.data.assessments;
                        this.$root.post_success(res.data.success);
                        this.cal_assessments(res.data.assessments);
                        this.$modal.hide('form-modal');
                    });
            },
            new_assessment: function() {
                this.form = {
                    title: 'Create a New Assessment',
                    type: 'store',
                    input: {
                        name: '',
                        starting_at: '',
                        ending_at: '',
                        info: '',
                        score: '',
                        term_class_id: this.$route.params.id,
                    }
                };
                this.$modal.show('form-modal');
            },
            fetchData: function() {
                this.get_assessments();
            },
            cal_assessments: function(assessments) {
                this.total = 0;

                for (let ass of assessments)
                    this.total += ass.score;
            },
            get_assessments: function(page=1) {
                axios.get('/academic/classes/'+this.$route.params.id+'/assessments')
                    .then((res) => {

                        this.assessments = res.data.assessments;
                        this.cal_assessments(res.data.assessments);
                    });
            },
        },
    }
</script>

<style scoped>
</style>
