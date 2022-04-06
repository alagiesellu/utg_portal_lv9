<template>
    <div class="row">
        <FormTerms v-if="form" v-bind="term"></FormTerms>
        <IndexTerms v-if="terms" v-bind:terms="terms"></IndexTerms>
        <ViewTerms v-if="term && !assessment" v-bind:term="term"></ViewTerms>
        <ExternalGrade v-if="assessment" v-bind:term="term"></ExternalGrade>
    </div>
</template>

<script>
    import FormTerms from "./Terms/FormTerms";
    import IndexTerms from "./Terms/IndexTerms";
    import ViewTerms from "./Terms/ViewTerms";
    import ExternalGrade from "./Terms/ExternalGrade";
    export default {
        components: {
            ViewTerms, FormTerms, IndexTerms, ExternalGrade,
        },
        name: "Terms",
        data() {
            return {
                filter: {
                    search: null,
                    search_q: '',
                },
                terms: {},
                term: null,
                form: null,
                assessment: null,
                departments: [],
            }
        },
        created () {
            this.$store.state.page = 'Academic Terms';
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            getDepartments: function()
            {
                axios.get('/admin/get/departments?is_admin=0')
                    .then(res => {
                        if (this.form.input.external_exam_percentage !== undefined)
                        {
                            this.departments = [];
                            for (let department of res.data.departments)
                                if (department.has_rotation)
                                    this.departments.push(department);
                        } else
                            this.departments = res.data.departments;
                    });
            },
            editTerm: function() {
                if (this.term) {
                    this.form = {};
                    this.form.edit = true;
                    this.form.title = 'Edit Term: '+this.term.name;
                    this.form.type = 'e';
                    if (this.term.external_exam_percentage) {
                        this.form.input = {
                            id: this.term.id,
                            name: this.term.name,
                            starting_at: this.term.starting_at,
                            ending_at: this.term.ending_at,
                            department_id: this.term.department_id,
                            set_id: this.term.set_id,
                            registration_required: this.term.registration_required,
                            external_exam_percentage: this.term.external_exam_percentage,
                        };
                    }else {
                        this.form.input = {
                            id: this.term.id,
                            name: this.term.name,
                            starting_at: this.term.starting_at,
                            ending_at: this.term.ending_at,
                            department_id: this.term.department_id,
                            registration_required: this.term.registration_required,
                            registration_deadline: this.term.registration_deadline,
                            unregistration_deadline: this.term.unregistration_deadline,
                            // pay_per_class: this.term.pay_per_class,
                        };
                    }
                    this.term = null;
                    this.getDepartments();
                }
            },
            deleteTerm: function() {
                if (this.term) {
                    this.form = {};
                    this.form.input = {};
                    this.form.delete = true;
                    this.form.input.id = this.term.id;
                    this.form.title = 'Delete Term: '+this.term.name;
                    this.term = null;
                    this.form.type = 'd';
                }
            },
            createSemester: function() {
                this.$router.push({name:'ad.terms',params:{id:'create-semester'}});
            },
            createMedYear: function() {
                this.$router.push({name:'ad.terms',params:{id:'create-med-year'}});
            },
            fetchData: function() {
                this.assessment =
                    this.term =
                        this.terms =
                            this.form =
                                null;
                if (this.$route.params.id === 'create-semester') {
                    this.getDepartments();
                    this.form = {};
                    this.form.title = 'Add New Semester';
                    this.form.type = 'cs';
                    this.form.input = {
                        name: '',
                        starting_at: '',
                        ending_at: '',
                        department_id: '',
                        registration_required: true,
                        is_rotation: false,
                        registration_deadline: '',
                        unregistration_deadline: '',
                        // pay_per_class: 0,
                    };
                    this.form.create = true;
                }else if (this.$route.params.id === 'create-med-year') {
                    this.getDepartments();
                    this.form = {};
                    this.form.title = 'Add New Medical Year';
                    this.form.type = 'cm';
                    this.form.input = {
                        name: '',
                        starting_at: '',
                        ending_at: '',
                        department_id: '',
                        set_id: '',
                        registration_required: false,
                        is_rotation: true,
                        external_exam_percentage: 70,
                    };
                    this.form.create = true;
                } else {
                    if (this.$route.params.id === undefined) {
                        this.get_terms();
                    }
                    else {
                        this.get_term(this.$route.params.id);

                        if (this.$route.params.ops === 'external-exams')
                            this.assessment = {};
                    }
                }
            },
            search_terms: function(e) {
                e.preventDefault();

                this.get_terms();
            },
            get_terms: function(page = 1)
            {
                this.filter.search_q = this.filter.search ? ('&search=' + this.filter.search) : '';

                axios.get('/admin/terms?page=' + page + this.filter.search_q)
                    .then(res => {
                        this.terms = res.data.terms;
                        this.term = this.form = null;
                    });
            },
            get_term: function(id)
            {
                axios.get('/admin/terms/'+id)
                    .then(res => {
                        if (res.data.term.term_id)
                            this.$router.push({name:'ad.terms',params:{id:res.data.term.term_id}});
                        else
                            this.term = res.data.term;
                        this.terms = null;
                    });
            },
        },
    }
</script>

<style scoped>
</style>
