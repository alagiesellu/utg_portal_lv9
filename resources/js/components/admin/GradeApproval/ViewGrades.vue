<template>
    <div class="row">
        <div class="col-12">
            <div class="card shadow">
                <div class="card-header bg-transparent">
                    <h2>
                        Approve Grades
                        <button v-on:click="$router.push({name:'ad.grades.approvals', params:{id:$parent.term_class.term.id}})"
                                     class="btn btn-sm btn-outline-primary float-right">
                            <i class="ni ni-bold-left"></i> Back
                        </button>
                    </h2>
                    <h4>
                        <small>Term:</small> {{ $parent.term_class.term.name }}
                    </h4>
                    <h4>
                        <small>Course:</small> {{ $parent.term_class.course.name }}
                    </h4>
                </div>
                <div class="table-responsive">
                    <table class="table align-items-center table-flush">
                        <thead>
                        <tr>
                            <th>
                                <div class="custom-control custom-checkbox btn btn-sm btn-outline-primary">
                                    <input class="custom-control-input" v-on:click="select_all"
                                           ref="select_all" id="select_all" type="checkbox">
                                    <label class="custom-control-label" for="select_all">Approve All</label>
                                </div>
                            </th>
                            <th>Score</th>
                            <th>Student</th>
                            <th>#</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="grade in $parent.grades" v-if="grade.uploaded_by_profile_id != null && grade.approved_by_profile_id === null">
                            <td>
                                <div class="custom-control custom-checkbox mb-3">
                                    <input class="custom-control-input" :ref="'grade_'+grade.id" :id="'grade_'+grade.id" type="checkbox">
                                    <label class="custom-control-label" :for="'grade_'+grade.id">Approve</label>
                                </div>
                            </td>
                            <th>
                                {{grade.total}}%
                                <span v-if="grade.resit_grade_id">
                                    (Resit)
                                </span>
                            </th>
                            <td>
                                {{$root.full_name(grade.student_profile.user)}}
                            </td>
                            <td>
                                {{grade.student_profile.user.num}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <form @submit="submitForm" class="card-body">

                        <div class="form-group mb-3">
                            <div class="input-group">
<!--//*pass                                 <input class="form-control" placeholder="Password confirmation"-->
<!--                                       type="password" v-model="form.input.password" required>-->
                                <div class="input-group-prepend">
                                    <button type="submit" class="btn btn-sm btn-primary">Approve Grades</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewGrades",
        data() {
            return {
                form: {
                    input: {
                        grades: [],
                        all: true,
                        //*pass password: null,
                    }
                }
            }
        },
        mounted() {
            this.select_all();
        },
        methods: {
            select_all: function() {

                this.form.input.all = this.form.input.all !== true;

                for (let grade of this.$parent.grades)
                    if (this.$refs['grade_'+grade.id])
                        this.$refs['grade_'+grade.id][0].checked = this.form.input.all;
            },
            submitForm: function(e) {
                e.preventDefault();

                this.form.input.grades = [];

                for (let grade of this.$parent.grades)
                    if (this.$refs['grade_'+grade.id] && this.$refs['grade_'+grade.id][0].checked)
                        this.form.input.grades.push(grade.id);
                axios.post('/admin/grades/approvals/store', {
                    grades: this.form.input.grades,
                    term_class: this.$route.params.id,
                    //*pass password: this.form.input.password,

                })
                    .then(res => {

                        this.$root.post_success(res.data.success);
                        //*pass this.form.input.password = null;
                    });
            },
        }
    }
</script>

<style scoped>

</style>
