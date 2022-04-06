<template>
    <div class="row card shadow" v-if="user && profile.major_department">
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <table class="table table-borderless" v-for="i in Object.keys(profile.transcript.terms)">
                        <thead style="margin-top:3px;border-top:1px solid #8898aa;">
                        <tr class="thead-light">
                            <th colspan="5" class="text-center">
                                <h5>{{profile.transcript.terms[i].term.name}}</h5>
                            </th>
                        </tr>
                        <tr class="thead-light">
                            <th>Course Code</th>
                            <th>Course Description</th>
                            <th class="text-center">Credit Value</th>
                            <th class="text-center">Qualitative Point</th>
                            <th class="text-center">Grade</th>
                        </tr>
                        </thead>
                        <tbody v-for="grade in profile.transcript.terms[i].grades">
                        <tr v-for="si in Object.keys(grade.transcript_data)">
                            <td>
                                {{grade.term_class.course.code}}
                            </td>
                            <td>
                                {{grade.term_class.course.name}}
                                <!--print resit-->
                                <span v-show="grade.transcript_data[si].is_resit">
                                            (Resit)
                                        </span>
                                <!--if grade approved-->
                                <span v-if="grade.transcript_data[si].is_not_approved"
                                      class="float-right text-danger">
                                            Not Approved
                                        </span>
                            </td>
                            <td class="text-center">
                                {{ grade.term_class.course.credit_hours }}
                            </td>
                            <td class="text-center">
                                {{parseFloat(grade.transcript_data[si].gs.point).toFixed(2)}}
                            </td>
                            <td class="text-center">
                                {{grade.transcript_data[si].gs.grade}}
                            </td>
                        </tr>
                        </tbody>
                        <thead>
                        <tr>
                            <td colspan="5"></td>
                        </tr>
                        </thead>
                    </table>
                    <table class="table table-borderless">
                        <thead style="margin-top:3px;border-top:1px solid #8898aa;">
                        <tr>
                            <th colspan="5" class="text-center">
                                    <span class="h5">
                                        Average Quality Point:
                                    </span>
                                <span class="h3">
                                        {{profile.transcript.gpa.calculated.toFixed(2)}}
                                    </span>
                            </th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="row card card-stats">
        <h3 class="card-header">
            Invalid Student Profile
        </h3>
    </div>
</template>

<script>
    export default {
        name: "Transcript",
        data() {
            return {
                user: null,
                profile: null,
                transcript: {},
            }
        },
        mounted() {
            this.$store.state.page = 'My Transcript';
            this.get_user();
        },
        methods: {
            get_user: function() {
                axios.post('/students/get/transcript')
                    .then(res => {

                        this.user = res.data.user;
                        this.profile = this.$root.generate_transcript(res.data.profile);

                        // this.generate_transcript();
                    });
            },
            generate_transcript: function () {

                if (this.profile.major_department == null)
                    this.$root.post_errors([['Your student status is invalid.']]);

                else if (this.profile.major_department.has_rotation)   // medical transcript
                { // this.profile.grades
                    this.transcript = { type: 'm', data: [] };

                    let grades = [];

                    for (let grade of this.profile.grades) {
                        if (grade.term_class.term.external_exam_percentage !== null) {
                            this.transcript.data[grade.id] = grade;
                            this.transcript.data[grade.id].grades = [];
                        }
                        else
                            grades[grade.id] = grade;
                    }

                    for (let i in grades) {
                        for (let yi in this.transcript.data) {
                            if (grades[i].term_class.term.term_id === this.transcript.data[yi].term_class.term.id) {
                                this.transcript.data[yi].grades[grades[i].id] = grades[i];
                            }
                        }
                    }
                }
                else   // normal transcript
                { // this.profile.grades
                    this.transcript = { type: 'n', data: [] };

                    for (let grade of this.profile.grades) {
                        if (this.transcript.data[grade.term_class.term_id] === undefined) {
                            this.transcript.data[grade.term_class.term_id] = {
                                term: grade.term_class.term,
                                grades: []
                            };
                        }
                        this.transcript.data[grade.term_class.term_id].grades[grade.id] = grade;
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>
