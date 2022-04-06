<template>
    <div class="container-fluid">
        <div class="header-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-stats mb-4 mb-xl-0">
                        <div class="card-body">
                            <button v-on:click="view_grades"
                                    class="btn btn-link btn-sm">
                                <i class="ni ni-bullet-list-67"></i> Assessments & Grades
                            </button>
                            <button v-on:click="view_files"
                                    class="btn btn-link btn-sm">
                                <i class="ni ni-folder-17"></i> Uploaded Resources
                            </button>
                            <router-link :to="{name:'s.mails', params:{id:$parent.term_class.id}}"
                                class="btn btn-link btn-sm">
                                <i class="ni ni-email-83"></i> Mails
                            </router-link>
                            <div class="float-right">
                                <button
                                    v-if="$root.not_expired($parent.term_class.term.unregistration_deadline)"
                                    class="btn btn-link btn-sm text-danger"
                                    v-on:click="$modal.show('registration')">
                                    Un-Register
                                </button>
                            </div>
                            <modal :scrollable="true" name="registration" height="auto" :draggable="true">
                                <div class="modal modal-content">
                                    <h3 class="modal-header">
                                        Are you shore you want to unregistered to the course
                                        <span class="text-underline">{{$parent.term_class.course.name}}</span>?
                                    </h3>
                                    <div class="modal-body">
                                        <button v-if="$root.not_expired($parent.term_class.term.unregistration_deadline)"
                                                class="btn btn-danger btn-block" v-on:click="unregister">
                                            Un-Register</button>
                                    </div>
                                </div>
                            </modal>
                            <modal :scrollable="true" name="files" height="auto" :draggable="true">
                                <div class="modal modal-content" v-if="files">
                                    <h3 class="modal-header">
                                        <i class="ni ni-books">
                                            Uploaded Resources
                                        </i>
                                    </h3>
                                    <table class="table modal-body">
                                        <tbody>
                                        <tr v-for="file in files.data">
                                            <td>
                                                <a :href="'/storage/'+file.url" target="_blank"
                                                   class="font-weight-bold text-underline">
                                                    {{ file.name }}
                                                </a>
                                                <span>
                                                        <span class="badge"><i class="ni ni-chart-pie-35"></i> {{ $root.file_size(file.size) }}</span>
                                                        <span class="badge"><i class="ni ni-single-02"></i> {{ $root.full_name(file.profile.user) }}</span>
                                                    </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <laravel-vue-pagination :limit="5" :data="files" align="center" @pagination-change-page="get_files">
                                    </laravel-vue-pagination>
                                </div>
                            </modal>
                            <modal :scrollable="true" name="info" height="auto" :draggable="true">
                                <div class="modal modal-content">
                                    <h3 class="modal-header">{{info.title}}</h3>
                                    <div class="modal-body">
                                        <div v-if="assessment">
                                            <a
                                                v-on:click="assessment = null"
                                                class="btn btn-sm btn-outline-primary">
                                                <i class="ni ni-bold-left"></i> Back
                                            </a>
                                            <table class="table">
                                                <tr>
                                                    <td>
                                                        <h3>{{assessment.name}}</h3>
                                                        <h5>
                                                            <li><small>Starting At: </small>{{$root.moment(assessment.starting_at)}}</li>
                                                            <li><small>Ending At: </small>{{$root.moment(assessment.ending_at)}}</li>
                                                        </h5>
                                                        <h5>
                                                            Score: {{ assessment.score}} / 100
                                                        </h5>
                                                        {{assessment.info}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Grade
                                                        <h5>
                                                            <span class="text-danger" v-if="grades.scores[assessment.id] == null">
                                                            Not Entered
                                                        </span>
                                                            <span class="text-underline" v-else>
                                                            {{grades.scores[assessment.id]}} / {{assessment.score}}
                                                        </span>
                                                        </h5>
                                                    </th>
                                                </tr>
                                            </table>
                                        </div>
                                        <div v-else-if="grades">
                                            <table class="table">
                                                <tr>
                                                    <th></th>
                                                    <th>Assessment</th>
                                                    <th>Grade</th>
                                                </tr>
                                                <tr v-for="ass in grades.term_class.assessments">
                                                    <td>
                                                        <a
                                                           v-on:click="assessment = ass"
                                                           class="btn btn-sm btn-light">
                                                            <i class="ni ni-bold-right"></i>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        {{ass.name}}
                                                    </td>
                                                    <th>
                                                        <span class="text-danger" v-if="grades.scores[ass.id] == null">
                                                            Not Entered
                                                        </span>
                                                        <span class="text-underline" v-else>
                                                            {{grades.scores[ass.id]}} / {{ass.score}}
                                                        </span>
                                                    </th>
                                                </tr>
                                                <tr class="bg-light">
                                                    <td colspan="2">Total</td>
                                                    <th class="text-underline">
                                                        {{grades.score}} / {{grades.total}}
                                                    </th>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </modal>
                            <table class="table">
                                <tr>
                                    <td>
                                        <h6>Course</h6>
                                        {{$parent.term_class.course.code+' - '+$parent.term_class.course.name}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6>Academic Term</h6>
                                        {{$parent.term_class.term.name}}<br>
                                        <small>Start Date:</small> {{$root.format_date($parent.term_class.term.starting_at)}}<br>
                                        <small>End Date:</small> {{$root.format_date($parent.term_class.term.ending_at)}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6>Venue</h6>
                                        {{$parent.term_class.venue.name+', '+$parent.term_class.venue.description}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6>Lecturers</h6>
                                        <ul>
                                            <li class="" v-for="lect in $parent.term_class.class_lecturers">
                                                {{$root.full_name(lect.profile.user)}}
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
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
                form: {
                    input: {
                        search: '',
                    }
                },
                info: {
                    title: '',
                },
                lecturers: {},
                grades: null,
                errors: null,
                assessment: null,
                files: null,
            }
        },
        methods: {
            view_files: function() {
                this.get_files();
                this.$modal.show('files');
            },
            get_files: function(page = 1) {
                axios.get('/students/classes/'+this.$route.params.id+'/files?page='+page)
                    .then((res) => {
                        this.files = res.data.files;
                    });
            },
            view_grades: function() {
                this.info.title = 'Assessments & Grades';
                axios.get('/students/classes/'+this.$route.params.id+'/grades')
                    .then((res) => {
                        this.grades = res.data.grades;
                        this.grades.score = 0;
                        this.grades.total = 0;

                        for (let ass of this.grades.term_class.assessments) {
                            this.grades.score += parseFloat(this.grades.scores[ass.id]);
                            this.grades.total += parseFloat(ass.score);
                        }
                        this.$modal.show('info');
                    });
            },
            unregister: function() {
                axios.post('/students/unregister', {class:this.$parent.term_class.id})
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.$router.back();
                    });
            },
        },
    }
</script>

<style scoped>

</style>
