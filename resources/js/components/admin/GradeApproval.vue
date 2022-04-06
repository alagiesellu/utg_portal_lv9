<template>
    <div>
        <ViewGrades v-if="grades"></ViewGrades>
        <IndexGrades v-else></IndexGrades>
    </div>
</template>

<script>
    import ViewGrades from "./GradeApproval/ViewGrades";
    import IndexGrades from "./GradeApproval/IndexGrades";
    export default {
        name: "GradeApproval",
        components: {IndexGrades, ViewGrades},
        data() {
            return {
                grades: null,
                terms: null,
                term: null,
                term_classes: null,
                term_class: null,
                filter: {
                    search: null,
                },
                input: {
                    term: {},
                }
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        mounted() {
            this.$store.state.page = 'Grade Approvals';
        },
        methods: {
            submitTerm: function(e) {
                e.preventDefault();
            },
            termSelected: function() {
                this.$router.push({
                    name: 'ad.grades.approvals',
                    params: {
                        id:this.input.term.id,
                    }
                });
                this.get_term_classes();
            },
            get_term_classes: function()
            {
                if (this.terms == null)
                    this.get_terms();
                axios.get('/admin/grades/approvals/classes/'+this.$route.params.id)
                    .then(res => {
                        this.term_classes = res.data.term_classes;
                        this.term = res.data.term;
                    });
            },
            fetchData: function() {
                if (this.$route.params.id !== undefined && this.$route.params.tc === undefined)
                    this.get_term_classes();
                else if (this.$route.params.tc !== undefined)
                    this.get_grades();
                else
                    this.get_terms();
            },
            get_grades: function() {
                axios.get('/admin/grades/approvals/grades/'+this.$route.params.tc)
                    .then(res => {
                        this.grades = res.data.grades;
                        this.term_class = res.data.term_class;
                        this.prepare_grades();
                    });
            },
            get_terms: function() {
                this.grades = null;
                axios.get('/admin/grades/approvals/terms')
                    .then(res => {
                        this.terms = res.data.terms;
                        // this.input.term.id = this.$route.params.id;
                    });
            },
            filter_users: function(e) {
                e.preventDefault();
                axios.post('/admin/grades/search', {
                    search: this.filter.search,
                })
                    .then(res => {
                        this.filter.search = null;
                        this.user = res.data.user;
                        this.profile = res.data.profile;
                        this.$router.push({name:'ad.grades',params:{id:this.user.num}});
                        this.prepare_grades();
                    });
            },
            prepare_grades: function () {
                for (let i in this.grades)
                {
                    this.grades[i].total = 0;
                    for (let si in this.grades[i].scores)
                    {
                        if (this.grades[i].scores[si] != null)
                            this.grades[i].total += this.grades[i].scores[si]*1;
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>
