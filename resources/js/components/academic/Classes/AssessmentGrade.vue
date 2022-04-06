<template>
    <div class="row">
        <div class="col-xl-12 order-xl-1">
            <div class="card shadow">
                <div class="card-header">
                    <button
                        v-on:click="$parent.$router.back()"
                        class="btn btn-outline-primary btn-sm float-right">
                        <i class="ni ni-bold-left"></i> Back
                    </button>
                    <h4 v-if="term_class.course">
                        <small>Course:</small>
                        {{term_class.course.name}}
                    </h4>
                    <h4>
                        <small>Assessment:</small>
                        {{assessment.name}}
                    </h4>
                    <hr>
                    <downloadexcel v-if="term_class.course"
                        class="btn btn-sm btn-outline-default"
                        :fetch="getCSV"
                        :fields="json_fields"
                        :name="
                            (term_class.course.name).replace(/\s+/g, '_').toLowerCase() +
                            ' - ' +
                            (assessment.name).replace(/\s+/g, '_').toLowerCase() +
                            '.csv'
                        "
                        :before-generate="startDownload"
                        :before-finish="finishDownload"
                        type="csv">
                        <i class="ni ni-cloud-download-95"></i>
                        Download CSV
                    </downloadexcel>
                    <button v-on:click="$modal.show('upload_csv')"
                        class="btn btn-sm btn-outline-default">
                        <i class="ni ni-cloud-upload-96"></i>
                        Upload CSV
                    </button>
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
                            <tr v-for="i in Object.keys(grades)">
                                <th>{{$root.full_name(grades[i].student_profile.user)}}</th>
                                <th>{{grades[i].student_profile.user.num}}</th>
                                <th>
                                    <div v-if="editable[grades[i].id] == null" class="form-group">
                                        <div class="input-group input-group-sm mb-4">
                                            <input class="form-control" placeholder="score" type="number"
                                                   v-model="grades[i].scores[$route.params.ass]"
                                                   step="0.01" min="0" :max="assessment.score">
                                            <div class="input-group-append">
                                                <span class="input-group-text">/ {{assessment.score}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span v-else>
                                        {{grades[i].scores[$route.params.ass]+' / '+assessment.score}}
                                    </span>
                                </th>
                            </tr>
                            <tr v-if="!all_stored">
                                <td colspan="3" class="text-right">
                                    <span v-if="confirm">
                                         <div class="form-group mb-3">
                                             <label class="form-control-label">
                                                 Save Scores.
<!--//*pass                                                  <small>You must confirm with your password to save grades.</small>-->
                                             </label>
<!--//*pass                                             <div class="input-group">-->
<!--                                                <div class="input-group-prepend">-->
<!--                                                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                                </div>-->
<!--                                                <input class="form-control" placeholder="Password confirmation"-->
<!--                                                       type="password" v-model="password">-->
<!--                                            </div>-->
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
        </div>
        <modal :scrollable="true" name="upload_csv" height="auto" :draggable="true">
            <div class="modal modal-content">
                <h3 class="modal-header">Upload CSV file with students grades added.</h3>
                <div class="modal-body">
                    <div class="form-group mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                            </div>
                            <input class="form-control" placeholder="CSV file"
                                   accept=".csv"
                                   type="file" v-on:change="onFileChange">
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import downloadexcel from "vue-json-excel";
    export default {
        name: "AssessmentGrade",
        components: {
            downloadexcel,
        },
        data() {
            return {
                json_fields: {
                    '#': 'mark',
                    'Name': 'name',
                    'MAT Number': 'mat',
                    'Score': 'score',
                    'Grade': 'grade',
                },
                assessment: {},
                students_registrations: {},
                term_class: {},
                grades: {},
                confirm: false,
                editable: [],
                all_stored: true,
                //*pass password: null,
                input_csv: null,
            }
        },
        created () {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            onFileChange: function(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;

                const file_reader = new FileReader();
                file_reader.readAsText(files[0]);

                file_reader.onload = (e) => {

                    let data = [];

                    for (let line of (e.target.result).split('\n'))
                    {
                        if (line.charAt(0) === '>')
                        {
                            data = line.split(',');
                            this.grades['_'+data[2]].scores[this.$route.params.ass] = data[3];
                            this.$forceUpdate();
                        }
                    }

                };

                this.$modal.hide('upload_csv');
            },
            getCSV: function() {
                let csv_data = [];

                for (let i in this.grades)
                {
                    csv_data.push({
                        mark: '>',
                        name: this.$root.full_name(this.grades[i].student_profile.user),
                        mat: this.grades[i].student_profile.user.num,
                        score: this.grades[i].scores[this.$route.params.ass],
                        grade: this.assessment.score,
                    });
                }

                return csv_data;
            },
            startDownload: function() {
            },
            finishDownload: function() {
            },
            submitForm: function(e) {
                e.preventDefault();

                if (this.confirm) {

                    //*pass if (!this.password)
                    ////*pass  this.$root.post_errors([['Confirm your password to be able to complete the action.']]);

                    //*pass else {
                        // let grades = [];
                        // for (let sr of this.students_registrations)
                        //     grades.push({id:sr.profile_id, score:sr.score});
                axios.post('/academic/grades/store',
                            {
                                grades: this.grades,
                                //*pass password: this.password,
                                assessment: this.assessment.id,
                            })
                            .then((res) => {
                                this.$root.post_success(res.data.success);
                                this.load_grades(res.data.grades);
                                this.calEditable();
                    })
                        //*pass }
                } else this.confirm = true;
            },
            calEditable: function() {
                this.all_stored = true;
                for (let i in this.grades) {

                    this.editable[this.grades[i].id] = this.grades[i].scores[this.$route.params.ass];

                    if (this.editable[this.grades[i].id] === undefined || this.editable[this.grades[i].id] === null)
                        this.all_stored = false;
                }
            },
            fetchData: function () {

                this.get_grades();
                //this.get_students();
                this.get_assessment();
                this.get_term_class();
            },
            get_grades: function() {
                axios.get('/academic/grades/'+this.$route.params.tc+'/assignment')
                    .then((res) => {
                        this.load_grades(res.data.grades);
                        this.calEditable();
                    })
            },
            load_grades: function (grades) {

                this.grades = {};
                for (let grade of grades)
                    this.grades['_'+grade.student_profile.user.num] = grade;
            },
            get_term_class: function () {
                axios.get('/academic/classes/'+this.$route.params.tc)
                    .then((res) => {
                        this.term_class = res.data.term_class;
                    })
            },
            get_assessment: function() {
                axios.get('/academic/assessments/'+this.$route.params.ass)
                    .then((res) => {
                        this.assessment = res.data.assessment;
                    });
            },
            get_students: function() {
                axios.get('/academic/classes/'+this.$route.params.tc+'/registrations/all')
                    .then((res) => {
                        this.students_registrations = res.data.class_registrations;
                    });
            },
        },
    }
</script>

<style scoped>

</style>
