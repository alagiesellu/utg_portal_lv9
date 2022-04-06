<template>
    <div class="row">
        <IndexCourses v-if="courses"></IndexCourses>
        <ViewCourses v-if="course && !form"></ViewCourses>
        <FormCourses v-if="form"></FormCourses>
    </div>
</template>

<script>
    import IndexCourses from "./Courses/IndexCourses";
    import ViewCourses from "./Courses/ViewCourses";
    import FormCourses from "./Courses/FormCourses";
    export default {
        components: {FormCourses, ViewCourses, IndexCourses},
        name: "Courses",
        data() {
          return {
              courses: null,
              course: null,
              departments: [],
              filter: {
                  search: null,
                  search_q: '',
              },
              form: {
                  title: null,
                  departments: [],
                  input: {
                      id: null,
                      code: null,
                      name: null,
                      description: null,
                      department_id: null,
                      credit_hours: null,
                      //*pass password: null,
                  },
                  message: {
                      errors: [],
                      success: [],
                  },
              },
          }
        },
        mounted() {
            this.$store.state.page = 'Courses';
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function() {

                if (this.$route.params.id === 'create' || this.$route.params.ops === 'create')
                {
                    this.get_schools_departments();
                    this.courses = null;
                    this.form = {
                        title: 'Create New Course',
                        type: 'c',
                        input: {
                            code: null,
                            name: null,
                            description: null,
                            department_id: null,
                            credit_hours: null,
                            //*pass password: null,
                        },
                    };
                }
                else if (this.$route.params.id)
                {
                    this.courses = null;
                axios.get('/admin/courses/'+this.$route.params.id)
                        .then(res => {
                            this.course = res.data.course;
                            this.form = null;

                            if (this.$route.params.ops === 'edit')
                            {
                                this.get_schools_departments();
                                this.form = {
                                    title: 'Edit Course '+this.course.name,
                                    type: 'e',
                                    input: {
                                        id: this.course.id,
                                        name: this.course.name,
                                        code: this.course.code,
                                        description: this.course.description,
                                        department_id: this.course.department_id,
                                        credit_hours: this.course.credit_hours,
                                        //*pass password: null,
                                    },
                                };
                            }
                            else if (this.$route.params.ops === 'delete')
                            {
                                this.form = {
                                    title: 'Delete Course '+this.course.name,
                                    type: 'd',
                                    input: {
                                        id: this.course.id,
                                        //*pass password: null,
                                    },
                                };
                            }
                    });
                } else {
                    this.course = this.form = null;
                    this.get_courses();
                }
            },
            submitForm: function(e)
            {
                e.preventDefault();

                switch (this.form.type) {
                    case 'c':
                        this.postRequest('/admin/courses/store');
                        break;
                    case 'd':
                        this.form.input.id = this.course['id'];
                        this.postRequest('/admin/courses/destroy');
                        break;
                    case 'e':
                        this.form.input.id = this.course['id'];
                        this.postRequest('/admin/courses/edit');
                        break;
                }
            },

            postRequest: function(link)
            {
                axios.post(link, this.form.input)
                    .then(res => {

                        if (res.data.course != null)
                            this.$router.push({name:'ad.courses', params:{id:res.data.course.id}});
                        else
                            this.$router.push({name:'ad.courses'});
                        this.$root.post_success(res.data.success);
                        //*pass this.form.input.password = '';
                    });
            },

            submitCourseSearch: function (e)
            {
                e.preventDefault();
                this.get_courses(1);

            },

            get_courses: function(page = 1)
            {
                if (this.filter.search)
                    this.filter.search_q = '&search=' + this.filter.search;

                axios.get('/admin/courses?page=' + page + this.filter.search_q)
                    .then(res => {
                        this.courses = res.data.courses;
                    });
            },

            get_course: function(id)
            {
                axios.get('/admin/courses/'+id)
                    .then(res => {
                        this.course = res.data.course;
                    });
            },
            get_schools_departments: function () {
                axios.get('/admin/get/departments?is_major=0&is_admin=0')
                    .then((res) => {
                        this.departments = res.data.departments;
                    });
            }
        },
    }
</script>

<style scoped>
</style>
