<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Classes",
        data() {
            return {
                term_class: {},
                assessments: {},
                students_registrations: {},
                lecturer_class_registrations: {},
            }
        },
        created () {
            //this.fetchData();
            this.$store.state.page = 'Class';
        },
        watch: {
            //'$route': 'fetchData'
        },
        methods: {
            get_students: function(page=1) {
                axios.get('/classes/registrations='+this.$route.params.id+'?page='+page)
                    .then((res) => {
                        this.students_registrations = res.data.class_registrations;
                    });
            },
            get_assessments: function(page=1) {
                axios.get('/classes/assessments='+this.$route.params.id+'?page='+page)
                    .then((res) => {
                        this.assessments = res.data.assessments;
                    });
            },
            fetchData: function() {
                this.lecturer_class_registrations =
                    this.class_registrations =
                    this.students_registrations =
                        this.term_class = {};
                if (this.$route.params.id !== undefined)
                {
                    this.get_term_class();
                    switch (this.$route.params.ops) {
                        case "students":
                            this.get_students();
                            break;
                        case "assessments":
                            this.get_assessments();
                            break;
                    }
                }
                else {
                    this.get_lecturer_class_registrations();
                }
            },
            get_term_class: function () {
                axios.get('/academic/classes/'+this.$route.params.id)
                    .then((res) => {
                        this.term_class = res.data.term_class;
                    })
            },
            get_lecturer_class_registrations: function (page = 1) {
                axios.get('/academic/classes?page=' + page)
                    .then((res) => {
                        this.lecturer_class_registrations = res.data.lecturer_class_registrations;
                    })
            },
        },
    }
</script>

<style scoped>

</style>
class_registrations
